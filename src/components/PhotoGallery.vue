<script setup lang="ts">
import { PhotoSpot } from "@/models/photoSpot.model";
import { Spot } from "@/models/spot.model";
import { getMarkerId, updateMarker } from "@/services/marker.service";
import { alertController } from "@ionic/vue";
import { DocumentData } from "firebase/firestore";
import { onMounted, ref, toRefs } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const spotId = String(route.params.id);
const spot = ref<DocumentData | null>(null);

const isSelectionEnabled = ref<boolean>(false);

onMounted(() => {
  spot.value = getMarkerId(spotId);
});

function toggleSelection() {
  isSelectionEnabled.value = !isSelectionEnabled.value;
}

async function removePhoto(index: number) {
  const alert = await alertController.create({
    header: "Suppression photo",
    message:
      "Cette action est irréversible, souhaitez vous confirmer la suppression de cette photo.",
    buttons: [
      {
        text: "Annuler",
        role: "cancel",
      },
      {
        text: "OK",
        role: "confirm",
        handler: () => {
          if (spot.value) {
            spot.value.photos.splice(index, 1);
            updateMarker(spot.value.id, spot.value.photos);
            isSelectionEnabled.value = false;
          }
        },
      },
    ],
  });
  await alert.present();
}
</script>

<template>
  <div>
    <ion-item class="ion-no-padding" lines="none">
      <ion-toggle :checked="isSelectionEnabled" @ion-change="toggleSelection"
        >Supprimer des images</ion-toggle
      >
    </ion-item>
  </div>
  <ion-row v-if="spot">
    <ion-col :key="index" v-for="(photo, index) in spot.photos" size="4">
      <div
        class="gallery"
        :style="{ 'background-image': 'url(' + photo.preview + ')' }"
        style="
          height: 120px;
          background-size: cover;
          background-color: #fff;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 12px;
        "
      >
        <ion-button v-if="isSelectionEnabled" @click="removePhoto(index)">
          <ion-icon slot="icon-only" name="trash"></ion-icon>
        </ion-button>
      </div>
    </ion-col>
  </ion-row>
</template>

<style scoped lang="scss"></style>
