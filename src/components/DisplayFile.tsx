"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useActiveAccount } from "thirdweb/react";
import { decrypt } from '@/utils/encryption';
import FileViewer from "react-file-viewer";


type IFileMetadata = {
  _id: string;
  name: string;
  uri: string;
  category?: string;
  isPrivate: boolean;
  owner: string;
  encryptionKey: string;
  decryptedUrl?: string;
};

type FetchFilesComponentProps = {
  refresh: boolean;
};


export const FetchFilesComponent: React.FC<FetchFilesComponentProps> = ({ refresh }) => {
  const [files, setFiles] = useState<IFileMetadata[]>([]);

  const account = useActiveAccount();

  useEffect(() => {
    const fetchFiles = async () => {
      if (!account?.address) {
        return;
      }
      try {
        const url = `http://localhost:3000/api/filemetadata/read?owner=${account.address}`;
        // const url = `https://special-trout-q5r6ggw9p6w3gx4-3000.app.github.dev/api/filemetadata/read?owner=${account.address}`;
        const response = await axios.get(url);
        const filesWithDecryptedUrls = await Promise.all(response.data.map(async (file: IFileMetadata) => {
          const decryptedUrl = await decryptFile(file);
          return { ...file, decryptedUrl };
        }));
        setFiles(filesWithDecryptedUrls);
      } catch (error) {
      }
    };

    fetchFiles();
  }, [account, refresh]); // Ajout de `refresh` comme dépendance

  const decryptFile = async (file: IFileMetadata): Promise<string | null> => {
    try {
      const ipfsGateway = "https://ipfs.io/ipfs/";
      const fileUrl = file.uri.replace("ipfs://", ipfsGateway);
      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      const encryptedBuffer = Buffer.from(response.data);
      const key = Buffer.from(file.encryptionKey, 'hex');
      const decryptedBuffer = decrypt(encryptedBuffer, key);
      const mimeType = file.uri.endsWith('.pdf') ? 'application/pdf' :
                       file.uri.endsWith('.txt') ? 'text/plain' :
                       file.uri.endsWith('.jpg') || file.uri.endsWith('.jpeg') ? 'image/jpeg' :
                       file.uri.endsWith('.png') ? 'image/png' :
                       file.uri.endsWith('.gif') ? 'image/gif' :
                       file.uri.endsWith('.bmp') ? 'image/bmp' :
                       file.uri.endsWith('.csv') ? 'text/csv' :
                       file.uri.endsWith('.xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : // Not working
                       file.uri.endsWith('.docx') ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                       file.uri.endsWith('.mp4') ? 'video/mp4' :
                       file.uri.endsWith('.webm') ? 'video/webm' :
                       file.uri.endsWith('.mp3') ? 'audio/mpeg' :
                       'application/octet-stream';
      const decryptedFile = new Blob([decryptedBuffer], { type: mimeType });
      return URL.createObjectURL(decryptedFile);
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="mx-auto max-h-screen overflow-hidden">
      {files.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {files.map((file) => (
            <div key={file._id} className="">
              <div className="overflow-hidden-container h-48">
                {file.decryptedUrl && (
                  <FileViewer
                    fileType={file.uri.split('.').pop()}
                    filePath={file.decryptedUrl}
                    errorComponent={<div>Error loading file</div>}
                    unsupportedComponent={<div>Unsupported file type</div>}
                  />
                )}
              </div>
              <div className="mt-2 text-center text-xs text-gray-400">
                {file.name}.{file.uri.split('.').pop()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};