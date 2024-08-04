<script setup lang="ts">
import { ref } from "vue";
import { getMarkerId } from "@/services/marker.service";

import { useRoute } from "vue-router";
import SpotPresentation from "@/components/spot/SpotPresentation.vue";
import SpotNearbyRestaurants from "@/components/spot/SpotNearbyRestaurants.vue";
import SpotNearbyBed from "@/components/spot/SpotNearbyBed.vue";
import SpotDistance from "@/components/spot/spotDistance.vue";

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
        <ion-title v-if="spot">{{ spot.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="spot" class="ion-padding">
      <div
        class="preview"
        :style="{ 'background-image': 'url(' + spot.photos[0].preview + ')' }"
        style="
          height: 33%;
          width: 100%;
          background-size: cover;
          background-color: #fff;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 12px;
        "
      ></div>

      <div class="spot-address">
        <ion-item class="ion-no-padding" line="none">
          <ion-label>
            <h4>
              {{ spot.address }}
            </h4>
          </ion-label>
        </ion-item>
      </div>

      <div class="spot-menu">
        <ion-segment
          mode="md"
          :value="selectedSegment"
          @ionChange="segmentChanged"
        >
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
      </div>

      <div class="details-content">
        <div v-if="selectedSegment === 'default'">
          <SpotPresentation :spot="spot" />
        </div>
        <div v-if="selectedSegment === 'route'">
          <SpotDistance :spot="spot" />
        </div>
        <div v-if="selectedSegment === 'nearby-restaurant'">
          <SpotNearbyRestaurants :spot="spot" />
        </div>
        <div v-if="selectedSegment === 'nearby-bed'">
          <SpotNearbyBed :spot="spot" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.spot-preview {
  display: block;
  height: 33%;
  overflow: hidden;
}

.spot-address {
  padding: 8px 0 4px 0;
}
</style>
