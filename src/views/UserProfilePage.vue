<script setup lang="ts">
import { ref } from "vue";
import { getUserById, updateAvatar } from "@/services/user.service";
import { useRouter } from "vue-router";
import { useCurrentUser } from "vuefire";

import {
  ActionSheetOptions,
  IonActionSheet,
  alertController,
  isPlatform,
} from "@ionic/vue";

import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { getSpotsByAuthor } from "@/services/marker.service";

import SpotsCardList from "@/components/SpotsCardList.vue";
import { Spot } from "@/models/spot.model";

const { takeAvatarAndSave, photoUrl, avatarPreview, pickAvatarFromLibrary } =
  usePhotoGallery();

const router = useRouter();

const userAuth = useCurrentUser();

const currentUser = getUserById(userAuth.value?.uid as string);

const spots = getSpotsByAuthor(currentUser.value?.id ?? "");

const actionSheet: ActionSheetOptions = {
  header: "Modifier mon avatar",
  buttons: [
    {
      text: "Prendre une photo",
      handler: () => {
        changeAvatarFromPhoto();
      },
    },
    {
      text: "Ouvrir la bibliothèque",
      handler: async () => {
        if (isPlatform("hybrid")) {
          changeAvatarFromLibrary();
        } else {
          const alert = await alertController.create({
            header: "Fonctionnalité indisponible",
            message:
              "Cette fonctionnalité n'est disponible que sur l'application mobile.",
            buttons: ["Fermer"],
          });

          await alert.present();
        }
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

const selectedSegment = ref<string>("spots");

function segmentChanged(e: CustomEvent) {
  selectedSegment.value = e.detail.value;
}

function goToAccount() {
  router.push("/account");
}

function goToSettings() {
  router.push("/settings");
}

function goToAdminSection() {
  router.push("/admin");
}

async function changeAvatarFromPhoto() {
  if (currentUser.value) {
    await takeAvatarAndSave(currentUser.value.id);
    updatUserAvatar();
  }
}

async function changeAvatarFromLibrary() {
  if (currentUser.value) {
    await pickAvatarFromLibrary(currentUser.value.id);
    updatUserAvatar();
  }
}

function updatUserAvatar() {
  if (currentUser.value) {
    currentUser.value.avatar = photoUrl.value ?? currentUser.value.avatar;
    currentUser.value.avatarPreview =
      avatarPreview.value ?? currentUser.value.avatarPreview;

    updateAvatar(
      currentUser.value.id,
      currentUser.value.avatar,
      currentUser.value.avatarPreview
    );
  }
}

function viewSpot(id: string) {
  router.push(`/spot-detail/${id}`);
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="oswald-title">SHOOTEE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="currentUser">
      <div class="profile">
        <h3 class="ion-padding">{{ currentUser.pseudo }}</h3>
        <ion-avatar v-if="currentUser.avatar" class="big-avatar">
          <img :src="currentUser.avatarPreview" />
        </ion-avatar>
        <div v-else class="no-big-avatar"></div>
        <ion-button id="open-action-sheet" expand="block" fill="clear">
          Modifier l'avatar
        </ion-button>
      </div>

      <div class="insta-section">
        <ion-button v-if="currentUser.instagramAccount" expand="full">
          <a
            class="link"
            :href="currentUser.instagramAccount"
            target="_blank"
            rel="noopener noreferrer"
          ></a
          >Voir mon profil Instagram
        </ion-button>
        <ion-button v-else @click="goToAccount" expand="full">
          Ajouter un compte Instagram
        </ion-button>
      </div>

      <div class="sub-menu">
        <ion-segment
          mode="md"
          :value="selectedSegment"
          @ionChange="segmentChanged"
        >
          <ion-segment-button value="spots">
            <ion-label>spots</ion-label>
          </ion-segment-button>
          <ion-segment-button disabled value="followers">
            <ion-label>suivis</ion-label>
          </ion-segment-button>
          <ion-segment-button disabled value="subscribers">
            <ion-label>abonnés</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>

      <div class="content">
        <div v-if="selectedSegment === 'spots'" class="spots-list">
          <SpotsCardList :spots="spots" @view-post="viewSpot" />
        </div>
      </div>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button>
          <ion-icon icon="chevron-up"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button v-if="currentUser.isAdmin" @click="goToAdminSection">
            <ion-icon name="lock-closed-outline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="goToSettings">
            <ion-icon name="settings-outline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="goToAccount">
            <ion-icon name="person-circle-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>

      <ion-action-sheet
        trigger="open-action-sheet"
        :header="actionSheet.header"
        :buttons="actionSheet.buttons"
      ></ion-action-sheet>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 38%;
}
.link {
  position: absolute;
  width: 100%;
  height: 100%;
}

ion-list {
  width: 100%;
}
</style>
