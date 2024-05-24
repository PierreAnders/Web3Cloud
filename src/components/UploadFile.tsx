"use client";
import React, { useState } from "react";
import { client } from "@/app/client";
import { upload } from "thirdweb/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const UploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUri, setFileUri] = useState<string>("");
  const [error, setError] = useState<string>("");

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
      const uris = await upload({
        client,
        files: [selectedFile],
      });
      console.log("Fichier téléversé avec succès, URIs: ", uris);
      setFileUri(uris);
      setError("");
    } catch (error) {
      setError("Error uploading file.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="w-60"
        />
        <Button variant="secondary" onClick={handleFileUpload}>
          Upload
        </Button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {fileUri && (
        <div className="flex flex-col items-center space-y-2">
          <div>File uploaded successfully!</div>
          <a href={fileUri} target="_blank" rel="noreferrer">
            Link to the file
          </a>
        </div>
      )}
    </div>
  );
};
