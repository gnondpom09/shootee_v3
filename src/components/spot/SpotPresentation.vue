<script lang="ts" setup>
import { toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { getUserById } from "@/services/user.service";
import { PhotoSpot } from "@/models/photoSpot.model";
import { Spot } from "@/models/spot.model";
import { useAuth } from "@/composables/useAuth";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { updateMarker } from "@/services/marker.service";
import PhotoDetails from "@/components/spot/PhotoDetails.vue";

const props = defineProps<{
  spot: Spot;
}>();

const { spot } = toRefs(props);

const router = useRouter();

const spotAuthor = getUserById(spot.value?.authorId ?? "");

const isOpen = ref(false);

const currentPhoto = ref<PhotoSpot | null>(null);

const isSelectionEnabled = ref<boolean>(false);

const { checkUserAuth } = useAuth();

const { takePhoto, savePhotosAndGetImagesPath, photosDraft, resetPhotos } =
  usePhotoGallery();

const setOpen = (open: boolean, photo: PhotoSpot | null) => {
  currentPhoto.value = photo;
  isOpen.value = open;
};

function viewAuthor(authorId: string): void {
  router.push(`/author/${authorId}`);
}

async function contribute() {
  await takePhoto();

  if (spotAuthor.value && spot.value) {
    const photos = await savePhotosAndGetImagesPath(
      photosDraft.value,
      spotAuthor.value.id
    );
    const photosUpdated = [...spot.value.photos, ...photos];
    updateMarker(spot.value.id, photosUpdated);
    resetPhotos();
  }
}

function toggleSelection() {
  isSelectionEnabled.value = !isSelectionEnabled.value;
}

function removePhoto(index: number) {
  spot.value.photos.splice(index, 1);
  if (spotAuthor.value && spot.value) {
    updateMarker(spot.value.id, spot.value.photos);
  }
}
</script>

<template>
  <div v-if="spot" class="presentation-content">
    <h5>Auteur</h5>
    <ion-item button v-if="spotAuthor" @click="viewAuthor(spotAuthor.id)">
      <ion-avatar slot="start">
        <img :src="spotAuthor.avatar" />
      </ion-avatar>
      <ion-label>{{ spotAuthor.pseudo }}</ion-label>
    </ion-item>
    <h5>Les points de vue</h5>
    <div v-if="checkUserAuth(spot.authorId)">
      <ion-button @click="contribute"> Ajouter une photo </ion-button>
      <ion-toggle :checked="isSelectionEnabled" @ion-change="toggleSelection"
        >Supprimer des images</ion-toggle
      >
    </div>
    <div class="pins">
      <div class="pin" :key="index" v-for="(photo, index) in spot.photos">
        <img :src="photo.preview" @click="setOpen(true, photo)" />
        <ion-button v-if="isSelectionEnabled" @click="removePhoto(index)">
          <ion-icon slot="icon-only" name="trash"></ion-icon>
        </ion-button>
      </div>
    </div>

    <ion-modal :is-open="isOpen">
      <PhotoDetails
        v-if="currentPhoto"
        :photo="currentPhoto"
        :spot="spot"
        @close="setOpen(false, null)"
      />
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
