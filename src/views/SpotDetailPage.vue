<script setup lang="ts">
import { ref } from "vue";
import { getMarkerId } from "@/services/marker.service";

import { useRoute } from "vue-router";
import SpotPresentation from "@/components/spot/SpotPresentation.vue";
import SpotNearbyRestaurants from "@/components/spot/SpotNearbyRestaurants.vue";
import SpotNearbyBed from "@/components/spot/SpotNearbyBed.vue";

const route = useRoute();
const id = String(route.params.id);
const spot = getMarkerId(id);

const selectedSegment = ref<string>("default");

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
          <ion-icon name="albums-outline"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="route">
          <ion-icon name="car-outline"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="nearby-restaurant">
          <ion-icon name="restaurant-outline"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="nearby-bed">
          <ion-icon name="bed-outline"></ion-icon>
        </ion-segment-button>
      </ion-segment>
      <div v-if="selectedSegment === 'default'">
        <SpotPresentation :spot="spot" />
      </div>
      <div v-if="selectedSegment === 'route'"></div>
      <div v-if="selectedSegment === 'nearby-restaurant'">
        <SpotNearbyRestaurants :spot="spot" />
      </div>
      <div v-if="selectedSegment === 'nearby-bed'">
        <SpotNearbyBed :spot="spot" />
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.spot-container {
  display: flex;
  flex-direction: column;
}
</style>
