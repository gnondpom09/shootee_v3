import { GeoPoint } from "firebase/firestore";

export interface Image {
  filepath: string;
  webviewPath?: string;
}

export interface SpotPhoto {
  id: string;
  image: string;
  authorId: string;
}
