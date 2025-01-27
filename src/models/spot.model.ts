import { GeoPoint, Timestamp } from "firebase/firestore";
import { PhotoSpot } from "./photoSpot.model";

export interface Spot {
  id: string;
  name: string;
  thumbnail: string;
  authorId: string;
  createdAt: Timestamp;
  location: GeoPoint;
  address: string;
  photosCount: number;
  photos: PhotoSpot[];
  tags?: string[];
  schedules?: string[];
  seasons?: string[];
}
