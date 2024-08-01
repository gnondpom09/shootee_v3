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
  cameraDevice?: string;
  focalLength?: string;
  iso?: number;
}
