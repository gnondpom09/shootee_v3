<script setup lang="ts">
import { ref } from "vue";
import { useMap } from "@/composables/useMap";
import { useGeolocation } from "@vueuse/core";
import { useGeocode } from "@/composables/useGeocode";

/* const props = defineProps<{
  latitude: string;
  longitude: string;
}>();
const { latitude, longitude } = toRefs(props); */

const { coords, resume } = useGeolocation();

const { address, reverseGeocodeMarker } = useGeocode();

const spotName = ref<string>("");

const latitude = ref<string>("");
const longitude = ref<string>("");

const initMap = useMap("map-add-spot");

function localize() {
  const { setMarker } = initMap;

  if (coords.value.latitude && coords.value.longitude) {
    latitude.value = String(coords.value.latitude);
    longitude.value = String(coords.value.longitude);

    reverseGeocodeMarker(coords.value.latitude, coords.value.longitude);

    setMarker(coords.value.latitude, coords.value.longitude);
  }
}
</script>

<template>
  <div class="add-form">
    <ion-item>
      <ion-input
        type="text"
        label="Nom du spot"
        labelPlacement="stacked"
        v-model="spotName"
        expand="full"
      ></ion-input>
    </ion-item>

    <div class="location-form">
      <div id="autocomplete-container">
        <svg class="search-icon" viewBox="0 0 16 16">
          <path
            d="M3.617 7.083a4.338 4.338 0 1 1 8.676 0 4.338 4.338 0 0 1-8.676 0m4.338-5.838a5.838 5.838 0 1 0 2.162 11.262l2.278 2.279a1 1 0 0 0 1.415-1.414l-1.95-1.95A5.838 5.838 0 0 0 7.955 1.245"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>

        <input
          type="text"
          id="autocomplete-input"
          placeholder="Search Localities..."
          autocomplete="off"
        />
        <button aria-label="Clear" class="clear-searchButton" type="button">
          <svg class="clear-icon" viewBox="0 0 24 24">
            <path
              d="M7.074 5.754a.933.933 0 1 0-1.32 1.317L10.693 12l-4.937 4.929a.931.931 0 1 0 1.319 1.317l4.938-4.93 4.937 4.93a.933.933 0 0 0 1.581-.662.93.93 0 0 0-.262-.655L13.331 12l4.937-4.929a.93.93 0 0 0-.663-1.578.93.93 0 0 0-.656.261l-4.938 4.93z"
            ></path>
          </svg>
        </button>
        <ul id="suggestions-list"></ul>
      </div>

      <p>ou</p>

      <ion-item>
        <ion-button
          block
          color="primary"
          type="submit"
          expand="block"
          @click="localize"
        >
          Me localiser
        </ion-button>
      </ion-item>
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
.add-form {
  height: 100%;
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
