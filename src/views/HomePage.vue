<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { onIonViewWillEnter } from "@ionic/vue";
import { getAllMarkers } from "@/services/marker.service";

const spots = getAllMarkers();

const router = useRouter();

const selectedSegment = ref<string>("default");

// const header = ref<HTMLElement | null>(null);

onIonViewWillEnter(() => {
  console.log("Home page will enter");
});

onMounted(() => {
  /*   initHeader(); */
});

/* function initHeader(): void {
  if (header.value) {
    //  this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
    header.value.style("webkitTransition: top 700ms;");
  }
} */

function segmentChanged(e: CustomEvent) {
  selectedSegment.value = e.detail.value;
}

function viewSpot(spotId: string) {
  console.log("open spot detail");
  router.push(`/spot-detail/${spotId}`);
}

/* function onContentScroll(event: any) {
  if (header.value) {
    if (event.detail.scrollTop >= 50) {
      header.value.style("top: -76px; opacity: 0; transition: all ease 1s;");
    } else {
      header.value.style("top: 28px; opacity: 1; transition: all ease 1s;");
    }
  }
} */
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="oswald-title">SHOOTEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <!--     <ion-header ref="header" class="home-title ion-padding">
      <ion-toolbar>
        <ion-row>
          <ion-col size="12">
            <ion-title>
              <h1>Shootee</h1>
              <h4>Trouvez votre spot idéal</h4>
            </ion-title>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-header> -->
    <ion-content fullscreen class="ion-padding">
      <div class="wall">
        <div class="home-title">
          <h1>Trouvez le spot idéal</h1>
          <p>Version 0.4.1</p>
        </div>

        <ion-segment
          mode="md"
          :value="selectedSegment"
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

        <div v-if="spots" class="">
          <ion-row v-if="selectedSegment === 'default'" class="pins">
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
          <!--           <div
            v-if="selectedSegment === 'default'"
            class="pin"
            :key="index"
            v-for="(photo, index) in spots"
          >
            <img v-if="photo" :src="photo.thumbnail" />
          </div> -->
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
