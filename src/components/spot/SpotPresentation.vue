<script lang="ts" setup>
import { toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { getUserById } from "@/services/user.service";
import { PhotoSpot } from "@/models/photoSpot.model";
import { Spot } from "@/models/spot.model";

const props = defineProps<{
  spot: Spot;
}>();

const { spot } = toRefs(props);

const router = useRouter();

const user = getUserById(spot.value?.authorId ?? "");

const isOpen = ref(false);

const currentPhoto = ref<PhotoSpot | null>(null);

const setOpen = (open: boolean, photo: PhotoSpot | null) => {
  currentPhoto.value = photo;
  isOpen.value = open;
};

function viewAuthor(authorId: string): void {
  router.push(`/author/${authorId}`);
}
</script>

<template>
  <div class="presentation-content">
    <h5>Auteur</h5>
    <ion-item button v-if="user" @click="viewAuthor(user.id)">
      <ion-avatar slot="start">
        <img :src="user.avatar" />
      </ion-avatar>
      <ion-label>{{ user.pseudo }}</ion-label>
    </ion-item>
    <h5>Les points de vue</h5>
    <div v-if="spot.photos" class="pins">
      <div class="pin" :key="index" v-for="(photo, index) in spot.photos">
        <img :src="photo.image" @click="setOpen(true, photo)" />
      </div>
    </div>

    <ion-modal :is-open="isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-title>Modal</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="setOpen(false, null)">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <img :src="currentPhoto?.image" />
        <p>
          {{
            currentPhoto?.shootedAt
              ? currentPhoto.shootedAt.toDate()
              : spot.createdAt.toDate()
          }}
        </p>
      </ion-content>
    </ion-modal>
  </div>
</template>

<style lang="scss">
.pins {
  column-count: 4;
  position: relative;
  z-index: 500;
  .pin {
    display: inline-block;
    height: 150px;
    margin: 0;
    padding: 4px;
    img,
    ion-skeleton-text {
      border-radius: 6px;
    }
    ion-skeleton-text {
      background-color: aqua;
    }
  }
}
</style>
