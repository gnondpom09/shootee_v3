<script setup lang="ts">
import { getAllUsers, getUserById, removeUser } from '@/services/user.service';
import { useRouter } from 'vue-router';
import { useCurrentUser } from 'vuefire';

import { ActionSheetOptions, IonActionSheet } from '@ionic/vue';

import { usePhotoGallery } from '@/composables/usePhotoGallery';

const { takePhoto, photos, getPhotoFormLibrary } = usePhotoGallery();

const router = useRouter();

const currentUser = useCurrentUser();

const users = getAllUsers();

const user = getUserById(currentUser.value?.uid ?? '');

const actionSheet: ActionSheetOptions = {
  header: 'Modifier mon avatar',
  buttons: [
    {
      text: 'Prendre une photo',
      handler: () => {
        changeAvatarFromPhoto();
      },
    },
    {
      text: 'Ouvrir la bibliothèque',
      handler: () => {
        changeAvatarFromLibrary();
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ],
};

function goToAccount() {
  router.push('/account');
}

function goToSettings() {
  router.push('/settings');
}

function changeAvatarFromPhoto() {
  // display action sheet
  if (user.value) {
    takePhoto(user.value.id);
    user.value.avatar = photos.value[0]?.webviewPath ?? user.value.avatar;
  }
}

function changeAvatarFromLibrary() {
  // display action sheet
  if (user.value) {
    getPhotoFormLibrary(user.value.id);
    user.value.avatar = photos.value[0]?.webviewPath ?? user.value.avatar;
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="user">
      <div class="profile">
        <ion-avatar v-if="user.avatar">
          <img :src="user.avatar" />
        </ion-avatar>
        <ion-button id="open-action-sheet" expand="block" fill="clear">
          Modifier l'avatar
        </ion-button>

        <h3>{{ user.pseudo }}</h3>
      </div>

      <ion-list>
        <ion-list-header>
          <ion-label>Users</ion-label>
        </ion-list-header>
        <ion-item-sliding v-for="user in users" :key="user.id">
          <ion-item>
            <ion-avatar>
              <img :src="user.avatar" />
            </ion-avatar>
            <ion-label>{{ user.email }}</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="removeUser(user.id)"
              >delete</ion-item-option
            >
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button>
          <ion-icon icon="chevron-up"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
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
</style>
