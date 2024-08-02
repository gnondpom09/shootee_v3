import { Timestamp } from "firebase/firestore";

export interface Profile {
  id: string;
  avatar: string;
  avatarPreview: string;
  pseudo: string;
  email: string;
  inscriptionDate: Timestamp;
  level?: string;
  firstname?: string;
  lastname?: string;
}
