<script setup lang="ts">
import { toRefs } from "vue";
import { Spot } from "@/models/spot.model";
import { useNearby } from "@/composables/useNearby";
import {
  hospitalityCategories,
  RADIUS_POINTS_OF_INTEREST,
} from "@/constants/map";

const props = defineProps<{
  spot: Spot;
}>();
const { spot } = toRefs(props);

const { handleRadius } = useNearby(
  spot.value.location.latitude,
  spot.value.location.longitude,
  hospitalityCategories,
  {
    inputId: "radius-btn-bed",
    labelId: "radius-label-bed",
  }
);

function updateRadius(event: any): void {
  handleRadius(event.target.value);
}
</script>

<template>
  <div id="sidebar">
    <h3>Où dormir</h3>
    <div id="innerWrapper">
      <div class="sectionHeader">
        <ion-item-divider mode="md">
          <label id="radius-label-bed" for="radius">Rayon 5&thinsp;km</label>
        </ion-item-divider>

        <div class="radius__container">
          <ion-range
            id="radius-btn-bed"
            min="10"
            max="50000"
            mode="md"
            :value="RADIUS_POINTS_OF_INTEREST"
            @ionChange="updateRadius"
          ></ion-range>
        </div>

        <span is="pagination" class="pagination">
          <ion-button id="page-previous" size="small" fill="clear">
            <ion-icon slot="start" name="chevron-back"></ion-icon>
            Précédent
          </ion-button>

          <ion-button id="page-next" size="small" fill="clear">
            Suivant
            <ion-icon slot="end" name="chevron-forward"></ion-icon>
          </ion-button>
        </span>
      </div>
      <ul id="results"></ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
#results {
  padding: 0;
}
.radius__container {
  width: 100%;
}
.pagination {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
