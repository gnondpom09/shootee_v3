import { ref } from "vue";
import {
  Camera,
  CameraResultType,
  CameraSource,
  GalleryPhoto,
  GalleryPhotos,
  Photo,
} from "@capacitor/camera";
import { PhotoDraft, PhotoSpot } from "../models/photoSpot.model";
import { useStorageFile, useFirebaseStorage } from "vuefire";
import { ref as storageRef } from "firebase/storage";
import { isPlatform } from "@ionic/vue";
import { Filesystem } from "@capacitor/filesystem";

import {
  b64toBlob,
  getBlob,
  getExifPhoto,
  getPreview,
} from "@/utils/photo.utils";

const photoUrl = ref<string>("");
const avatarPreview = ref<string>("");

const photosDraft = ref<PhotoDraft[]>([]);

export const usePhotoGallery = () => {
  const storage = useFirebaseStorage();

  async function pickAvatarFromLibrary(userId: string): Promise<void> {
    try {
      Camera.getLimitedLibraryPhotos().then((gallery: GalleryPhotos) => {
        const selectedPhoto = gallery.photos[0];
        saveAvatarInStorage(selectedPhoto, userId);
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
            preview: null, // TODO: set preview
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
        const blob = await getBlob(photo);
        const file = new File([blob], "photo");
        const exif = await getExifPhoto(file);

        const preview = await getPreview(file);

        const draft: PhotoDraft = {
          path: photo.path ?? "",
          webPath: photo.webPath ?? "",
          preview: preview ?? null,
          exif,
        };

        photosDraft.value = [draft, ...photosDraft.value];

        return photo;
      }
    } catch {
      photosDraft.value = [...photosDraft.value];
    }
  }

  async function takeAvatarAndSave(userId: string): Promise<void> {
    const photo = await takePhoto();

    if (photo) {
      await saveAvatarInStorage(photo, userId);
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
        const imageFileRef = storageRef(storage, `spots/${fileName}/image`);
        const previewFileRef = storageRef(storage, `spots/${fileName}/preview`);

        if (isPlatform("hybrid")) {
          // For App mobile
          const file = await Filesystem.readFile({
            path: String(draft.path),
          });
          blob = b64toBlob(file.data as string, "image/jpeg");
        } else {
          const response = await fetch(String(draft.webPath));
          blob = await response.blob();
        }

        const { url, upload, refresh } = await useStorageFile(imageFileRef);
        const {
          url: urlPreview,
          upload: uploadPreview,
          refresh: refreshPreview,
        } = await useStorageFile(previewFileRef);

        await upload(blob);
        if (draft.preview) {
          await uploadPreview(draft.preview);
        }
        await refresh();
        await refreshPreview();

        if (url.value && urlPreview.value) {
          const savedImage: PhotoSpot = {
            image: url.value,
            preview: urlPreview.value,
            authorId,
            exif: draft.exif,
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

  async function saveAvatarInStorage(
    photo: Photo | GalleryPhoto,
    userId: string
  ): Promise<void> {
    try {
      let blob: Blob;

      const fileName = Date.now() + ".jpeg";

      const imageFileRef = storageRef(
        storage,
        `avatars/${userId}/image/${fileName}`
      );
      const previewFileRef = storageRef(
        storage,
        `avatars/${userId}/preview/${fileName}`
      );

      if (isPlatform("hybrid")) {
        const file = await Filesystem.readFile({
          path: photo.path!,
        });
        blob = b64toBlob(file.data as string, "image/jpeg");
      } else {
        const response = await fetch(photo.webPath!);
        blob = await response.blob();
      }

      if (photo) {
        const file = new File([blob], "photo");

        const preview = await getPreview(file);

        const { url, upload, refresh } = await useStorageFile(imageFileRef);
        const {
          url: urlPreview,
          upload: uploadPreview,
          refresh: refreshPreview,
        } = await useStorageFile(previewFileRef);

        await upload(blob);
        if (preview) {
          await uploadPreview(preview);
        }
        await refresh();
        await refreshPreview();

        if (url.value && urlPreview.value) {
          photoUrl.value = url.value;
          avatarPreview.value = urlPreview.value;
        }
      }
    } catch {
      photoUrl.value = "";
      avatarPreview.value = "";
    }
  }

  function resetPhotos(): void {
    photoUrl.value = "";
    photosDraft.value = [];
  }

  return {
    avatarPreview,
    photoUrl,
    photosDraft,
    takePhoto,
    takeAvatarAndSave,
    savePhotosAndGetImagesPath,
    saveAvatarInStorage,
    pickAvatarFromLibrary,
    getSelectedPhotosFromLibrary,
    resetPhotos,
  };
};
