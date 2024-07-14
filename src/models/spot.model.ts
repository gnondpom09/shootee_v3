import { GeoPoint } from "firebase/firestore";
import { SpotPhoto } from "./spot.model";

export interface Spot {
  id: string;
  name: string;
  thumbnail: string;
  authorId: string;
  location: GeoPoint;
  address: string;
  photosCount: number;
  photos: SpotPhoto[];
  tags: string[];
  schedules?: string[];
  seasons?: string[];
}
