export interface PhotoSpot {
  image: string;
  authorId?: string;
  exif?: Exif;
}

export interface PhotoDraft {
  path: string;
  webPath: string;
  exif?: Exif;
}

export interface Exif {
  DateTimeOriginal: string;
  ExposureTime: string;
  Flash: string;
  FocalLength: string;
  ISOSpeedRatings: string;
  LensModel: string;
  Make: string;
  Model: string;
  Software: string;
}
