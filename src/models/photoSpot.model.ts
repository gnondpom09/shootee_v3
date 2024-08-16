import { Timestamp } from "firebase/firestore";

export interface PhotoSpot {
  image: string;
  preview: string;
  authorId?: string;
  exif?: Exif;
}

export interface PhotoDraft {
  path: string;
  webPath: string;
  originalImage: Blob | null;
  preview: Blob | null;
  exif?: Exif;
}

export interface Exif {
  DateTimeOriginal?: Timestamp;
  ExposureTime: string;
  Flash: string;
  FocalLength: string;
  ISOSpeedRatings: string;
  LensModel: string;
  Make: string;
  Model: string;
  Software: string;
}
