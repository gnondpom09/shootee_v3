import { Photo } from "@capacitor/camera";

export interface Image {
  filepath: string;
  webviewPath?: string;
  photo?: Photo;
}

export interface PhotoSpot {
  id: string;
  image: string;
  authorId: string;
}
