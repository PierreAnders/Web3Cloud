"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useActiveAccount } from "thirdweb/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { decrypt } from '@/utils/encryption';
import FileViewer from 'react-file-viewer';
import * as pdfjsLib from 'pdfjs-dist';

interface IFileMetadata {
  _id: string;
  name: string;
  uri: string;
  category?: string;
  isPrivate: boolean;
  owner: string;
  encryptionKey: string;
  decryptedUrl?: string;
  thumbnailUrl?: string;
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
        const filesWithDecryptedUrls = await Promise.all(response.data.map(async (file: IFileMetadata) => {
          const decryptedUrl = await decryptFile(file);
          const thumbnailUrl = file.uri.endsWith('.pdf') ? await generatePdfThumbnail(decryptedUrl) : decryptedUrl;
          return { ...file, decryptedUrl, thumbnailUrl };
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
                       file.uri.endsWith('.xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :
                       file.uri.endsWith('.docx') ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                       file.uri.endsWith('.mp4') ? 'video/mp4' :
                       file.uri.endsWith('.webm') ? 'video/webm' :
                       file.uri.endsWith('.mp3') ? 'audio/mpeg' :
                       'application/octet-stream';
      const decryptedFile = new Blob([decryptedBuffer], { type: mimeType });
      return URL.createObjectURL(decryptedFile);
    } catch (error) {
      console.error("Error decrypting file:", error);
      setError("Error decrypting file.");
      return null;
    }
  };

  const generatePdfThumbnail = async (pdfUrl: string): Promise<string | null> => {
    try {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      return canvas.toDataURL();
    } catch (error) {
      console.error("Error generating PDF thumbnail:", error);
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
                    <CardDescription>
                      
                    </CardDescription>
                    <CardDescription>
                      {file.isPrivate ? "Private" : "Public"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {file.decryptedUrl && (
                      <FileViewer
                        fileType={file.uri.split('.').pop()}
                        filePath={file.decryptedUrl}
                        errorComponent={<div>Error loading file</div>}
                        unsupportedComponent={<div>Unsupported file type</div>}
                      />
                    )}
                  </CardContent>
                  <CardFooter>
                    {file.decryptedUrl && (
                      <div className="flex justify-between mt-2">
                        <div className="text-xs cursor-pointer" onClick={() => window.open(file.decryptedUrl, '_blank')}>
                          Open in Browser
                        </div>
                        <div className="text-xs cursor-pointer" onClick={() => {
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