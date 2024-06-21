import { Profile } from './profile.model';

export interface Image {
  filepath: string;
  webviewPath?: string;
}

export interface Spot {
  uid: string;
  image: Image;
  country: string;
  author: Profile;
  city?: string;
}
