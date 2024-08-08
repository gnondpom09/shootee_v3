<script lang="ts" setup>
import { toRefs, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getUserById, updateUser } from "@/services/user.service";
import { PhotoSpot } from "@/models/photoSpot.model";
import { Spot } from "@/models/spot.model";
import { useAuth } from "@/composables/useAuth";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { updateMarker, updateSpot } from "@/services/marker.service";
import PhotoDetails from "@/components/spot/PhotoDetails.vue";
import { ActionSheetOptions, alertController } from "@ionic/vue";
import { useCompareTime } from "@/composables/useCompareTime";

const props = defineProps<{
  spot: Spot;
}>();

const { spot } = toRefs(props);

const router = useRouter();

const spotAuthor = getUserById(spot.value?.authorId ?? "");

const isOpen = ref(false);

const currentPhoto = ref<PhotoSpot | null>(null);

const isSelectionEnabled = ref<boolean>(false);

const selectedSegment = ref<string>("all");

const isPublicSpot = ref<boolean>(true);

const { checkUserAuth } = useAuth();

const { getPhotosByDayTime, filteredPhotos } = useCompareTime();

const { takePhoto, savePhotosAndGetImagesPath, photosDraft, resetPhotos } =
  usePhotoGallery();

onMounted(() => {
  getPhotosByDayTime(spot.value.photos, "all");
  isPublicSpot.value = !!spot.value.isPublic;
});

function segmentChanged(e: CustomEvent) {
  selectedSegment.value = e.detail.value;
  getPhotosByDayTime(spot.value.photos, selectedSegment.value);
}

const setOpen = (open: boolean, photo: PhotoSpot | null) => {
  currentPhoto.value = photo;
  isOpen.value = open;
};

const actionSheet: ActionSheetOptions = {
  header: "Modifier mon avatar",
  buttons: [
    {
      text: "Prendre une photo",
      handler: () => {
        contribute();
      },
    },
    {
      text: "Ouvrir la bibliothèque",
      handler: async () => {
        const alert = await alertController.create({
          header: "Fonctionnalité indisponible",
          message: "Cette fonctionnalité n'est pas encore disponible.",
          buttons: ["Fermer"],
        });

        await alert.present();
      },
    },
    {
      text: "Cancel",
      role: "cancel",
      data: {
        action: "cancel",
      },
    },
  ],
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

async function removePhoto(index: number) {
  if (spotAuthor.value && spot.value) {
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
            spot.value.photos.splice(index, 1);
            updateMarker(spot.value.id, spot.value.photos);
            isSelectionEnabled.value = false;
          },
        },
      ],
    });
    await alert.present();
  }
}

async function updateInformation() {
  if (spotAuthor.value) {
    try {
      spotAuthor.value.isPrivateAccount = !spotAuthor.value.isPrivateAccount;
      spot.value.isPublic = !spot.value.isPublic;
      await updateSpot(spot.value.id, spot.value);
      isPublicSpot.value = spot.value.isPublic;
    } catch {
      const alert = await alertController.create({
        header: "Service indisponible",
        message: "Un problème est survenu, veuillez réessayer plus tard.",
        buttons: ["Fermer"],
      });

      await alert.present();
    }
  }
}
</script>

<template>
  <div v-if="spot" class="presentation-content">
    <div class="author">
      <ion-item
        button
        v-if="spotAuthor"
        class="ion-no-padding"
        line="none"
        @click="viewAuthor(spotAuthor.id)"
      >
        <ion-avatar slot="start">
          <img :src="spotAuthor.avatar" />
        </ion-avatar>
        <ion-label>{{ spotAuthor.pseudo }}</ion-label>
      </ion-item>
    </div>

    <ion-accordion-group v-if="checkUserAuth(spot.authorId)">
      <ion-accordion value="first" mode="md">
        <ion-item class="ion-no-padding" slot="header">
          <ion-label>Options</ion-label>
        </ion-item>
        <div slot="content">
          <ion-list>
            <ion-item class="ion-no-padding" lines="none">
              <ion-toggle
                :checked="isSelectionEnabled"
                @ion-change="toggleSelection"
                ><p>Supprimer des images</p></ion-toggle
              >
            </ion-item>
            <ion-item class="ion-no-padding" lines="none">
              <ion-toggle
                :checked="spot.isPublic"
                @ion-change="updateInformation"
                ><p>Spot Public</p></ion-toggle
              >
            </ion-item>
            <ion-item class="ion-no-padding" lines="none">
              <ion-input
                disabled
                type="text"
                label="Partager avec"
                labelPlacement="stacked"
              ></ion-input>
            </ion-item>
          </ion-list>
        </div>
      </ion-accordion>
    </ion-accordion-group>

    <div class="header-gallery">
      <h5>Les points de vue</h5>
    </div>

    <div class="menu-photos">
      <ion-segment
        mode="md"
        :value="selectedSegment"
        class="sub-menu"
        @ionChange="segmentChanged"
      >
        <ion-segment-button value="all">
          <ion-label>Tous</ion-label>
        </ion-segment-button>
        <ion-segment-button value="morning">
          <ion-label>Matin</ion-label>
        </ion-segment-button>
        <ion-segment-button value="evening">
          <ion-label>Soir</ion-label>
        </ion-segment-button>
        <ion-segment-button value="night">
          <ion-label>Nuit</ion-label>
        </ion-segment-button>
      </ion-segment>
    </div>

    <div class="gallery">
      <ion-fab
        edge
        v-if="checkUserAuth(spot.authorId)"
        vertical="top"
        horizontal="end"
        slot="fixed"
      >
        <ion-fab-button size="small" id="open-action-contribute">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-row>
        <ion-col :key="index" v-for="(photo, index) in filteredPhotos" size="4">
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
            <ion-button class="link" @click="setOpen(true, photo)">
            </ion-button>
            <ion-button v-if="isSelectionEnabled" @click="removePhoto(index)">
              <ion-icon slot="icon-only" name="trash"></ion-icon>
            </ion-button>
          </div>
        </ion-col>
      </ion-row>
    </div>

    <ion-action-sheet
      trigger="open-action-contribute"
      :header="actionSheet.header"
      :buttons="actionSheet.buttons"
    ></ion-action-sheet>

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
.author {
  margin-bottom: 12px;
}
.controls {
  display: flex;
  justify-content: start;
  padding: 8px 0;
}

.header-gallery {
  display: flex;
  justify-content: space-between;
}

.gallery {
  position: relative;
}

.link {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  bottom: 0;
}
</style>
