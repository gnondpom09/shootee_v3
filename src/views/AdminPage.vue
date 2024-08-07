<script setup lang="ts">
import { Profile } from "@/models/profile.model";
import { getAllUsers, removeUser } from "@/services/user.service";
import { alertController } from "@ionic/vue";

const users = getAllUsers();

async function alertRemoveUser(user: Profile) {
  const alert = await alertController.create({
    header: "Suppression utilisateur",
    message: `Vous êtes sur le point de supprimer définitivement ${user.pseudo}, confirmez vous la suppression`,
    buttons: [
      {
        text: "Annuler",
        role: "cancel",
      },
      {
        text: "OK",
        role: "confirm",
        handler: () => {
          removeUser(user.id);
        },
      },
    ],
  });
  await alert.present();
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-buttons slot="start">
            <ion-back-button
              mode="ios"
              text="Retour"
              defaultHref="/tabs/profile"
            ></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title>Administration</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-list-header>
          <ion-label>Liste des utilisateurs</ion-label>
        </ion-list-header>
        <ion-item-sliding v-for="user in users" :key="user.id">
          <ion-item>
            <ion-avatar>
              <img :src="user.avatar" />
            </ion-avatar>
            <ion-label>{{ user.email }}</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="alertRemoveUser(user)"
              >delete</ion-item-option
            >
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss"></style>
