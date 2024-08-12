<script setup lang="ts">
import { onMounted } from "vue";
import { useMap } from "@/composables/useMap";
import { useGeocode } from "@/composables/useGeocode";
import AutocompleteSearch from "@/components/AutocompleteSearch.vue";
import {
  getAllPublicSpots,
  getPublicAndSharedSpots,
} from "@/services/marker.service";

const { reverseGeocodeMarker, setCoordonates } = useGeocode();

const userId = localStorage.getItem("uid") as string;

const initializeMap = useMap("map");

onMounted(() => {
  if (userId !== "") {
    const spotsPublicAndShared = getPublicAndSharedSpots(userId);

    setTimeout(() => {
      initializeMap.setMarkersOnMap(spotsPublicAndShared.value);
    }, 800);
  } else {
    const spots = getAllPublicSpots();

    setTimeout(() => {
      initializeMap.setMarkersOnMap(spots.value);
    }, 800);
  }
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
