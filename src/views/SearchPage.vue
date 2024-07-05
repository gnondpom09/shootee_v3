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
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Search page</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer />
    </ion-content>
  </ion-page>
</template>
