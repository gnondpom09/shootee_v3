<script setup lang="ts">
import { useSwiper } from "swiper/vue";

const swiper = useSwiper();
</script>

<template>
  <ion-button
    class="action"
    block
    color="primary"
    type="submit"
    expand="full"
    @click="swiper.slideNext()"
  >
    Continuer
  </ion-button>
</template>
