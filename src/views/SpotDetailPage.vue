<script setup lang="ts">
import { ref } from "vue";
import { getMarkerId } from "@/services/marker.service";

import { useRoute } from "vue-router";
import SpotPresentation from "@/components/spot/SpotPresentation.vue";
import SpotNearby from "@/components/spot/SpotNearby.vue";

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
          <ion-icon name="call"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="nearby">
          <ion-icon name="heart"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="pin">
          <ion-icon name="pin"></ion-icon>
        </ion-segment-button>
      </ion-segment>
      <div v-if="selectedSegment === 'default'">
        <SpotPresentation :spot="spot" />
      </div>
      <div v-if="selectedSegment === 'nearby'"><SpotNearby :spot="spot" /></div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.spot-container {
  display: flex;
  flex-direction: column;
}
</style>
