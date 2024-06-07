"use client"

import { HeroSection } from "@/components/HeroSection";
import dynamic from 'next/dynamic';
import { useActiveAccount } from "thirdweb/react";
import { useState, useEffect } from "react";

// Importation dynamique des composants
const UploadComponent = dynamic(() => import('@/components/UploadFile').then(mod => mod.UploadComponent), { ssr: false });
const FetchFilesComponent = dynamic(() => import('@/components/DisplayFile').then(mod => mod.FetchFilesComponent), { ssr: false });

export default function Home() {
  const account = useActiveAccount();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ce code ne s'exécutera que côté client
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  return (
    <main className="mx-auto">
      <HeroSection />
      {account && isClient && (
        <>
          <div className="mb-20 mt-12 flex justify-center">
            <UploadComponent />
          </div>
          <div className="mx-auto mt-4 w-2/3">
            {/* <SearchBarComponent /> */}
          </div>
          <div className="my-2 flex justify-center">
            <FetchFilesComponent />
          </div>
          <div className="my-10 flex justify-center text-xs text-gray-600">ETH: {account.address}</div>
        </>
      )}
    </main>
  );
}