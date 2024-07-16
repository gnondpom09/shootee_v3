<script setup lang="ts">
import { ref } from "vue";
import { getMarkerId } from "@/services/marker.service";
import { getUserById } from "@/services/user.service";
import { useRoute } from "vue-router";

const route = useRoute();
const id = String(route.params.id);
const spot = getMarkerId(id);

/* const user = getUserById(spot.value?.authorId ?? ""); */

const selectedSegment = ref<string>("default");

function segmentChanged(e: CustomEvent) {
  selectedSegment.value = e.detail.value;
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/tabs/search"></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title>Detail</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="spot">
      <div class="spot-container">
        <ion-img :src="spot.thumbnail"></ion-img>
      </div>
      <ion-item>
        <ion-label>
          <h4>
            {{ spot.address }}
          </h4>
          <p>122 km</p>
        </ion-label>
      </ion-item>
      <ion-segment :value="selectedSegment" @ionChange="segmentChanged">
        <ion-segment-button value="default">
          <ion-icon name="call"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="heart">
          <ion-icon name="heart"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="pin">
          <ion-icon name="pin"></ion-icon>
        </ion-segment-button>
      </ion-segment>
      <div v-if="selectedSegment === 'default'">
        <h5>Auteur</h5>
        <!--         <ion-item v-if="user">
          <ion-avatar slot="start">
            <img :src="user.avatar" />
          </ion-avatar>
          <ion-label>{{ user.pseudo }}</ion-label>
        </ion-item> -->
        <h5>Les points de vue</h5>
        <div v-if="spot.photos" class="pins">
          <div class="pin" :key="index" v-for="(photo, index) in spot.photos">
            <ion-img :src="photo.image"></ion-img>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.spot-container {
  display: flex;
  flex-direction: column;
}

.pins {
  column-count: 4;
  position: relative;
  z-index: 500;
  .pin {
    display: inline-block;
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
