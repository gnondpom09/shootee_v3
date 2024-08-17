<script setup lang="ts">
import SpotsCardList from "@/components/SpotsCardList.vue";
import { getPublicSpotsByAuthor } from "@/services/marker.service";
import { getUserById } from "@/services/user.service";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = String(route.params.id);

const author = getUserById(id);

const isContentLoading = ref<boolean>(true);

const spots = ref();

onMounted(() => {
  setTimeout(() => {
    spots.value = getPublicSpotsByAuthor(id);
    isContentLoading.value = false;
  }, 400);
});

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
            <ion-back-button
              mode="ios"
              text="Retour"
              defaultHref="/tabs/home"
            ></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title class="oswald-title">SHOOTEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="author">
      <div class="profile container-flex-center">
        <h3 class="ion-padding">{{ author.pseudo }}</h3>
        <ion-avatar v-if="author.avatar" class="big-avatar">
          <img :src="author.avatar" />
        </ion-avatar>
        <div v-else class="no-big-avatar"></div>
      </div>

      <div
        v-if="author.instagramAccount"
        class="container-flex-center insta-section"
      >
        <ion-button shape="round">
          <a
            class="link"
            :href="author.instagramAccount"
            target="_blank"
            rel="noopener noreferrer"
          ></a
          >Voir le profil Instagram
        </ion-button>
      </div>

      <ion-item-divider mode="md">
        <ion-label>Spots</ion-label>
      </ion-item-divider>

      <div v-if="spots && !isContentLoading" class="spots-list">
        <SpotsCardList :spots="spots" disabled @view-post="viewSpot" />
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.profile {
  margin-bottom: 16px;
}
</style>
