<script setup lang="ts">
import { getUserById, updateUser } from "@/services/user.service";
import { alertController } from "@ionic/vue";
import { useCurrentUser } from "vuefire";

const userAuth = useCurrentUser();

const currentUser = getUserById(userAuth.value?.uid as string);

async function updateInformation() {
  // TODO: check instagram url
  if (currentUser.value) {
    try {
      await updateUser(currentUser.value.id, currentUser.value);
      const alert = await alertController.create({
        message: "Les informations ont été mise à jour.",
        buttons: ["Fermer"],
      });

      await alert.present();
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
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/tabs/profile"></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title>Mon compte</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list v-if="currentUser">
        <ion-list-header>
          <ion-label>Information personelles</ion-label>
        </ion-list-header>
        <ion-item lines="none">
          <ion-input
            type="text"
            label="email"
            labelPlacement="stacked"
            v-model="currentUser.email"
            disabled
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-input
            type="text"
            label="Pseudo"
            labelPlacement="stacked"
            v-model="currentUser.pseudo"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-input
            type="text"
            label="Prénom"
            labelPlacement="stacked"
            v-model="currentUser.firstname"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-input
            type="text"
            label="Nom"
            labelPlacement="stacked"
            v-model="currentUser.lastname"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-input
            type="text"
            label="Date d'inscription"
            labelPlacement="stacked"
            readOnly
            v-model="currentUser.inscriptionDate"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-input
            type="text"
            label="Compte instagram"
            labelPlacement="stacked"
            v-model="currentUser.instagramAccount"
          ></ion-input>
        </ion-item>
      </ion-list>

      <ion-button
        @click="updateInformation"
        expand="block"
        fill="clear"
        color="primary"
      >
        mettre à jour
      </ion-button>
    </ion-content>
  </ion-page>
</template>
