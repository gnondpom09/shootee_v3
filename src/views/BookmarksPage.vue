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
        <ion-title>favoris</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        bonjour {{ user?.pseudo }}
    </ion-content>
  </ion-page>
</template>