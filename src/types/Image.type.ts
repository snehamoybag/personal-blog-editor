export interface Image {
  id: number;
  publicId: string;
  url: string;
  originalName: string;
  mimeType: string;
  size: number; // in bytes
  createdAt: Date;
  userId: number;
}
