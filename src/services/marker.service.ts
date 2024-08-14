import { PhotoSpot } from "@/models/photoSpot.model";
import { Spot } from "@/models/spot.model";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  GeoPoint,
  Timestamp,
  where,
  query,
  or,
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
    isPublic: true,
  });
}

export function getAllPublicSpots() {
  const queryByAuthor = useCollection(
    query(collection(firestore, "spots"), where("isPublic", "==", true))
  );
  return queryByAuthor;
}

export function getPublicAndSharedSpots(userId: string) {
  const queryByAuthor = useCollection(
    query(
      collection(firestore, "spots"),
      or(
        where("isPublic", "==", true),
        where("sharedWith", "array-contains", userId)
      )
    )
  );
  return queryByAuthor;
}

export function getSharedSpots(userId: string) {
  const queryByAuthor = useCollection(
    query(
      collection(firestore, "spots"),
      where("sharedWith", "array-contains", userId)
    )
  );
  return queryByAuthor;
}

export function getFavoritesSpots(userId: string) {
  const queryByAuthor = useCollection(
    query(
      collection(firestore, "spots"),
      where("addToFavoriteBy", "array-contains", userId)
    )
  );
  return queryByAuthor;
}

export function getSpotsByAuthor(userId: string) {
  const queryByAuthor = useCollection(
    query(collection(firestore, "spots"), where("authorId", "==", userId))
  );
  return queryByAuthor;
}

export function getPublicSpotsByAuthor(userId: string) {
  const queryByAuthor = useCollection(
    query(
      collection(firestore, "spots"),
      where("isPublic", "==", true),
      where("authorId", "==", userId)
    )
  );
  return queryByAuthor;
}

export function getMarkerId(id: string) {
  return useDocument<Spot>(doc(firestore, `spots/${id}`));
}

export async function updateMarker(spotId: string, photos: PhotoSpot[]) {
  const markerRef = doc(collection(firestore, "spots"), spotId);
  return await updateDoc(markerRef, { photos });
}

export async function updateSpot(spotId: string, spot: Spot) {
  const userRef = doc(collection(firestore, "spots"), spotId);
  return await updateDoc(userRef, { ...spot });
}

export async function removeMarker(spotId: string) {
  const markerRef = doc(collection(firestore, "spots"), spotId);
  return await deleteDoc(markerRef);
}
