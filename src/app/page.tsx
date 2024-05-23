"use client";

import React, { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { upload } from "thirdweb/storage";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {

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
    <main className="mx-auto">
      <HeroSection/>
        <div className="mb-20 flex justify-center">
        </div>
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleFileUpload}
          className="ml-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Upload File
        </button>
    </main>
  );
}
