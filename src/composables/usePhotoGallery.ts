import { ref } from "vue";
import {
  Camera,
  CameraResultType,
  CameraSource,
  GalleryPhoto,
  Photo,
} from "@capacitor/camera";
import { Image, PhotoSpot } from "../models/photoSpot.model";
import { useStorageFile, useFirebaseStorage } from "vuefire";
import { ref as storageRef } from "firebase/storage";
import { isPlatform } from "@ionic/vue";
// import { Capacitor } from '@capacitor/core';
import { Filesystem } from "@capacitor/filesystem";

const photoUrl = ref<string>("");

const photosDraft = ref<PhotoDraft[]>([]);

const photosSaved = ref<PhotoSpot[]>([]);

export interface PhotoDraft {
  path: string;
  webPath: string;
}

function b64toBlob(b64Data: string, contentType = "", sliceSize = 512) {
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
  const storage = useFirebaseStorage();

  async function getPhotoFromLibrary(): Promise<void> {
    try {
      const photo: GalleryPhoto = (await Camera.getLimitedLibraryPhotos())
        .photos[0];

      savePhotoInStorage(photo);
    } catch {
      photoUrl.value = "";
    }
  }

  async function takePhoto(): Promise<Photo | undefined> {
    try {
      const photo: Photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        allowEditing: true,
        source: CameraSource.Camera,
        quality: 100,
      });

      if (photo) {
        const draft: PhotoDraft = {
          path: photo.path ?? "",
          webPath: photo.webPath ?? "",
        };

        photosDraft.value = [draft, ...photosDraft.value];

        return photo;
      }
    } catch {
      photosDraft.value = [...photosDraft.value];
    }
  }

  async function takePhotoAndSave(): Promise<void> {
    const photo = await takePhoto();

    if (photo) {
      await savePhotoInStorage(photo);
    }
  }

  async function savePhotosAndGetImagesPath(
    photosDraft: PhotoDraft[],
    authorId: string
  ): Promise<PhotoSpot[]> {
    return new Promise((resolve) => {
      photosDraft.forEach(async (draft, index) => {
        let blob: Blob;

        const fileName = index + Date.now() + ".jpeg";
        const imageFileRef = storageRef(storage, `test/${fileName}`);

        if (isPlatform("hybrid")) {
          const file = await Filesystem.readFile({
            path: String(draft.path),
          });
          blob = b64toBlob(file.data as string, "image/jpeg");
        } else {
          const response = await fetch(String(draft.webPath));
          blob = await response.blob();
        }

        const { url, upload, refresh } = await useStorageFile(imageFileRef);

        await upload(blob);
        await refresh();

        if (url.value) {
          const savedImage = {
            image: url.value,
            authorId,
          };

          photosSaved.value = [savedImage, ...photosSaved.value];

          if (index === photosDraft.length - 1) {
            setTimeout(() => {
              if (photosSaved.value) {
                resolve(photosSaved.value);
              }
            }, 100);
          }
        }
      });
    });
  }

  async function savePhotoInStorage(
    photo: Photo | GalleryPhoto
  ): Promise<void> {
    try {
      let blob: Blob;

      const fileName = Date.now() + ".jpeg";

      const imageFileRef = storageRef(storage, `test/${fileName}`);

      if (isPlatform("hybrid")) {
        const file = await Filesystem.readFile({
          path: photo.path!,
        });
        blob = b64toBlob(file.data as string, "image/jpeg");
      } else {
        const response = await fetch(photo.webPath!);
        blob = await response.blob();
      }

      const { url, upload, refresh } = await useStorageFile(imageFileRef);

      await upload(blob);
      await refresh();

      if (url.value) {
        photoUrl.value = url.value;
      }
    } catch {
      photoUrl.value = "";
    }
  }

  function resetPhotos(): void {
    photoUrl.value = "";
  }

  return {
    photoUrl,
    photosDraft,
    photosSaved,
    takePhoto,
    takePhotoAndSave,
    savePhotosAndGetImagesPath,
    savePhotoInStorage,
    getPhotoFromLibrary,
    resetPhotos,
  };
};
