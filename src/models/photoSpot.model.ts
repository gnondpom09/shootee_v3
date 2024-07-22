import { Photo } from "@capacitor/camera";
import { Timestamp } from "firebase/firestore";

export interface Image {
  filepath: string;
  webviewPath?: string;
  photo?: Photo;
}

export interface PhotoSpot {
  image: string;
  authorId?: string;
  shootedAt?: Timestamp;
}
