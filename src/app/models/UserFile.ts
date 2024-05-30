import { Schema, model, models, Document } from 'mongoose';

interface IUserFile extends Document {
  address: string;
  fileUris: string[];
}

const UserFileSchema = new Schema<IUserFile>({
  address: { type: String, required: true },
  fileUris: { type: [String], required: true },
});

const UserFile = models.UserFile || model<IUserFile>('UserFile', UserFileSchema);

export default UserFile;