<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { getUserById } from "@/services/user.service";
import { useCurrentUser } from "vuefire";

import StepLocation from "@/components/StepLocation.vue";

import { Scrollbar, A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import { useRouter } from "vue-router";
import StepAddPhotos from "@/components/StepAddPhotos.vue";

const currentUser = useCurrentUser();

const router = useRouter();

const user = getUserById(currentUser.value?.uid as string);

const spotName = ref<string>("");

const slider = ref();

onMounted(async () => {});

const onSwiper = (event: any) => {
  slider.value = event;
};

function onSlideChange(event: any) {
  console.log(event.activeIndex);
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
          <swiper-slide>Slide 3</swiper-slide>
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
                    @click="slider.slideNext()"
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
