<script setup lang="ts">
import { getUserById } from "@/services/user.service";
import { useCurrentUser } from "vuefire";
import { UseGeolocation } from "@vueuse/components";
import { Image } from "../models/photoSpot.model";

defineProps<{
  photos: Image[];
}>();

const currentUser = useCurrentUser();

const user = getUserById(currentUser.value?.uid as string);

function submit() {
  console.log("valider");
}
</script>

<template>
  <div class="container">
    <form v-if="user">
      <ion-item>
        <ion-label position="floating"
          >Titre <ion-text color="primary">*</ion-text></ion-label
        >
        <ion-input required type="text"></ion-input>
      </ion-item>
      <ion-grid>
        <ion-row>
          <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-item>
        <ion-label position="floating"
          >Ajouté par <ion-text color="primary">*</ion-text></ion-label
        >
        <ion-input type="text" v-model="user.email" disabled></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Localisation</ion-label>
        <UseGeolocation v-slot="{ coords: { latitude, longitude } }">
          Latitude: {{ latitude }} Longitude: {{ longitude }}
        </UseGeolocation>
      </ion-item>
      <ion-button block color="primary" type="submit" @click="submit">
        valider
      </ion-button>
    </form>
  </div>
</template>
