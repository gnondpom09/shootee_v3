<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAllPublicSpots,
  getPublicAndSharedSpots,
  getSharedSpots,
} from "@/services/marker.service";
import GallerySpots from "@/components/GallerySpots.vue";
import SkeletonGallery from "@/components/skeletons/SkeletonGallery.vue";

const router = useRouter();

const selectedSegment = ref<string>("all");

const isContentLoading = ref<boolean>(true);

const userId = sessionStorage.getItem("uid") as string;

const spots = ref();

onMounted(() => {
  isContentLoading.value = true;

  setTimeout(() => {
    if (userId) {
      spots.value = getPublicAndSharedSpots(userId);
    } else {
      spots.value = getAllPublicSpots();
    }
    isContentLoading.value = false;
  }, 400);
});

function segmentChanged(e: CustomEvent) {
  selectedSegment.value = e.detail.value;

  console.log(selectedSegment.value);

  switch (selectedSegment.value) {
    case "all":
      if (userId) {
        spots.value = getPublicAndSharedSpots(userId);
      } else {
        spots.value = getAllPublicSpots();
      }
      break;

    case "publics":
      spots.value = getAllPublicSpots();
      break;

    case "shared":
      if (userId) {
        spots.value = getSharedSpots(userId);
      } else {
        spots.value = [];
      }
      break;

    default:
      break;
  }
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
          <p class="legend">Version 0.9.0</p>
        </div>

        <ion-segment
          mode="md"
          :value="selectedSegment"
          class="sub-menu"
          @ionChange="segmentChanged"
        >
          <ion-segment-button value="all">
            <ion-label>Tous</ion-label>
          </ion-segment-button>
          <ion-segment-button value="publics">
            <ion-label>Publics</ion-label>
          </ion-segment-button>
          <ion-segment-button value="shared">
            <ion-label>Partagés</ion-label>
          </ion-segment-button>
        </ion-segment>

        <div v-if="selectedSegment === 'all'" class="">
          <SkeletonGallery v-if="isContentLoading && !spots" />
          <GallerySpots
            v-if="!isContentLoading && spots"
            :spots="spots"
            @view-spot="viewSpot"
          />
        </div>

        <div v-if="selectedSegment === 'publics'">
          <SkeletonGallery v-if="isContentLoading && !spots" />
          <GallerySpots
            v-if="!isContentLoading && spots"
            :spots="spots"
            @view-spot="viewSpot"
          />
        </div>
        <div v-if="selectedSegment === 'shared'">
          <SkeletonGallery v-if="isContentLoading && !spots" />
          <GallerySpots
            v-if="!isContentLoading && spots"
            :spots="spots"
            @view-spot="viewSpot"
          />
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
