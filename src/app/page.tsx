"use client"

import { HeroSection } from "@/components/HeroSection";
import { UploadComponent } from "@/components/UploadFile";
import { FetchFilesComponent } from "@/components/DisplayFile";
import { useActiveAccount } from "thirdweb/react";
import { useState } from "react";

export default function Home() {
  const account = useActiveAccount();
  const [refreshFiles, setRefreshFiles] = useState(false);

  const handleFileUploadSuccess = () => {
    setRefreshFiles(prev => !prev); // Toggle the state to trigger a re-render
  };

  return (
    <main className="mx-auto">
      <HeroSection />
      {account && (
        <>
          <div className="mb-20 mt-12 flex justify-center">
            <UploadComponent onUploadSuccess={handleFileUploadSuccess} />
          </div>
          <div className="mx-auto mt-4 w-2/3">
          {/* <SearchBarComponent /> */}
          </div>
          <div className="mb-2 mt-2 flex justify-center">
            <FetchFilesComponent refresh={refreshFiles} />
          </div>
          <div className="flex justify-center text-gray-600 text-xs mt-10 mb-10">ETH: {account.address}</div>
        </>
      )}
    </main>
  );
}