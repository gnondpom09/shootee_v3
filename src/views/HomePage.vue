<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAllPublicSpots,
  getPublicAndSharedSpots,
} from "@/services/marker.service";
import { useCurrentUser } from "vuefire";

const router = useRouter();

const selectedSegment = ref<string>("default");

const userAuth = useCurrentUser();

const userId = sessionStorage.getItem("uid") as string;

const spotsPublicAndShared = getPublicAndSharedSpots(userId);

const spots = getAllPublicSpots();

function segmentChanged(e: CustomEvent) {
  selectedSegment.value = e.detail.value;
}

function viewSpot(spotId: string) {
  router.push(`/spot-detail/${spotId}`);
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="oswald-title">SHOOTEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="wall">
        <div class="home-title">
          <h1>Trouvez le spot idéal</h1>
          <p class="legend">Version 0.8.0</p>
        </div>

        <ion-segment
          mode="md"
          :value="selectedSegment"
          class="sub-menu"
          @ionChange="segmentChanged"
        >
          <ion-segment-button value="default">
            <ion-label>Recommandés</ion-label>
          </ion-segment-button>
          <ion-segment-button value="recents" disabled>
            <ion-label>Récents</ion-label>
          </ion-segment-button>
          <ion-segment-button value="nearby" disabled>
            <ion-label>A Proximité</ion-label>
          </ion-segment-button>
        </ion-segment>

        <div v-if="!userAuth" class="">
          <ion-row v-if="selectedSegment === 'default' && spots" class="pins">
            <ion-col
              :key="index"
              v-for="(spot, index) in spots"
              size="4"
              class="pin"
            >
              <div
                class="gallery"
                :style="{ 'background-image': 'url(' + spot.thumbnail + ')' }"
                style="
                  height: 120px;
                  background-size: cover;
                  background-color: #fff;
                  background-repeat: no-repeat;
                  background-position: center;
                  border-radius: 12px;
                "
              >
                <ion-button
                  class="link"
                  @click="viewSpot(spot.id)"
                ></ion-button>
              </div>
            </ion-col>
          </ion-row>
          <div v-if="selectedSegment === 'recents'">
            <h2>segment 2</h2>
          </div>
          <div v-if="selectedSegment === 'nearby'">
            <h2>segment 3</h2>
          </div>
        </div>

        <div v-if="userAuth" class="">
          <ion-row
            v-if="selectedSegment === 'default' && spotsPublicAndShared"
            class="pins"
          >
            <ion-col
              :key="index"
              v-for="(sharedSpot, index) in spotsPublicAndShared"
              size="4"
              class="pin"
            >
              <div
                class="gallery"
                :style="{
                  'background-image': 'url(' + sharedSpot.thumbnail + ')',
                }"
                style="
                  height: 120px;
                  background-size: cover;
                  background-color: #fff;
                  background-repeat: no-repeat;
                  background-position: center;
                  border-radius: 12px;
                "
              >
                <ion-button
                  class="link"
                  @click="viewSpot(sharedSpot.id)"
                ></ion-button>
                <ion-icon
                  v-if="!sharedSpot.isPublic"
                  slot="icon-only"
                  class="private-spot"
                  name="ellipse"
                ></ion-icon>
              </div>
            </ion-col>
          </ion-row>
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
  flex-direction: column;
  align-items: flex-start;
  justify-content: end;

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

.private-spot {
  padding: 4px;
  color: var(--ion-color-danger);
  position: absolute;
  right: 4px;
}

.link {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  bottom: 0;
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
