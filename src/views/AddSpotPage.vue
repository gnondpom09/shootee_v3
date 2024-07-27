<script setup lang="ts">
import { ref, computed } from "vue";
import { getUserById } from "@/services/user.service";
import { createMarker } from "@/services/marker.service";
import { useCurrentUser } from "vuefire";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { useGeolocation } from "@vueuse/core";
import { GeoPoint } from "firebase/firestore";
import { useGeocode } from "@/composables/useGeocode";

import StepLocation from "@/components/swiper/StepLocation.vue";
import StepAddPhotos from "@/components/swiper/StepAddPhotos.vue";
import StepRecommendations from "@/components/swiper/StepRecommendations.vue";
import StepSuccess from "@/components/swiper/StepSuccess.vue";
import SwiperControls from "@/components/SwiperControls.vue";

import { Scrollbar, A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import { useRouter } from "vue-router";

import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

const { photosDraft, savePhotosAndGetImagesPath, resetPhotos } =
  usePhotoGallery();

const { spotName, address, latitude, longitude, resetCoordonates } =
  useGeocode();

const currentUser = useCurrentUser();

const router = useRouter();

const user = getUserById(currentUser.value?.uid as string);

const slider = ref();
const activeIndex = ref<number>(0);

const onSwiper = (event: any) => {
  slider.value = event;
};

const nextButtonLabel = computed<string>(() => {
  if (activeIndex.value === 2) {
    return "Valider";
  }
  if (activeIndex.value === 3) {
    return "Fermer";
  }
  return "Suivant";
});

async function nextStep() {
  const { coords } = useGeolocation();

  if (slider.value.activeIndex === 2 && coords.value && user.value) {
    const photos = await savePhotosAndGetImagesPath(
      photosDraft.value,
      user.value.id
    );

    if (latitude.value && longitude.value) {
      await createMarker(
        spotName.value,
        photos[0].image,
        new GeoPoint(latitude.value, longitude.value),
        user.value.id,
        address.value,
        photos
      );
    }

    slider.value.slideNext();
  } else if (slider.value.activeIndex === 3) {
    router.push("/tabs/search");
    clearDatas();
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

function onSlideChange() {
  console.log("Slide active index : " + slider.value.activeIndex);
  activeIndex.value = slider.value.activeIndex;
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
        <ion-title>Nouveau spot</ion-title>
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
          @slideChange="onSlideChange"
        >
          <swiper-slide><StepLocation @close="closeAddForm" /></swiper-slide>
          <swiper-slide><StepAddPhotos @close="closeAddForm" /></swiper-slide>
          <swiper-slide
            ><StepRecommendations @close="closeAddForm"
          /></swiper-slide>
          <swiper-slide><StepSuccess @close="closeAddForm" /></swiper-slide>
        </swiper>

        <div class="actions">
          <SwiperControls
            :next-button-label="nextButtonLabel"
            :slider="slider"
            @nextStep="nextStep"
          />
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
