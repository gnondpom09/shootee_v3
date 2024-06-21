import { GeoPoint } from 'firebase/firestore';
import { Spot } from './spot.model';

export interface Marker {
  id: string;
  name: string;
  thumbnail: string;
  location: GeoPoint;
  spotsCount?: number;
  spots?: Spot[];
}
