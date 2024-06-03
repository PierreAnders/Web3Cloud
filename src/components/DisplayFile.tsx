"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { decrypt } from '@/utils/encryption';
import crypto from 'crypto';

interface IFileMetadata {
  _id: string;
  name: string;
  uri: string;
  category?: string;
  isPrivate: boolean;
  owner: string;
  encryptionKey: string;
}

export const FetchFilesComponent: React.FC = () => {
  const [files, setFiles] = useState<IFileMetadata[]>([]);
  const [error, setError] = useState<string>("");
  const account = useActiveAccount();

  useEffect(() => {
    const fetchFiles = async () => {
      if (!account?.address) {
        setError("User address is required.");
        return;
      }
      try {
        const url = `https://special-trout-q5r6ggw9p6w3gx4-3000.app.github.dev/api/filemetadata/read?owner=${account.address}`;

        const response = await axios.get(url);
        console.log("Response:", response);

        const filesWithDecryptedUrls = await Promise.all(response.data.map(async (file: IFileMetadata) => {
          const decryptedUrl = await decryptFile(file);
          return { ...file, decryptedUrl };
        }));

        setFiles(filesWithDecryptedUrls);
        setError("");
      } catch (error) {
        console.error("Error fetching files:", error);
        setError("Error fetching files.");
      }
    };

    fetchFiles();
  }, [account]);

  const decryptFile = async (file: IFileMetadata): Promise<string | null> => {
    try {
      // Convertir l'URL IPFS en URL HTTP
      const ipfsGateway = "https://ipfs.io/ipfs/";
      const fileUrl = file.uri.replace("ipfs://", ipfsGateway);

      // Télécharger le fichier chiffré depuis IPFS
      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      const encryptedBuffer = Buffer.from(response.data);

      // Récupérer la clé de chiffrement depuis les métadonnées
      const key = Buffer.from(file.encryptionKey, 'hex');

      // Déchiffrer le fichier
      const decryptedBuffer = decrypt(encryptedBuffer, key);

      // Convertir le buffer déchiffré en un fichier Blob
      const mimeType = file.uri.endsWith('.pdf') ? 'application/pdf' :
                       file.uri.endsWith('.txt') ? 'text/plain' :
                       file.uri.endsWith('.jpg') || file.uri.endsWith('.jpeg') ? 'image/jpeg' :
                       file.uri.endsWith('.png') ? 'image/png' :
                       'application/octet-stream';
      const decryptedFile = new Blob([decryptedBuffer], { type: mimeType });

      // Créer une URL Blob pour le fichier déchiffré
      return URL.createObjectURL(decryptedFile);
    } catch (error) {
      console.error("Error decrypting file:", error);
      setError("Error decrypting file.");
      return null;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mx-12">
      {files.length > 0 && (
        <div className="flex flex-wrap justify-center -mx-2">
          {files.map((file) => (
            <div key={file._id} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:w-1/6 px-2 mb-4">
              <div className="flex flex-col items-center space-y-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{file.name}</CardTitle>
                    <CardDescription>
                      Category: {file.category || "N/A"}
                    </CardDescription>
                    <CardDescription>
                      {file.isPrivate ? "Private" : "Public"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {file.decryptedUrl && (
                      <img src={file.decryptedUrl} alt="Decrypted File" style={{ width: '100%', height: 'auto' }} />
                    )}
                  </CardContent>
                  <CardFooter>
                    {file.decryptedUrl && (
                      <div className="text-xs cursor-pointer text-purple-300">
                        <div className="text-sm" onClick={() => window.open(file.decryptedUrl, '_blank')}>
                          Open
                        </div>
                        <div className="text-xs cursor-pointer text-purple-300" onClick={() => {
                          const a = document.createElement('a');
                          a.href = file.decryptedUrl;
                          a.download = file.name;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(file.decryptedUrl);
                        }}>
                          Download
                        </div>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};