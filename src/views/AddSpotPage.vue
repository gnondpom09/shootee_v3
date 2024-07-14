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

import { Scrollbar, A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import { useRouter } from "vue-router";

const { photos, photosDraft, savePhotoInStorage } = usePhotoGallery();

const { address } = useGeocode();

import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

const currentUser = useCurrentUser();

const router = useRouter();

const user = getUserById(currentUser.value?.uid as string);

const spotName = ref<string>("");

const slider = ref();

const onSwiper = (event: any) => {
  slider.value = event;
};

function onSlideChange(event: any) {
  /*   console.log(event.activeIndex); */
}

async function nextStep() {
  const { coords } = useGeolocation();
  if (slider.value.activeIndex === 2 && coords.value) {
    /*     const latitude = coords.value.latitude;
    const longitude = coords.value.longitude; */

    await savePhotoInStorage(photosDraft.value[0].photo as Photo);

    await createMarker(
      spotName.value,
      String(photos.value[0]?.webviewPath),
      new GeoPoint(48.8588377, 2.2770206),
      String(user.value?.id),
      address.value
    );

    router.back();
  } else {
    slider.value.slideNext();
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-buttons slot="start">
            <ion-button @click="router.back()">Fermer</ion-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title class="oswald-title">SHOOTEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-if="user" class="container">
        <swiper
          class="swiper-no-swiping"
          :modules="[Scrollbar, A11y, Navigation]"
          :navigation="{ enabled: true, prevEl: '.myPrev', nextEl: '.myNext' }"
          :scrollbar="{ draggable: false }"
          @slideChange="onSlideChange"
          @swiper="onSwiper"
        >
          <swiper-slide><StepLocation /></swiper-slide>
          <swiper-slide><StepAddPhotos /></swiper-slide>
          <swiper-slide><StepRecommendations /></swiper-slide>
        </swiper>

        <div class="action">
          <!--           <SwiperControls /> -->
          <div>
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-button
                    class="action"
                    block
                    color="primary"
                    type="submit"
                    expand="full"
                    fill="clear"
                    @click="slider.slidePrev()"
                  >
                    Retour
                  </ion-button>
                </ion-col>
                <ion-col>
                  <ion-button
                    class="action"
                    block
                    color="primary"
                    type="submit"
                    expand="full"
                    @click="nextStep"
                  >
                    Continuer
                  </ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>
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

.action {
  /*   position: absolute;
  bottom: 0;
  width: 90%; */
}
</style>
