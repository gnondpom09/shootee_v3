<script setup lang="ts">
import {
  getAllUsers,
  getUserById,
  removeUser,
  updateAvatar,
} from "@/services/user.service";
import { useRouter } from "vue-router";
import { useCurrentUser } from "vuefire";

import {
  ActionSheetOptions,
  IonActionSheet,
  alertController,
  isPlatform,
} from "@ionic/vue";

import { usePhotoGallery } from "@/composables/usePhotoGallery";

const { takeAvatarAndSave, photoUrl, avatarPreview, pickAvatarFromLibrary } =
  usePhotoGallery();

const router = useRouter();

const userAuth = useCurrentUser();

const currentUser = getUserById(userAuth.value?.uid as string);

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

function viewInstagramProfile() {
  console.log("instagram");
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
        <ion-avatar v-if="currentUser.avatar">
          <img :src="currentUser.avatarPreview" />
        </ion-avatar>
        <ion-button id="open-action-sheet" expand="block" fill="clear">
          Modifier l'avatar
        </ion-button>

        <h3>{{ currentUser.pseudo }}</h3>
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
  height: 33%;
}
.link {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
