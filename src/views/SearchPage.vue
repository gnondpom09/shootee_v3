<script setup lang="ts">
import { UseGeolocation } from '@vueuse/components';
// import { camera, trash, close } from 'ionicons/icons';
import { usePhotoGallery } from '@/composables/usePhotoGallery';
import ExploreContainer from '@/components/ExploreContainer.vue';

const { takePhoto, photos } = usePhotoGallery();

// import { useGeolocation } from '@vueuse/core';

// const { coords, locatedAt, error, resume, pause } = useGeolocation();
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Recherche</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Search page</ion-title>
        </ion-toolbar>
      </ion-header>

      <UseGeolocation v-slot="{ coords: { latitude, longitude } }">
        Latitude: {{ latitude }} Longitude: {{ longitude }}
      </UseGeolocation>

      <ExploreContainer />

      <div class="container">
        <ion-grid>
          <ion-row>
            <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
              <ion-img :src="photo.webviewPath"></ion-img>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-fab vertical="top" horizontal="end" slot="fixed">
          <ion-fab-button @click="takePhoto">
            <ion-icon name="camera"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </div>
    </ion-content>
  </ion-page>
</template>
