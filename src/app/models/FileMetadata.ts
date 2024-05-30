export class FileMetadata {
    name: string;
    uri: string;
    category: string;
    isPrivate: boolean;
    owner: string;
    
    constructor(name: string, uri: string, category: string, isPrivate: boolean, owner: string) {
        this.name = name;
        this.uri = uri;
        this.category = category;
        this.isPrivate = isPrivate;
        this.owner = owner
    }
}

export const files: FileMetadata[] = [
    new FileMetadata("PhotoVacances.jpg", "ipfs://Qm...PhotoVacances", "Image", false, "0x1234...Owner1"),
    new FileMetadata("DocumentConfidentiel.pdf", "ipfs://Qm...DocumentConfidentiel", "Document", true, "0x5678...Owner2"),
    new FileMetadata("MusiqueRelaxante.mp3", "ipfs://Qm...MusiqueRelaxante", "Musique", false, "0x9abc...Owner3"),
    new FileMetadata("PrésentationProjet.pptx", "ipfs://Qm...PrésentationProjet", "Document", true, "0xdef0...Owner1"),
    new FileMetadata("RecetteCuisine.pdf", "ipfs://Qm...RecetteCuisine", "Document", false, "0x1234...Owner2"),
    new FileMetadata("FilmVacances.mp4", "ipfs://Qm...FilmVacances", "Vidéo", true, "0x5678...Owner3")
];

export const categories: string[] = [
    "Image", "Document", "Musique", "Vidéo"
]
