<script setup lang="ts">
import { ref } from "vue";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { ActionSheetOptions, IonActionSheet } from "@ionic/vue";

const { takePhoto, photos, getPhotoFromLibrary } = usePhotoGallery();

const actionSheet: ActionSheetOptions = {
  header: "Modifier mon avatar",
  buttons: [
    {
      text: "Prendre une photo",
      handler: () => {
        /*         changeAvatarFromPhoto();
         */
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
        <!--         <ion-fab vertical="start" horizontal="center">
          <ion-fab-button @click="takePhoto">
            <ion-icon name="camera"></ion-icon>
          </ion-fab-button>
        </ion-fab> -->
        <ion-button id="open-action-sheet" expand="full">
          test photo
        </ion-button>
        <p>Sélectionnez une ou plusieurs photos a ajouter sur ce spot</p>
      </div>

      <ion-grid class="photos-preview">
        <ion-row>
          <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>

    <ion-action-sheet
      trigger="open-action-sheet"
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
