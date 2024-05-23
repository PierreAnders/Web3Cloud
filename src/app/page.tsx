import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { UploadComponent } from "@/components/UploadFile";

export default function Home() {
  return (
    <main className="mx-auto">
      <HeroSection />
      <div className="mb-20 flex justify-center"></div>
      <UploadComponent />
    </main>
  );
}
