<script setup lang="ts">
import { onMounted, toRefs } from "vue";
import { useDistance } from "@/composables/useDistance";
import { Spot } from "@/models/spot.model";

const props = defineProps<{
  spot: Spot;
}>();
const { spot } = toRefs(props);

const destination: woosmap.map.LatLngLiteral = {
  lat: spot.value.location.latitude,
  lng: spot.value.location.longitude,
};

const initializeDistance = useDistance("map-distance", destination);

onMounted(() => {
  initializeDistance.calculateDirections();
});
</script>

<template>
  <div class="container">
    <div id="map-distance"></div>
    <div class="tableContainer"></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
  display: block;

  #map-distance {
    height: 38%;
    width: 92%;
    position: absolute;
    left: 0;
    margin: 4%;
  }

  .tableContainer {
    max-height: 35%;
    overflow-y: auto;
    font-size: 13px;
    position: absolute;
    bottom: 4px;
    left: 0;
  }
}
</style>
