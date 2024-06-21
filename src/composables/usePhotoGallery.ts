import { ref } from 'vue';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Image } from '../models/spot.model';
import { useStorageFile, useFirebaseStorage } from 'vuefire';
import { ref as storageRef } from 'firebase/storage';
import { updateAvatar } from '../services/user.service';

const photos = ref<Image[]>([]);

export const usePhotoGallery = () => {
  async function takePhoto(userId?: string): Promise<void> {
    try {
      const photo: Photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        allowEditing: true,
        source: CameraSource.Camera,
        quality: 100,
      });

      const fileName = Date.now() + '.jpeg';

      const savedFileImage = {
        filepath: fileName,
        webviewPath: photo.webPath,
      };

      // upload avatar in storage and firestore
      if (userId) {
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();

        const storage = useFirebaseStorage();

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
      }

      photos.value = [savedFileImage, ...photos.value];
      console.log(photos.value);
    } catch {
      photos.value = [...photos.value];
    }
  }

  return {
    photos,
    takePhoto,
  };
};
