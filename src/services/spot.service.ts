import { collection, doc } from 'firebase/firestore';

import { useCollection, useDocument, useFirestore } from 'vuefire';

const firestore = useFirestore();

export function getSpotsOfMarker(markerId: string) {
  return useCollection(collection(firestore, 'markers', markerId, 'spots'));
}

export function getSpotById(markerId: string, spotId: string) {
  return useDocument(doc(firestore, 'markers', markerId, `spots/${spotId}`));
}
