<script setup lang="ts">
import { ref } from "vue";
import { getAllMarkers } from "@/services/marker.service";

const spots = getAllMarkers();

const selectedSegment = ref<string>("default");

function segmentChanged(e: CustomEvent) {
  selectedSegment.value = e.detail.value;
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="oswald-title">SHOOTEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <!--     <ion-header #header class="home-title ion-padding">
      <ion-toolbar>
        <ion-row>
          <ion-col size="12">
            <ion-title>
              <h1>Shootee</h1>
              <h4>Books de modèles et photographes</h4>
            </ion-title>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-header> -->
    <ion-content fullscreen>
      <div class="wall">
        <div class="home-title">
          <h1>Trouvez le spot idéal</h1>
        </div>

        <ion-segment :value="selectedSegment" @ionChange="segmentChanged">
          <ion-segment-button value="default">
            <ion-label>Recommandés</ion-label>
          </ion-segment-button>
          <ion-segment-button value="recents">
            <ion-label>Récents</ion-label>
          </ion-segment-button>
          <ion-segment-button value="nearby">
            <ion-label>A Proximité</ion-label>
          </ion-segment-button>
        </ion-segment>

        <div class="pins">
          <div
            v-if="selectedSegment === 'default'"
            class="pin"
            :key="index"
            v-for="(photo, index) in spots"
          >
            <ion-img :src="photo.thumbnail"></ion-img>
          </div>
          <div v-if="selectedSegment === 'recents'">
            <h2>segment 2</h2>
          </div>
          <div v-if="selectedSegment === 'nearby'">
            <h2>segment 3</h2>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.home-title {
  height: 200px !important;
  display: flex;
  align-items: center;
  ion-title {
    h1 {
      font-size: 2.4rem;
    }

    h4 {
      font-weight: 200;
      font-size: 1rem;
    }
  }
}
.pins {
  column-count: 3;
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
