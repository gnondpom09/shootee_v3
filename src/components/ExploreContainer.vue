<script setup lang="ts">
import { onMounted } from 'vue';

// const API_KEY_WOOSMAP = 'woos-fc8fe374-edf7-3d11-86b2-7e787c73d350';

const conf = {
  woosmapApiKey: 'woos-48c80350-88aa-333e-835a-07f4b658a9a4',
  // woosmapApiKey: API_KEY_WOOSMAP,
  storeLocatorConfig: {
    googlemaps: {
      api_key: 'AIzaSyBn3kw1bNdgmiXAczwr2DcKLAaW-M3nX14',
      places: {
        types: ['geocode'],
      },
    },
  },
};

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://webapp.woosmap.com/webapp.js';
  script.async = true;
  document.body.appendChild(script);

  script.addEventListener('load', () => {
    init();
  });
});

function init() {
  const webapp = new window.WebApp('map', conf.woosmapApiKey);
  webapp.setConf(conf.storeLocatorConfig);
  webapp.render();
}
</script>

<template>
  <div id="map"></div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
