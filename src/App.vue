<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap");

.oswald-title {
  font-family: "Oswald", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}
</style>
