<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getUserById } from "@/services/user.service";
import { UseGeolocation } from "@vueuse/components";
import { useCurrentUser } from "vuefire";
import StepLocation from "../components/StepLocation.vue";
import { useMap } from "../composables/useMap";
import { API_KEY_WOOSMAP } from "../constants/map";

/* import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from "swiper";
 */ import { Swiper, SwiperSlide } from "swiper/vue";

/* import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css"; */

const currentUser = useCurrentUser();

const user = getUserById(currentUser.value?.uid as string);

const spotName = ref<string>("");

const slideData = ref<any>([
  { id: "1", name: "localisation" },
  { id: "2", name: "ajout photos" },
  { id: "3", name: "recommandations" },
]);

const currentStep = ref<number>(1);

function nextStep() {
  console.log("valider");
}

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
            <ion-back-button defaultHref="/tabs/home"></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title class="oswald-title">SHOOTEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-if="user" class="container">
        <!--         <StepLocation v-if="currentStep === 1" /> -->

        <swiper
          :pagination="true"
          :scrollbar="true"
          :zoom="true"
          :keyboard="true"
          @slideChange="onSlideChange($event)"
        >
          <swiper-slide>Slide 1</swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
        </swiper>

        <div class="action">
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
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.container {
}

.action {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
