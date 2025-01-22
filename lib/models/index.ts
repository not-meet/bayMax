interface FileDocument {
  filename: string;
  contentType: string;
  data: Buffer;
  uploadedAt: Date;
}

// models/File.ts
import mongoose, { Schema } from 'mongoose';

const fileSchema = new Schema<FileDocument>({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  data: { type: Buffer, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.models.File || mongoose.model<FileDocument>('File', fileSchema);
