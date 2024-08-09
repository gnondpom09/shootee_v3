import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  query,
  where,
} from "firebase/firestore";

import { useCollection, useDocument, useFirestore } from "vuefire";
import { Profile } from "../models/profile.model";

const firestore = useFirestore();

export async function createUser(id: string, pseudo: string, email: string) {
  const userRef = doc(collection(firestore, "users"), id);

  return await setDoc(userRef, {
    id,
    pseudo,
    email,
    avatar: "",
    avatarPreview: "",
    inscriptionDate: Timestamp.fromDate(new Date()),
  });
}

export function getAllUsers() {
  return useCollection<Profile>(collection(firestore, "users"));
}

export function getUserById(id: string) {
  return useDocument<Profile>(doc(firestore, `users/${id}`));
}

export function getUserByEmail(email: string) {
  const queryUserByEmail = useCollection(
    query(collection(firestore, "spots"), where("email", "==", email))
  );
  return queryUserByEmail;
}

export async function updateUser(id: string, user: Profile) {
  const userRef = doc(collection(firestore, "users"), id);
  return await updateDoc(userRef, { ...user });
}

export async function updateAvatar(
  id: string,
  avatar: string,
  avatarPreview: string
) {
  const userRef = doc(collection(firestore, "users"), id);
  return await updateDoc(userRef, { avatar, avatarPreview });
}

export async function removeUser(id: string) {
  const userRef = doc(collection(firestore, "users"), id);
  return await deleteDoc(userRef);
}
