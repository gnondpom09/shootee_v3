import { GeoPoint } from 'firebase/firestore';

export interface Image {
  filepath: string;
  webviewPath?: string;
}

export interface Spot {
  id: string;
  image: string;
  location: GeoPoint;
  authorId: string;
}
