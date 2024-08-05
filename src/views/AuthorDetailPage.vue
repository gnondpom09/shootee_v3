<script setup lang="ts">
import { getAllMarkers, getSpotsByAuthor } from "@/services/marker.service";
import { getUserById } from "@/services/user.service";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = String(route.params.id);

const currentUser = getUserById(id);

const author = getUserById(currentUser.value?.id as string);

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
        <ion-list>
          <ion-list-header>
            <ion-label>Spots</ion-label>
          </ion-list-header>
          <ion-item
            button
            detail="false"
            class="item-card"
            v-for="(spot, index) in spots"
            :key="index"
            @click="viewSpot(spot.id)"
          >
            <ion-thumbnail slot="start">
              <img :src="spot.thumbnail" />
            </ion-thumbnail>
            <ion-label>
              <strong v-if="spot.name">{{ spot.name }}</strong>
              <strong v-else>Spot {{ index + 1 }}</strong>
              <ion-text>{{ spot.address }}</ion-text
              ><br />
              <ion-note color="medium" class="ion-text-wrap">
                Ajouté le {{ spot.createdAt.toDate().toDateString() }}
              </ion-note>
            </ion-label>
            <div class="metadata-end-wrapper" slot="end">
              <ion-note color="medium"
                >{{ spot.photos.length }} photos</ion-note
              >
              <ion-icon color="medium" icon="chevron-forward"></ion-icon>
            </div>
          </ion-item>
        </ion-list>
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
