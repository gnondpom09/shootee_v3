<script setup lang="ts">
import { ref } from "vue";
import { getUserById } from "@/services/user.service";
import { createMarker } from "@/services/marker.service";
import { useCurrentUser } from "vuefire";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { useGeolocation } from "@vueuse/core";
import { GeoPoint } from "firebase/firestore";
import { useGeocode } from "@/composables/useGeocode";

import { Photo } from "@capacitor/camera";

import StepLocation from "@/components/swiper/StepLocation.vue";
import StepAddPhotos from "@/components/swiper/StepAddPhotos.vue";
import StepRecommendations from "@/components/swiper/StepRecommendations.vue";
import SwiperControls from "@/components/SwiperControls.vue";

import { Scrollbar, A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import { useRouter } from "vue-router";

import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

const { photos, photosDraft, savePhotoInStorage, resetPhotos } =
  usePhotoGallery();

const { spotName, address, latitude, longitude, resetCoordonates } =
  useGeocode();

const currentUser = useCurrentUser();

const router = useRouter();

const user = getUserById(currentUser.value?.uid as string);

const slider = ref();

const onSwiper = (event: any) => {
  slider.value = event;
};

async function nextStep() {
  const { coords } = useGeolocation();

  if (slider.value.activeIndex === 2 && coords.value) {
    await savePhotoInStorage(photosDraft.value[0].photo as Photo);

    if (latitude.value && longitude.value) {
      await createMarker(
        spotName.value,
        String(photos.value[0]?.webviewPath),
        new GeoPoint(latitude.value, longitude.value),
        String(user.value?.id),
        address.value
      );
    }

    closeAddForm();
  } else {
    slider.value.slideNext();
  }
}

function closeAddForm() {
  router.back();
  clearDatas();
}

function clearDatas() {
  resetCoordonates();
  resetPhotos();
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-buttons slot="start">
            <ion-button @click="closeAddForm">Fermer</ion-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title class="oswald-title">SHOOTEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="container">
        <swiper
          class="swiper-no-swiping"
          :modules="[Scrollbar, A11y, Navigation]"
          :navigation="{ enabled: true, prevEl: '.myPrev', nextEl: '.myNext' }"
          :scrollbar="{ draggable: false }"
          @swiper="onSwiper"
        >
          <swiper-slide><StepLocation /></swiper-slide>
          <swiper-slide><StepAddPhotos /></swiper-slide>
          <swiper-slide><StepRecommendations /></swiper-slide>
        </swiper>

        <div class="actions">
          <SwiperControls :slider="slider" @nextStep="nextStep" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.swiper {
  display: flex;
  height: 90%;
}
</style>
