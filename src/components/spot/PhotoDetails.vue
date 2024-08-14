<script setup lang="ts">
import { computed } from "vue";
import { PhotoSpot } from "@/models/photoSpot.model";
import { getUserById } from "@/services/user.service";
import { toRefs } from "vue";

const props = defineProps<{
  photo: PhotoSpot;
  spotTitle?: string;
}>();
const { photo, spotTitle } = toRefs(props);

const emit = defineEmits<{
  (event: "close"): void;
}>();

const author = getUserById(photo.value.authorId ?? "");

const shootedAt = computed<string>(() => {
  if (photo.value.exif?.DateTimeOriginal) {
    const date =
      photo.value.exif.DateTimeOriginal.toDate().toLocaleDateString("fr-FR");
    const time =
      photo.value.exif.DateTimeOriginal.toDate().toLocaleTimeString("fr-FR");
    return `Photo prise le ${date} à ${time}`;
  }

  return "";
});
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ spotTitle }}</ion-title>
      <ion-buttons slot="end">
        <ion-button v-on:click="emit('close')">
          <ion-icon slot="icon-only" name="close"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-accordion-group>
      <ion-accordion value="first">
        <ion-item slot="header" color="light">
          <ion-label>Informations</ion-label>
     
        </ion-item>

        <div slot="content">
          <ion-list>
            <ion-item-group>
              <ion-item lines="none">
                <ion-label>Photo de {{ author?.pseudo }}</ion-label>
              </ion-item>
            
              <ion-item v-if="photo.exif?.DateTimeOriginal" lines="none">
                <ion-label>{{ shootedAt }}</ion-label>
              </ion-item>
              <ion-item lines="none">
                <ion-label
                  >ISO : {{ photo.exif?.ISOSpeedRatings || "N/A" }}</ion-label
                >
              </ion-item>
              <ion-item lines="none">
                <ion-label
                  >Ouverture : {{ photo.exif?.ExposureTime || "N/A" }}</ion-label
                >
              </ion-item>
              <ion-item lines="none">
                <ion-label
                  >Focale : {{ photo.exif?.FocalLength || "N/A" }}</ion-label
                >
              </ion-item lines="none">
              <ion-item>
                <ion-label>Flash : {{ photo.exif?.Flash || "N/A" }}</ion-label>
              </ion-item>
            </ion-item-group>

            <ion-item-group>
              <ion-item-divider>
                <ion-label>Matériel</ion-label>
              </ion-item-divider>
          
              <ion-item lines="none">
                <ion-label>Marque : {{ photo.exif?.Make || "N/A" }}</ion-label>
              </ion-item>
              <ion-item lines="none">
                <ion-label>Modèle : {{ photo.exif?.Model || "N/A" }}</ion-label>
              </ion-item>
              <ion-item lines="none">
                <ion-label
                  >Objectif : {{ photo.exif?.LensModel || "N/A" }}</ion-label
                >
              </ion-item>
            </ion-item-group>
          </ion-list>
        </div>
      </ion-accordion>
    </ion-accordion-group>
    <img :src="photo?.image" />
  </ion-content>
</template>
