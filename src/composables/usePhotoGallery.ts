import { ref } from "vue";
import {
  Camera,
  CameraResultType,
  CameraSource,
  GalleryPhoto,
  GalleryPhotos,
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

export interface PhotoDraft {
  path: string;
  webPath: string;
  exif?: any | undefined;
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
      Camera.getLimitedLibraryPhotos().then((gallery: GalleryPhotos) => {
        const selectedPhoto = gallery.photos[0];
        savePhotoInStorage(selectedPhoto);
      });
    } catch {
      photoUrl.value = "";
    }
  }

  async function getSelectedPhotosFromLibrary(): Promise<void> {
    try {
      Camera.getLimitedLibraryPhotos().then((gallery: GalleryPhotos) => {
        gallery.photos.forEach((photo: GalleryPhoto) => {
          const draft: PhotoDraft = {
            path: photo.path ?? "",
            webPath: photo.webPath ?? "",
            exif: photo.exif,
          };
          photosDraft.value.push(draft);
        });
      });
    } catch {
      photosDraft.value = [...photosDraft.value];
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
          //exif: photo?.exif || undefined,
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
    const photosSaved: PhotoSpot[] = [];

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
            //exif: draft?.exif || undefined,
          };

          photosSaved.push(savedImage);

          if (index === photosDraft.length - 1) {
            setTimeout(() => {
              resolve(photosSaved);
            }, 800);
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
    photosDraft.value = [];
  }

  return {
    photoUrl,
    photosDraft,
    takePhoto,
    takePhotoAndSave,
    savePhotosAndGetImagesPath,
    savePhotoInStorage,
    getPhotoFromLibrary,
    getSelectedPhotosFromLibrary,
    resetPhotos,
  };
};
