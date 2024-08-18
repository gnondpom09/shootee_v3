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
    <ion-fab class="open-waze" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button size="small">
        <a
          class="link"
          :href="`https://waze.com/ul?ll=${destination.lat},${destination.lng}&navigate=yes`"
          target="_blank"
          rel="noopener noreferrer"
        ></a
        ><ion-icon size="small" name="open-outline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <div id="map-distance"></div>
    <div class="tableContainer"></div>
  </div>
</template>

<style scoped lang="scss">
.link {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 500;
}

.container {
  height: 100%;
  display: block;

  .open-waze {
    bottom: 74px;
  }

  #map-distance {
    height: 33%;
    width: 92%;
    position: absolute;
    left: 0;
    margin: 0 16px 0 16px;
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
