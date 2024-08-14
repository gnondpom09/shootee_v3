<script setup lang="ts">
import { ref, computed } from "vue";
import { getMarkerId, updateSpot } from "@/services/marker.service";

import { useRoute } from "vue-router";
import SpotPresentation from "@/components/spot/SpotPresentation.vue";
import SpotNearbyRestaurants from "@/components/spot/SpotNearbyRestaurants.vue";
import SpotNearbyBed from "@/components/spot/SpotNearbyBed.vue";
import SpotDistance from "@/components/spot/spotDistance.vue";
import { Spot } from "@/models/spot.model";

const route = useRoute();
const id = String(route.params.id);
const spot = getMarkerId(id);

const userId = localStorage.getItem("uid") as string;

const selectedSegment = ref<string>("default");

const isFavorite = computed<boolean>(
  () => !!spot.value?.addToFavoriteBy?.includes(userId)
);

function segmentChanged(e: CustomEvent) {
  selectedSegment.value = e.detail.value;
}

async function toggleFavorite() {
  const addToFavoriteBy = spot.value?.addToFavoriteBy ?? [];

  try {
    const isExists = addToFavoriteBy.includes(userId);

    if (!isExists) {
      addToFavoriteBy.push(userId);
    } else {
      const index = addToFavoriteBy.findIndex((item) => item === userId);
      addToFavoriteBy.splice(index, 1);
    }

    if (spot.value) {
      const newSpot: Spot = { ...spot.value, addToFavoriteBy };
      await updateSpot(spot.value.id, newSpot);
    }
  } catch {}
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-buttons slot="start">
            <ion-back-button
              mode="ios"
              text="Retour"
              defaultHref="/tabs/search"
            ></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title v-if="spot">{{ spot.name }}</ion-title>
        <ion-buttons slot="end">
          <ion-button v-on:click="toggleFavorite">
            <ion-icon
              v-if="isFavorite"
              slot="icon-only"
              name="bookmark"
            ></ion-icon>
            <ion-icon
              v-else
              slot="icon-only"
              name="bookmark-outline"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="spot" class="ion-padding">
      <div
        class="preview"
        :style="{ 'background-image': 'url(' + spot.photos[0].preview + ')' }"
        style="
          height: 25%;
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
            <h3 class="address">
              {{ spot.address }}
            </h3>
          </ion-label>
        </ion-item>
      </div>

      <div class="spot-menu">
        <ion-segment
          mode="md"
          :value="selectedSegment"
          class="sub-menu"
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
.spot-address {
  padding: 8px 0 4px 0;
}

ion-label {
  h3 {
    font-weight: 900;
  }
}
</style>
