<script setup lang="ts">
import { usePhotoGallery } from "@/composables/usePhotoGallery";

const { takePhoto, photos } = usePhotoGallery();
</script>

<template>
  <div>
    <ion-grid>
      <ion-row>
        <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
          <ion-img :src="photo.webviewPath"></ion-img>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-fab vertical="center" horizontal="center" slot="fixed">
      <ion-fab-button @click="takePhoto">
        <ion-icon name="camera"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </div>
</template>
