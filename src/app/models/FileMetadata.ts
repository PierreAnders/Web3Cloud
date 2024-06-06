import { Schema, model, models, Document } from 'mongoose'

interface IFileMetadata extends Document {
    name: string;
    uri: string;
    category: string;
    isPrivate: boolean;
    owner: string;
    encryptionKey: string; 
}

const FileMetadataSchema = new Schema<IFileMetadata>({
    name: { type: String, required: true },
    uri: { type: String, required : true },
    category: { type: String, required: false },
    isPrivate: { type: Boolean, required: true},
    owner: { type: String, required: true},
    encryptionKey: { type: String, required: true }
})

const FileMetadata = models.FileMetadata || model<IFileMetadata>('FileMetadata', FileMetadataSchema);

export default FileMetadata;