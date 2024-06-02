"use client"

import { HeroSection } from "@/components/HeroSection";
import { UploadComponent } from "@/components/UploadFile";
import { FetchFilesComponent } from "@/components/DisplayFile";
import { useActiveAccount } from "thirdweb/react";
// import { SearchBarComponent } from '@/components/SearchBar';

export default function Home() {
  const account = useActiveAccount();

  return (
    <main className="mx-auto">
      <HeroSection />
      <div className="mb-20 mt-12 flex justify-center">
        <UploadComponent />
      </div>
      {/* <div className="mx-auto mt-4 w-2/3"> */}
      {/* <SearchBarComponent /> */}
      {/* </div> */}
      <div className="mb-2 mt-2 flex justify-center">
        <FetchFilesComponent />
      </div>
      <div className="flex justify-center text-gray-600 text-sm">ETH Address: {account?.address}</div>
    </main>
  );
}
