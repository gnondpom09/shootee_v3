<script setup lang="ts">
import { PhotoSpot } from "@/models/photoSpot.model";
import { ref, toRefs } from "vue";
import PhotoDetails from "./spot/PhotoDetails.vue";

// swipper
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

const props = defineProps<{
  photos: PhotoSpot[];
}>();

const { photos } = toRefs(props);

const isOpen = ref(false);

const currentPhoto = ref<PhotoSpot | null>(null);

const setOpen = (open: boolean, photo: PhotoSpot | null) => {
  currentPhoto.value = photo;
  console.log(currentPhoto.value);

  isOpen.value = open;
};
</script>

<template>
  <div class="container">
    <swiper
      :slidesPerView="photos.length >= 3 ? 3 : photos.length % 3"
      :spaceBetween="30"
      :pagination="{
        clickable: true,
      }"
      :modules="[Pagination]"
      class="mySwiper"
    >
      <swiper-slide :key="index" v-for="(photo, index) in photos">
        <div
          class="background-photo"
          :style="{ 'background-image': 'url(' + photo.preview + ')' }"
          @click="setOpen(true, photo)"
        ></div>
      </swiper-slide>
    </swiper>

    <ion-modal :is-open="isOpen">
      <PhotoDetails
        v-if="currentPhoto"
        :photo="currentPhoto"
        @close="setOpen(false, null)"
      />
    </ion-modal>
  </div>
</template>

<style lang="scss" scoped>
.background-photo {
  height: 110px;
  width: 110px !important;
  background-size: cover;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 12px;
  margin: 4px;
}
.container {
  display: flex;
  height: 100%;

  ion-row {
    flex-wrap: nowrap;
    overflow-x: scroll !important;
    overflow-y: hidden;
    height: 100%;

    ion-col {
      display: contents;
    }
  }
}

.swiper-slide {
  width: 300px;
  height: 100%;
  text-align: left;
}

.background-photo {
  display: block;
  width: 100%;
}
</style>
