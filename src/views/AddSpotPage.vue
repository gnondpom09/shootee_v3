<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getUserById } from "@/services/user.service";
import { useCurrentUser } from "vuefire";
import StepLocation from "../components/StepLocation.vue";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useSwiper } from "swiper/vue";

/* import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css"; */
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

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

const onSwiper = (swiper: any) => {
  console.log(swiper);
};
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
          :modules="[Navigation, Pagination, Scrollbar, A11y]"
          navigation
          :pagination="{ clickable: true }"
          :scrollbar="{ draggable: true }"
          @slideChange="onSlideChange"
          @swiper="onSwiper"
        >
          <swiper-slide><StepLocation /></swiper-slide>
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
