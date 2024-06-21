import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import { useCollection, useDocument, useFirestore } from 'vuefire';

const firestore = useFirestore();

export async function createUser(id: string, pseudo: string, email: string) {
  const userRef = doc(collection(firestore, 'users'), id);

  return await setDoc(userRef, {
    id,
    pseudo,
    email,
    avatar: '',
    inscriptionDate: new Date().toISOString(),
  });
}

export function getAllUsers() {
  return useCollection(collection(firestore, 'users'));
}

export function getUserById(id: string) {
  return useDocument(doc(firestore, `users/${id}`));
}

export async function updateUser(id: string, firstname: string) {
  const userRef = doc(collection(firestore, 'users'), id);
  return await updateDoc(userRef, { firstname });
}

export async function updateAvatar(id: string, avatar: string) {
  const userRef = doc(collection(firestore, 'users'), id);
  return await updateDoc(userRef, { avatar });
}

export async function removeUser(id: string) {
  const userRef = doc(collection(firestore, 'users'), id);
  return await deleteDoc(userRef);
}
