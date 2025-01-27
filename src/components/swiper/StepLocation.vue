<script setup lang="ts">
import { onMounted } from "vue";
import { useMap } from "@/composables/useMap";
import { useGeolocation } from "@vueuse/core";
import { useGeocode } from "@/composables/useGeocode";
import AutocompleteSearch from "@/components/AutocompleteSearch.vue";

const { coords } = useGeolocation();

const {
  spotName,
  address,
  reverseGeocodeMarker,
  setCoordonates,
  latitude,
  longitude,
} = useGeocode();

const initializeMap = useMap("map-add-spot");

function localize() {
  if (coords.value.latitude && coords.value.longitude) {
    setCoordonates(coords.value.latitude, coords.value.longitude);
    reverseGeocodeMarker(coords.value.latitude, coords.value.longitude);
    initializeMap.setMarker(coords.value.latitude, coords.value.longitude);
  }
}

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
  <div class="add-form">
    <ion-item class="spot-name" lines="full">
      <ion-input
        type="text"
        label="Nom du spot"
        labelPlacement="stacked"
        v-model="spotName"
        expand="full"
      ></ion-input>
    </ion-item>

    <div class="location-form">
      <AutocompleteSearch @select-city="validLocality($event)" />

      <p>ou</p>

      <ion-button
        block
        color="primary"
        type="submit"
        expand="block"
        @click="localize"
      >
        Me localiser
      </ion-button>
    </div>

    <div v-if="latitude && longitude && address" id="geolocation-section">
      <h5>{{ address }}</h5>
      <p class="location-info">
        <span> Latitude : {{ coords.latitude }} </span>
        <span> Longitude : {{ coords.longitude }} </span>
      </p>
    </div>

    <div id="map-add-spot"></div>
  </div>
</template>

<style scoped lang="scss">
.autocomplete-container {
  position: absolute;
  top: 88px;
  left: 10px;
}
.spot-name {
  text-align: left;
}
.add-form {
  height: 100%;
  width: 100%;
}
.location-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 32px 0 16px 0;
}
#geolocation-section {
  margin-top: 44px;
  text-align: center;
}
#map-add-spot {
  height: 33%;
  width: 92%;
  position: absolute;
  left: 0;
  bottom: 8%;
  margin: 4%;
}

.location-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 300;
}
</style>
