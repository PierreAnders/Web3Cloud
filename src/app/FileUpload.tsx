import React, { useState } from "react";
import { upload } from "thirdweb/storage";
import { client } from "./client";

export default function FileUpload ({ client }) {
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
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} className="py-2 px-4 bg-blue-500 text-white rounded">
        Téléverser le fichier
      </button>
    </div>
  );
};