"use client";

import { client } from "@/app/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { upload } from "thirdweb/storage";

export const UploadComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUri, setFileUri] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const account = useActiveAccount();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setError("");
    } else {
      setSelectedFile(null);
      setError("");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }
    try {
      const uri = await upload({
        client,
        files: [selectedFile],
      });
      console.log("Fichier téléversé avec succès, URIs: ", uri);
      setFileUri(uri
      );
      setError("");

      await axios.post("api/filemetadata/save", {
        name: fileName,
        uri: uri,
        category: category,
        isPrivate: isPrivate,
        owner: account?.address,
      });
    } catch (error) {
      setError("Error uploading file.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2 my-2">
          <Input
            type="text"
            placeholder="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 my-2">
          <Input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 my-2">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          <span>Private</span>
        </div>
        <div className="flex flex-start items-center space-x-2 my-2">
          <Input
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex items-center space-x-2 my-2">
          <Button variant="secondary" onClick={handleFileUpload}>
            Upload
          </Button>
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {fileUri && (
        <div className="flex flex-col items-center space-y-2 my-2">
          <div>File uploaded successfully!</div>
        </div>
      )}
    </div>
  );
};