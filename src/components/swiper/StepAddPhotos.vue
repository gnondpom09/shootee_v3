<script setup lang="ts">
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { ActionSheetOptions, IonActionSheet } from "@ionic/vue";

const { takePhoto, photosDraft, getPhotoFromLibrary } = usePhotoGallery();

const actionSheet: ActionSheetOptions = {
  header: "Modifier mon avatar",
  buttons: [
    {
      text: "Prendre une photo",
      handler: () => {
        takePhoto();
      },
    },
    {
      text: "Ouvrir la bibliothèque",
      handler: () => {
        /*         changeAvatarFromLibrary();
         */
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
      <div class="galery">
        <h2>Ajouter des photos</h2>
        <ion-fab vertical="start" horizontal="center">
          <ion-fab-button id="open-action-photo-spot">
            <ion-icon name="camera"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        <p>Sélectionnez une ou plusieurs photos a ajouter sur ce spot</p>
      </div>

      <ion-grid class="photos-preview">
        <ion-row>
          <ion-col size="6" :key="index" v-for="(photo, index) in photosDraft">
            <ion-img :src="photo.webPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>

    <ion-action-sheet
      trigger="open-action-photo-spot"
      :header="actionSheet.header"
      :buttons="actionSheet.buttons"
    ></ion-action-sheet>
  </ion-content>
</template>

<style>
.step {
  height: 100%;
}
.galery {
  display: flex;
  height: 70%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.photos-preview {
  height: 30%;
}
</style>
