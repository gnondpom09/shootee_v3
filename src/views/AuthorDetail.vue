<script setup lang="ts">
import { getUserById } from "@/services/user.service";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = String(route.params.id);

const currentUser = getUserById(id);

const user = getUserById(currentUser.value?.id as string);
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-buttons slot="start">
            <ion-button @click="router.back()">Retour</ion-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title class="oswald-title">SHOOTEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="user">
      <div class="profile">
        <ion-avatar v-if="user.avatar">
          <img :src="user.avatar" />
        </ion-avatar>

        <h3>{{ user.pseudo }}</h3>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 33%;

  ion-avatar {
    width: 222px;
    height: 222px;
  }
}
</style>
