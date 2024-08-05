<script setup lang="ts">
import SpotsCardList from "@/components/SpotsCardList.vue";
import { getSpotsByAuthor } from "@/services/marker.service";
import { getUserById } from "@/services/user.service";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = String(route.params.id);

const author = getUserById(id);

const spots = getSpotsByAuthor(id);

function viewSpot(id: string) {
  router.push(`/spot-detail/${id}`);
}
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
    <ion-content v-if="author">
      <div class="profile">
        <ion-avatar v-if="author.avatar" class="big-avatar">
          <img :src="author.avatar" />
        </ion-avatar>
        <div v-else class="no-big-avatar"></div>

        <h3>{{ author.pseudo }}</h3>
      </div>

      <ion-button v-if="author.instagramAccount" expand="full">
        <a
          class="link"
          :href="author.instagramAccount"
          target="_blank"
          rel="noopener noreferrer"
        ></a
        >Voir le profil Instagram
      </ion-button>

      <div class="spots-list">
        <SpotsCardList :spots="spots" @view-post="viewSpot" />
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
}
</style>
