"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { MediaRenderer } from "thirdweb/react";

interface UserFile {
  _id: string;
  address: string;
  fileUris: string[];
}

export const FetchFilesComponent: React.FC = () => {
  const [files, setFiles] = useState<UserFile[]>([]);
  const [error, setError] = useState<string>("");
  const account = useActiveAccount();

  useEffect(() => {
    const fetchFiles = async () => {
      if (!account?.address) {
        setError("User address is required.");
        return;
      }
      try {
        const url = `http://localhost:3000/api/userfile/read?address=${account.address}`;
        console.log('Fetching URL:', url); // Debugging URL

        const response = await axios.get(url);
        console.log('Response:', response); // Debugging response

        setFiles(response.data);
        setError("");
      } catch (error) {
        console.error('Error fetching files:', error); // Debugging error
        setError("Error fetching files.");
      }
    };

    fetchFiles();
  }, [account]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {error && <div className="text-red-500">{error}</div>}

      {files.length > 0 && (
        <div className="flex flex-col items-center space-y-2">
            {files.map((file) => (
              <div key={file._id}>
                  {file.fileUris.map((uri, uriIndex) => (
                    <div key={uriIndex}>
                      <MediaRenderer src={uri} /> 
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};