"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { MediaRenderer } from "thirdweb/react";

interface IFileMetadata {
  _id: string;
  name: string;
  uri: string;
  category?: string;
  isPrivate: boolean;
  owner: string;
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
        const url = `http://localhost:3000/api/filemetadata/read?owner=${account.address}`;

        const response = await axios.get(url);
        console.log('Response:', response);

        setFiles(response.data);
        setError("");
      } catch (error) {
        console.error('Error fetching files:', error);
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
            <div key={file._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{file.name}</h3>
              <p>Category: {file.category || "N/A"}</p>
              <p>Private: {file.isPrivate ? "Yes" : "No"}</p>
              <MediaRenderer src={file.uri} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};