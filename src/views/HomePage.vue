<script setup lang="ts">
import { getUserById } from '@/services/user.service';
import { useCurrentUser } from 'vuefire';

const currentUser = useCurrentUser();

const user = getUserById(currentUser.value?.uid as string);
// import { useGeolocation } from '@vueuse/core';

// const { coords, locatedAt, error, resume, pause } = useGeolocation();
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Wall</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home page</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <h1>Feed</h1>
        bonjour {{ user?.pseudo }}
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