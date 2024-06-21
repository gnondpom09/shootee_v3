// import {
//   collection,
//   doc,
//   setDoc,
//   updateDoc,
//   deleteDoc,
// } from 'firebase/firestore';

import {
  //   useCollection,
  //   useDocument,
  //   useFirestore,
  useFirebaseStorage,
  useStorageFile,
} from 'vuefire';

import { ref as storageRef } from 'firebase/storage';
import { updateAvatar } from './user.service';
import { Photo } from '@capacitor/camera';

const storage = useFirebaseStorage();

// const firestore = useFirestore();

// const MAX_WIDTH = 500;
// const MAX_HEIGHT = 500;
// const MIME_TYPE = 'image/jpeg';
// const QUALITY = 0.9;

// const convertBlobToBase64 = (blob: Blob) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onerror = reject;
//     reader.onload = () => {
//       resolve(reader.result);
//     };
//     reader.readAsDataURL(blob);
//   });

export async function uploadImage(
  userId: string,
  title: string,
  photo: Photo
): Promise<void> {
  const response = await fetch(photo.webPath!);
  const blob = await response.blob();

  const imageFileRef = storageRef(storage, `test/${title}`);
  const {
    url,
    // gives you a percentage between 0 and 1 of the upload progress
    // uploadProgress,
    // uploadError,
    // firebase upload task
    // uploadTask,
    upload,
  } = useStorageFile(imageFileRef);

  upload(blob)
    ?.then((value: any) => {
      console.log(url.value);
      console.log(value);

      if (url.value) {
        updateAvatar(userId, url.value);
      }
    })
    .catch(() => {
      console.log('upload failed');
    });
}
