<script setup lang="ts">
import { toRefs } from "vue";
import { Spot } from "@/models/spot.model";
import { useNearby } from "@/composables/useNearby";
import { hospitalityCategories } from "@/constants/map";

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
    <h2>Où dormir</h2>
    <div id="innerWrapper">
      <div class="sectionHeader"><span>Rayon</span></div>
      <div class="radius__container">
        <ion-range
          id="radius-btn-bed"
          min="10"
          max="50000"
          value="1000"
          @ionChange="updateRadius"
        ></ion-range>
        <label id="radius-label-bed" for="radius">1&thinsp;km</label>
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
