import { Image } from './spot.model';

export interface Profile {
  uid: string;
  avatar: Image;
  pseudo: string;
  email: string;
  inscriptionDate: string;
  level?: string;
  firstname?: string;
  lastname?: string;
  location?: string;
}
