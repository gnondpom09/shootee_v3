import { PhotoSpot } from "@/models/photoSpot.model";
import { Spot } from "@/models/spot.model";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  GeoPoint,
  Timestamp,
} from "firebase/firestore";

import { useCollection, useDocument, useFirestore } from "vuefire";

const firestore = useFirestore();

export async function createMarker(
  name: string,
  thumbnail: string,
  location: GeoPoint,
  authorId: string,
  address: string,
  photos: PhotoSpot[]
) {
  const markerRef = collection(firestore, "spots");

  const createdAt = Timestamp.fromDate(new Date());

  return await addDoc(markerRef, {
    name,
    thumbnail,
    location,
    authorId,
    createdAt,
    address,
    photos,
  });
}

export function getAllMarkers() {
  return useCollection<Spot>(collection(firestore, "spots"));
}

export function getMarkerId(id: string) {
  return useDocument<Spot>(doc(firestore, `spots/${id}`));
}

export async function updateMarker(spotId: string, photos: PhotoSpot[]) {
  const markerRef = doc(collection(firestore, "spots"), spotId);
  return await updateDoc(markerRef, { photos });
}

export async function removeMarker(spotId: string) {
  const markerRef = doc(collection(firestore, "spots"), spotId);
  return await deleteDoc(markerRef);
}
