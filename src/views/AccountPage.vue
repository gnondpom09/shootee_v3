<script setup lang="ts">
import { getUserById, updateUser } from '@/services/user.service';
import { useCurrentUser } from 'vuefire';

const currentUser = useCurrentUser();

const user = getUserById(currentUser.value?.uid as string);

function updateFirstname() {
  updateUser(user.value?.id as string, user.value?.firstname as string);
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/tabs/profile"></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title>Mon compte</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list v-if="user">
        <ion-item>
          <ion-input
            type="text"
            label="email"
            labelPlacement="stacked"
            v-model="user.email"
            disabled
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            type="text"
            label="firstname"
            labelPlacement="stacked"
            v-model="user.firstname"
          ></ion-input>
        </ion-item>
      </ion-list>

      <ion-button
        @click="updateFirstname"
        expand="block"
        fill="clear"
        color="primary"
      >
        mettre à jour
      </ion-button>
    </ion-content>
  </ion-page>
</template>
