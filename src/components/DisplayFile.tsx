"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { MediaRenderer } from "thirdweb/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        console.log("Response:", response);

        setFiles(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching files:", error);
        setError("Error fetching files.");
      }
    };

    fetchFiles();
  }, [account]);

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
                  </CardHeader>
                  <CardContent>
                    <MediaRenderer src={file.uri} height={100}/>
                  </CardContent>
                  <CardFooter>
                    <CardDescription>
                      {file.isPrivate ? "Private" : "Public"}
                    </CardDescription>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
