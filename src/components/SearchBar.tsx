// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
// } from "@/components/ui/command";

// import type { FileMetadata } from "@/app/models/FileMetadata";
// import { files, categories } from "@/app/models/FileMetadata";

// export const SearchBarComponent: React.FC = () => {
//   return (
//     <Command>
//       <CommandInput placeholder="Search Categories & Files" />
//       <CommandList>
//         <CommandEmpty>No results found.</CommandEmpty>
//         <CommandGroup heading="Categories">
//           {categories.map((category: string) => (
//             <CommandItem key={category}>{category}</CommandItem>
//           ))}
//         </CommandGroup>
//         <CommandSeparator />
//         <CommandGroup heading="Files">
//           {files.map((file: FileMetadata) => (
//             <CommandItem key={file.uri}>{file.name}</CommandItem>
//           ))}
//         </CommandGroup>
//       </CommandList>
//     </Command>
//   );
// };
