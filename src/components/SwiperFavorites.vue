<script setup lang="ts">
import { ref, toRefs } from "vue";
// swipper
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { DocumentData } from "firebase/firestore";

const props = defineProps<{
  favorites: DocumentData[];
}>();

const { favorites } = toRefs(props);

const emit = defineEmits<{
  (event: "view-favorite", id: string): void;
  (event: "update-favorite", favorite: DocumentData): void;
}>();

const slider = ref();

const onSwiper = (event: any) => {
  slider.value = event;
};

function onSlideChange() {
  const activeIndex = slider.value.activeIndex;
  emit("update-favorite", favorites.value[activeIndex]);
}
</script>

<template>
  <div v-if="favorites" class="container">
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="true"
      :modules="[EffectCoverflow, Pagination]"
      class="mySwiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide :key="index" v-for="(spot, index) in favorites">
        <div
          :style="{ 'background-image': 'url(' + spot.thumbnail + ')' }"
          style="
            height: inherit;
            width: 100%;
            background-size: cover;
            background-color: #fff;
            background-repeat: no-repeat;
            background-position: center;
            border-radius: 12px;
          "
        ></div>
        <div class="spot-info">
          <h5>{{ spot.address }}</h5>

          <ion-button
            size="small"
            class="link-more"
            @click="emit('view-favorite', spot.id)"
          >
            Voir
          </ion-button>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  padding-bottom: 50px;
}

.swiper-slide {
  width: 300px;
  height: 100%;
  text-align: left;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

.spot-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 33%;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.4);

  .link-more {
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
}

.container {
  display: flex;
  height: 100%;
  padding-left: 4px;

  .link {
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    bottom: 0;
  }

  ion-row {
    flex-wrap: nowrap;
    overflow-x: scroll !important;
    overflow-y: hidden;
    height: 100%;

    ion-col {
      display: grid;
    }
  }
}
</style>
