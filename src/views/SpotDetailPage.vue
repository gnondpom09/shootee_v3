<script setup lang="ts">
import { ref } from "vue";
import { getMarkerId } from "@/services/marker.service";
import { getUserById } from "@/services/user.service";
import { useRoute } from "vue-router";
import { PhotoSpot } from "@/models/photoSpot.model";

const route = useRoute();
const id = String(route.params.id);
const spot = getMarkerId(id);

/* const user = getUserById(spot.value?.authorId ?? ""); */

const selectedSegment = ref<string>("default");

const currentPhoto = ref<PhotoSpot | null>(null);

const isOpen = ref(false);

const setOpen = (open: boolean, photo: PhotoSpot | null) => {
  currentPhoto.value = photo;
  isOpen.value = open;
};

function segmentChanged(e: CustomEvent) {
  selectedSegment.value = e.detail.value;
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/tabs/search"></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title>Detail</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="spot">
      <div class="spot-container">
        <img :src="spot.thumbnail" />
      </div>
      <ion-item>
        <ion-label>
          <h4>
            {{ spot.address }}
          </h4>
          <p>122 km</p>
        </ion-label>
      </ion-item>
      <ion-segment :value="selectedSegment" @ionChange="segmentChanged">
        <ion-segment-button value="default">
          <ion-icon name="call"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="heart">
          <ion-icon name="heart"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="pin">
          <ion-icon name="pin"></ion-icon>
        </ion-segment-button>
      </ion-segment>
      <div v-if="selectedSegment === 'default'">
        <h5>Auteur</h5>
        <!--         <ion-item v-if="user">
          <ion-avatar slot="start">
            <img :src="user.avatar" />
          </ion-avatar>
          <ion-label>{{ user.pseudo }}</ion-label>
        </ion-item> -->
        <h5>Les points de vue</h5>
        <div v-if="spot.photos" class="pins">
          <div class="pin" :key="index" v-for="(photo, index) in spot.photos">
            <img :src="photo.image" @click="setOpen(true, photo)" />
          </div>
        </div>
      </div>

      <ion-modal :is-open="isOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Modal</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false, null)">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <img :src="currentPhoto?.image" />
          <p>
            {{
              currentPhoto?.shootedAt
                ? currentPhoto.shootedAt.toDate()
                : spot.createdAt.toDate()
            }}
          </p>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.spot-container {
  display: flex;
  flex-direction: column;
}

.pins {
  column-count: 4;
  position: relative;
  z-index: 500;
  .pin {
    display: inline-block;
    height: 150px;
    margin: 0;
    padding: 4px;
    img,
    ion-skeleton-text {
      border-radius: 6px;
    }
    ion-skeleton-text {
      background-color: aqua;
    }
  }
}
</style>
