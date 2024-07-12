<script setup lang="ts">
import { usePhotoGallery } from '@/composables/usePhotoGallery';
import { getUserById } from '@/services/user.service';
import { UseGeolocation } from '@vueuse/components';
import { useCurrentUser } from 'vuefire';

const currentUser = useCurrentUser();

const user = getUserById(currentUser.value?.uid as string);

const { takePhoto, photos } = usePhotoGallery();
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>New spot</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        bonjour {{ user?.pseudo }}

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