<script setup lang="ts">
import { onMounted } from "vue";
import { useMap } from "@/composables/useMap";
import { useGeocode } from "@/composables/useGeocode";
import AutocompleteSearch from "@/components/AutocompleteSearch.vue";

const { reverseGeocodeMarker, setCoordonates } = useGeocode();

const initializeMap = useMap("map");

onMounted(() => {
  initializeMap.setMarkersOnMap();
});

function validLocality(
  locality: woosmap.map.localities.LocalitiesDetailsResult
) {
  if (locality.geometry?.location) {
    setCoordonates(
      locality.geometry.location.lat,
      locality.geometry.location.lng
    );
    reverseGeocodeMarker(
      locality.geometry.location.lat,
      locality.geometry.location.lng
    );
    initializeMap.setMarker(
      locality.geometry.location.lat,
      locality.geometry.location.lng
    );
  }
}
</script>

<template>
  <div id="app">
    <AutocompleteSearch @select-city="validLocality($event)" />

    <div id="map"></div>
  </div>
</template>

<style scoped lang="scss">
#map {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.mapboxgl-ctrl-top-right {
  right: 0;
  bottom: 55px !important;
}

.autocomplete-container {
  position: absolute;
  top: 10px;
  left: 10px;
}

#app {
  height: 100%;
}

.info-content {
  background-color: white;
  width: 300px;
  height: 100px;
}
</style>
