<script setup lang="ts">
import { onMounted } from 'vue';

import { useGeolocation } from '@vueuse/core';

const { coords } = useGeolocation();

const API_KEY_WOOSMAP = 'woos-fc8fe374-edf7-3d11-86b2-7e787c73d350';

onMounted(() => {
  const script = document.createElement('script');
  script.src = `https://sdk.woosmap.com/map/map.js?key=${API_KEY_WOOSMAP}&callback=initMap`;
  script.async = true;
  document.body.appendChild(script);

  script.addEventListener('load', () => {
    initMap();
  });
});

function initMap(): void {
  const center: woosmap.map.LatLngLiteral = {
    lat: coords.value.latitude ?? '',
    lng: coords.value.longitude ?? '',
  };

  const map = new woosmap.map.Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 13,
      center: center,
    }
  );

  const marker = new woosmap.map.Marker({
    position: map.getCenter(),
    icon: {
      url: 'https://images.woosmap.com/marker.png',
      scaledSize: {
        height: 50,
        width: 32,
      },
    },
  });
  marker.setMap(map);
}
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
