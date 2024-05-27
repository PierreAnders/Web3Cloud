import { FileMetadata } from "./FileMetadata";
import { createHash } from "crypto";

export class BlockchainFile extends FileMetadata {
    transactionHash: string;
    certificationContract: string;
    documentHash: string;

    constructor(name: string, uri: string, category: string, isPrivate: boolean, owner: string, transactionHash: string, certificationContract: string, documentHash: string) {
        super(name, uri, category, isPrivate, owner);
        this.transactionHash = transactionHash;
        this.certificationContract = certificationContract;
        this.documentHash = documentHash
    }

    timestampAndCertify(): void{
        // Logique pour intéragir avec la blockchain
        // envoyer le hash du fichier au smart contrat qui enregistre l'horodatage et le propriétaire 
    }

    static calculateHashDocument(documentContent: string): string {
        const hash = createHash('sha256');
        hash.update(documentContent);
        return hash.digest('hex')
    }
}
