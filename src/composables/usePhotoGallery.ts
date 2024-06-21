import { ref } from 'vue';
import {
  Camera,
  CameraResultType,
  CameraSource,
  GalleryPhoto,
  Photo,
} from '@capacitor/camera';
import { Image } from '../models/spot.model';
import { useStorageFile, useFirebaseStorage } from 'vuefire';
import { ref as storageRef } from 'firebase/storage';
import { updateAvatar } from '../services/user.service';
import { isPlatform } from '@ionic/vue';
// import { Capacitor } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';

const photos = ref<Image[]>([]);

function b64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export async function getBlob(photo: Photo): Promise<Blob> {
  const response = await fetch(photo.webPath!);
  return await response.blob();
}

export async function getBase64(photo: Photo): Promise<string> {
  const file = await Filesystem.readFile({
    path: photo.path!,
  });
  return file.data as string;
}

export const usePhotoGallery = () => {
  async function getPhotoFormLibrary(userId?: string): Promise<void> {
    try {
      const photo = (await Camera.getLimitedLibraryPhotos()).photos[0];

      if (userId) {
        savePhoto(userId, photo);
      }
    } catch {
      photos.value = [...photos.value];
    }
  }
  async function takePhoto(userId?: string): Promise<void> {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        allowEditing: true,
        source: CameraSource.Camera,
        quality: 100,
      });

      // upload avatar in storage and firestore
      if (userId) {
        savePhoto(userId, photo);
      }
    } catch {
      photos.value = [...photos.value];
    }
  }

  async function savePhoto(
    userId: string,
    photo: Photo | GalleryPhoto
  ): Promise<void> {
    try {
      let blob: Blob;

      if (isPlatform('hybrid')) {
        console.log('PLATFORM HYBRID');
        const file = await Filesystem.readFile({
          path: photo.path!,
        });
        blob = b64toBlob(file.data as string);
      } else {
        console.log('PLATFROM DESKTOP');
        const response = await fetch(photo.webPath!);
        blob = await response.blob();
      }

      const storage = useFirebaseStorage();

      const fileName = Date.now() + '.jpeg';

      const savedFileImage = {
        filepath: fileName,
        webviewPath: photo.webPath,
      };

      const imageFileRef = storageRef(storage, `test/${fileName}`);
      const { url, upload } = useStorageFile(imageFileRef);

      upload(blob)?.then(() => {
        setTimeout(() => {
          if (url.value) {
            console.log(url.value);
            updateAvatar(userId, url.value);
            savedFileImage.webviewPath = url.value;
          }
        }, 800);
      });

      photos.value = [savedFileImage, ...photos.value];
    } catch {
      photos.value = [...photos.value];
    }
  }

  return {
    photos,
    takePhoto,
    getPhotoFormLibrary,
  };
};
