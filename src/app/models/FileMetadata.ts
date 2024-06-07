import { Schema, model, models } from 'mongoose';
import type { Document } from 'mongoose';

type FileMetadata = Document & {
    name: string;
    uri: string;
    category: string;
    isPrivate: boolean;
    owner: string;
    encryptionKey: string;
};

const FileMetadataSchema = new Schema<FileMetadata>({
    name: { type: String, required: true },
    uri: { type: String, required: true },
    category: { type: String, required: false },
    isPrivate: { type: Boolean, required: true },
    owner: { type: String, required: true },
    encryptionKey: { type: String, required: true }
});

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const FileMetadata = models.FileMetadata || model<FileMetadata>('FileMetadata', FileMetadataSchema);

