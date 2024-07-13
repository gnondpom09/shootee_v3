<script setup lang="ts">
import { getUserById } from '@/services/user.service';
import { useCurrentUser } from 'vuefire';

const currentUser = useCurrentUser();

const user = getUserById(currentUser.value?.uid as string);
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="oswald-title">SHOOTEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h1>Mes collections</h1>
        bonjour {{ user?.pseudo }}
    </ion-content>
  </ion-page>
</template>