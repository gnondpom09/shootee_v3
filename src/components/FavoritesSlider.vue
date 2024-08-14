<script setup lang="ts">
import { DocumentData } from "firebase/firestore";
import { onMounted, Ref, toRefs, ref } from "vue";
import PhotosSlider from "./PhotosSlider.vue";
import SwiperFavorites from "./SwiperFavorites.vue";

const props = defineProps<{
  favorites: Ref<DocumentData[]>;
}>();

const { favorites } = toRefs(props);

const currentFavorite = ref();

onMounted(() => {
  setTimeout(() => {
    if (favorites) {
      currentFavorite.value = favorites.value[0];
    }
  }, 400);
});

const emit = defineEmits<{
  (event: "view-favorite", id: string): void;
}>();

function updateFavorite(favorite: DocumentData) {
  currentFavorite.value = favorite;
}
</script>

<template>
  <div class="container-favorites">
    <h3 class="ion-padding">Mes spots favoris</h3>
    <SwiperFavorites
      :favorites="favorites"
      @view-favorite="emit('view-favorite', $event)"
      @update-favorite="updateFavorite"
    />
  </div>

  <div v-if="currentFavorite" class="container-photos ion-padding">
    <h3>Photos du spot</h3>
    <PhotosSlider :photos="currentFavorite.photos" />
  </div>
</template>

<style lang="scss" scoped>
.container-favorites {
  height: 60%;
}

.container-photos {
  height: 24%;
  margin-top: 24px;

  h3 {
    margin-top: 24px;
  }
}
</style>
