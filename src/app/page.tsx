import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { UploadComponent } from "@/components/UploadFile";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"


export default function Home() {
  return (
    <main className="mx-auto">
      <HeroSection />
      <div className="mx-auto w-2/3 mt-4">
        
      <Command>
      <CommandInput placeholder="Search Categories & Files" />
      <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Categories">
        <CommandItem>Insurances</CommandItem>
        <CommandItem>Health</CommandItem>
        <CommandItem>Photos</CommandItem>
        <CommandItem>Human</CommandItem>
        <CommandItem>Habitation</CommandItem>
        <CommandItem>Identity</CommandItem>
        <CommandItem>Code</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Files">
        <CommandItem>document.txt</CommandItem>
        <CommandItem>document.pdf</CommandItem>
        <CommandItem>document.jpg</CommandItem>
        <CommandItem>document.sol</CommandItem>
      </CommandGroup>
      </CommandList>
    </Command>
    </div>
    <div className="mb-20 flex justify-center"></div>

      <UploadComponent />
    </main>
  );
}
