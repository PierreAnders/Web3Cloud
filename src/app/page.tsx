"use client"
import type { FileMetadata } from "@/app/models/FileMetadata";
import { files, categories } from "@/app/models/FileMetadata";
import { HeroSection } from "@/components/HeroSection";
import { UploadComponent } from "@/components/UploadFile";
import { useActiveAccount } from "thirdweb/react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export default function Home() {
  const account = useActiveAccount();

  return (
    <main className="mx-auto">
      <HeroSection />
      <div className="mx-auto mt-4 w-2/3">
        <Command>
          <CommandInput 
          placeholder="Search Categories & Files" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Categories">
              {categories.map((category: string) => (
                <CommandItem key={category}>{category}</CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Files">
            {files.map((file: FileMetadata) => (
              <CommandItem key={file.uri}>{file.name}</CommandItem>
            ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <div className="mb-20 mt-12 flex justify-center">
        <UploadComponent />
      </div>
      <div className="flex justify-center text-gray-600 text-sm">ETH Address: {account?.address}</div>
    </main>
  );
}
