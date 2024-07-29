<script setup lang="ts">
import { toRefs } from "vue";
import { Spot } from "@/models/spot.model";
import { useNearby } from "@/composables/useNearby";
import { foodCategories } from "@/constants/map";

const props = defineProps<{
  spot: Spot;
}>();
const { spot } = toRefs(props);

const { handleRadius } = useNearby(
  spot.value.location.latitude,
  spot.value.location.longitude,
  foodCategories,
  {
    inputId: "radius-btn-restaurant",
    labelId: "radius-label-restaurant",
  }
);

function updateRadius(event: any): void {
  handleRadius(event.target.value);
}
</script>

<template>
  <div id="sidebar">
    <h2>Se restaurer</h2>
    <div id="innerWrapper">
      <div class="sectionHeader"><span>Rayon</span></div>
      <div class="radius__container">
        <ion-range
          id="radius-btn-restaurant"
          min="10"
          max="50000"
          value="1000"
          @ionChange="updateRadius"
        ></ion-range>
        <label id="radius-label-restaurant" for="radius">1&thinsp;km</label>
      </div>

      <div class="sectionHeader">
        <span is="pagination">
          <ion-button id="page-previous" disabled>&#8249;</ion-button>
          <ion-button id="page-next" disabled>&#8250;</ion-button>
        </span>
      </div>
      <ol id="results"></ol>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
