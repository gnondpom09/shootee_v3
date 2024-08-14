<script setup lang="ts">
import FavoritesSlider from "@/components/FavoritesSlider.vue";
import PhotosSlider from "@/components/PhotosSlider.vue";
import SkeletonItemsList from "@/components/skeletons/SkeletonItemsList.vue";
import SkeletonPreviewWithList from "@/components/skeletons/SkeletonPreviewWithList.vue";
import {
  getAllPublicSpots,
  getFavoritesSpots,
  getSpotsByAuthor,
} from "@/services/marker.service";
import { getUserById } from "@/services/user.service";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useCurrentUser } from "vuefire";

const router = useRouter();

const userAuth = useCurrentUser();

const currentUser = getUserById(userAuth.value?.uid as string);

const favorites = ref();

const isContentLoading = ref<boolean>(true);

onMounted(() => {
  setTimeout(() => {
    if (currentUser.value) {
      favorites.value = getFavoritesSpots(currentUser.value?.id);
      console.log(favorites.value);

      isContentLoading.value = false;
    }
  }, 800);
});

function viewFavorite(id: string) {
  router.push(`/spot-detail/${id}`);
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="oswald-title">SHOOTEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="currentUser">
      <div class="container">
        <div class="content" v-if="isContentLoading">
          <SkeletonPreviewWithList />
        </div>

        <div v-if="favorites && !isContentLoading" class="container-swiper">
          <FavoritesSlider
            :favorites="favorites"
            @view-favorite="viewFavorite"
          />

          <div class="container-empty" v-if="favorites.value.length === 0">
            <ion-button router-link="/tabs/home" shape="round">
              Ajouter des favoris
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;

  .container-swiper {
    height: 100%;
  }

  .container-empty {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    z-index: 500;
  }
}
</style>
