<script setup lang="ts">
// import { camera, trash, close } from 'ionicons/icons';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Recherche</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ExploreContainer />
    </ion-content>
  </ion-page>
</template>
