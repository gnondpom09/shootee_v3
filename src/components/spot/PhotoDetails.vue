<script setup lang="ts">
import { PhotoSpot } from "@/models/photoSpot.model";
import { Spot } from "@/models/spot.model";
import { getUserById } from "@/services/user.service";
import { toRefs } from "vue";

const props = defineProps<{
  photo: PhotoSpot;
  spot: Spot;
}>();
const { photo } = toRefs(props);

const emit = defineEmits<{
  (event: "close"): void;
}>();

const author = getUserById(photo.value.authorId ?? "");
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Modal</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="emit('close')">Close</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-accordion-group>
      <ion-accordion value="first">
        <ion-item slot="header" color="light">
          <ion-label>Photo de {{ author?.pseudo }}</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">
          <ion-list>
            <ion-list-header>
              <ion-label>Informations</ion-label>
            </ion-list-header>
            <ion-item lines="none">
              <ion-label
                >Photo Prise à
                {{
                  photo?.exif?.DateTimeOriginal
                    ? photo.exif.DateTimeOriginal
                    : spot.createdAt.toDate()
                }}</ion-label
              >
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
            </ion-item>
            <ion-item>
              <ion-label>Flash : {{ photo.exif?.Flash || "N/A" }}</ion-label>
            </ion-item>
            <ion-list-header>
              <ion-label>Matériel</ion-label>
            </ion-list-header>
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
          </ion-list>
        </div>
      </ion-accordion>
    </ion-accordion-group>
    <img :src="photo?.image" />
  </ion-content>
</template>
