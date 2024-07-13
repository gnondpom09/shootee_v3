<script setup lang="ts">
// import { useGeolocation } from '@vueuse/core';

// const { coords, locatedAt, error, resume, pause } = useGeolocation();
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="oswald-title">SHOOTEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div>
        <h1>Feed</h1>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.container {
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>