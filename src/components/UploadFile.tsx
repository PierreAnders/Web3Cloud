"use client";

import { client } from "@/app/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { upload } from "thirdweb/storage";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      setFileUri(uri);
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
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Transfer your file</CardTitle>
          <CardDescription>
            To a decentralized and secure network.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">File Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter the name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Category</Label>
                <Input
                  id="category"
                  type="text"
                  placeholder="Enter a category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Privacy</Label>
                <Select>
                  <SelectTrigger id="privacy">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="astro">Private</SelectItem>
                    <SelectItem value="nuxt">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Select file</Label>
                <Input type="file" id="file" onChange={handleFileChange} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleFileUpload}>
            Upload
          </Button>
        </CardFooter>
      </Card>

      {error && <div className="text-red-500">{error}</div>}

      {fileUri && (
        <div className="my-2 flex flex-col items-center space-y-2">
          <div>File uploaded successfully!</div>
        </div>
      )}
    </div>
  );
};