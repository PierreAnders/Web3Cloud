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

