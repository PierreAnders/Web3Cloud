import { FileMetadata } from "./FileMetadata";

export class BlockchainFile extends FileMetadata {
    transactionHash: string;
    certificationContract: string;

    constructor(name: string, uri: string, category: string, isPrivate: boolean, owner: string, transactionHash: string, certificationContract: string) {
        super(name, uri, category, isPrivate, owner);
        this.transactionHash = transactionHash;
        this.certificationContract = certificationContract;
    }

    timestampAndCertify(): void{
        // Logique pour intéragir avec la blockchain
        // envoyer le hash du fichier au smart contrat qui enregistre l'horodatage et le propriétaire 
    }
}
