"use client";

import React, { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { upload } from "thirdweb/storage";
import { FlipWords } from "@/components/ui/flip-words";

export default function Home() {

    const words = ["bienvenue", "dans", "le", "Web3"];

  
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      console.log("Aucun fichier sélectionné.");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Veuillez sélectionner un fichier à téléverser.");
      return;
    }
    try {
      const uris = await upload({
        client,
        files: [selectedFile],
      });
      console.log("Fichier téléversé avec succès, URIs: ", uris);
      alert("Fichier téléversé avec succès !");
    } catch (error) {
      console.error("Erreur lors du téléversement du fichier : ", error);
      alert("Erreur lors du téléversement du fichier.");
    }
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
            <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        <FlipWords words={words} /> <br />
      </div>
    </div>
      <div className="py-20">
        <div className="flex justify-center mb-20">
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
          />
        </div>
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleFileUpload}
          className="ml-4 py-2 px-4 bg-blue-500 text-white rounded"
        >
          Upload File
        </button>
      </div>
    </main>
  );
}
