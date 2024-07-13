<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getUserById } from "@/services/user.service";
import { UseGeolocation } from "@vueuse/components";
import { useCurrentUser } from "vuefire";
import StepLocation from "../components/StepLocation.vue";
import { useMap } from "../composables/useMap";
import { API_KEY_WOOSMAP } from "../constants/map";

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
        <StepLocation v-if="currentStep === 1" />

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

.swiper-slide {
  padding: 12px;
  text-align: center;
  font-size: 28px;
  background: #fff;
}
.swiper-container {
  width: 100%;
  height: 50%;
}
</style>
