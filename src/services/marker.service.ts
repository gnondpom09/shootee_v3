import { Spot } from '@/models/spot.model';
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  GeoPoint,
  Timestamp,
} from 'firebase/firestore';

import { useCollection, useDocument, useFirestore } from 'vuefire';


const firestore = useFirestore();

export async function createMarker(
  name: string,
  thumbnail: string,
  location: GeoPoint,
  authorId: string,
  address: string
) {
/*   const markerRef = doc(collection(firestore, 'spots'), id); */
  const markerRef = collection(firestore, 'spots');

  const createdAt = Timestamp.fromDate(new Date());

  return await addDoc(markerRef, {
    name,
    thumbnail,
    location,
    authorId,
    createdAt,
    address
  })

/*   return await setDoc(markerRef, {
    id,
    name,
    thumbnail,
    location,
  }); */
}

export function getAllMarkers() {
  return useCollection<Spot>(collection(firestore, 'spots'));
}

export function getMarkerId(id: string) {
  return useDocument<Spot>(doc(firestore, `spots/${id}`));
}

export async function updateMarker(id: string, spotsCount: number) {
  const markerRef = doc(collection(firestore, 'spots'), id);
  return await updateDoc(markerRef, { spotsCount });
}

export async function removeMarker(id: string) {
  const markerRef = doc(collection(firestore, 'spots'), id);
  return await deleteDoc(markerRef);
}
