<script setup lang="ts">
import { UseGeolocation } from '@vueuse/components';

import { usePhotoGallery } from '@/composables/usePhotoGallery';

// import { useGeolocation } from '@vueuse/core';

// const { coords, locatedAt, error, resume, pause } = useGeolocation();

const { takePhoto, photos } = usePhotoGallery();
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Wall</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home page</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <h1>Home page</h1>

        <h2>vous etes ici</h2>
        <div>
          <UseGeolocation v-slot="{ coords: { latitude, longitude } }">
            Latitude: {{ latitude }} Longitude: {{ longitude }}
          </UseGeolocation>
        </div>

        <h3>Ajouter un spot</h3>
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
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.container {
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
