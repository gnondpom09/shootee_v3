import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  GeoPoint,
} from 'firebase/firestore';

import { useCollection, useDocument, useFirestore } from 'vuefire';
import { Marker } from '../models/marker.model';

const firestore = useFirestore();

export async function createMarker(
  id: string,
  name: string,
  thumbnail: string,
  location: GeoPoint
) {
  const markerRef = doc(collection(firestore, 'markers'), id);

  return await setDoc(markerRef, {
    id,
    name,
    thumbnail,
    location,
  });
}

export function getAllMarkers() {
  return useCollection<Marker>(collection(firestore, 'markers'));
}

export function getMarkerId(id: string) {
  return useDocument<Marker>(doc(firestore, `markers/${id}`));
}

export async function updateMarker(id: string, spotsCount: number) {
  const markerRef = doc(collection(firestore, 'markers'), id);
  return await updateDoc(markerRef, { spotsCount });
}

export async function removeMarker(id: string) {
  const markerRef = doc(collection(firestore, 'markers'), id);
  return await deleteDoc(markerRef);
}
