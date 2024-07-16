import { Photo } from "@capacitor/camera";

export interface Image {
  filepath: string;
  webviewPath?: string;
  photo?: Photo;
}

export interface PhotoSpot {
  image: string;
  authorId?: string;
}
