<script setup lang="ts">
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import {
  ActionSheetOptions,
  IonActionSheet,
  alertController,
  isPlatform,
} from "@ionic/vue";

const emit = defineEmits<{
  (event: "add-photo"): void;
}>();

const { takePhoto, photosDraft, getSelectedPhotosFromLibrary } =
  usePhotoGallery();

const actionSheet: ActionSheetOptions = {
  header: "Nouvelle photo",
  buttons: [
    {
      text: "Ouvrir l'apareil photo",
      handler: () => {
        takePhoto();
        emit("add-photo");
      },
    },
    {
      text: "Ouvrir la bibliothèque",
      handler: async () => {
        if (isPlatform("hybrid")) {
          getSelectedPhotosFromLibrary();
          emit("add-photo");
        } else {
          const alert = await alertController.create({
            header: "Fonctionnalité indisponible",
            message:
              "Cette fonctionnalité n'est disponible que sur l'application mobile.",
            buttons: ["Fermer"],
          });

          await alert.present();
        }
      },
    },
    {
      text: "Cancel",
      role: "cancel",
      data: {
        action: "cancel",
      },
    },
  ],
};
</script>

<template>
  <ion-content>
    <div class="step">
      <div class="camera-container">
        <h2>Ajouter des photos</h2>
        <ion-fab>
          <ion-fab-button id="open-action-photo-spot">
            <ion-icon name="camera"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        <p class="ion-padding legend">
          Sélectionnez une ou plusieurs photos a ajouter sur ce spot
        </p>
      </div>

      <ion-item-divider mode="md">
        <ion-label>Photos ajoutées</ion-label>
      </ion-item-divider>

      <div class="photos-preview">
        <ion-grid>
          <ion-row>
            <ion-col
              size="6"
              :key="index"
              v-for="(photo, index) in photosDraft"
            >
              <img :src="photo.webPath" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </div>

    <ion-action-sheet
      trigger="open-action-photo-spot"
      :header="actionSheet.header"
      :buttons="actionSheet.buttons"
    ></ion-action-sheet>
  </ion-content>
</template>

<style lang="scss">
.step {
  height: 100%;
}
.camera-container {
  display: flex;
  height: 60%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.photos-preview {
  display: flex;
  height: 33%;

  ion-row {
    flex-wrap: nowrap;
    overflow-x: scroll !important;
    overflow-y: hidden;
    height: 100%;

    ion-col {
      display: contents;

      img {
        height: 100%;
        margin: 0 4px;
        border-radius: 8px;
      }
    }
  }
}
</style>
