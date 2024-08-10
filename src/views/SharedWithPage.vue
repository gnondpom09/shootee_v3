<script setup lang="ts">
import { Spot } from "@/models/spot.model";
import { getMarkerId, updateSpot } from "@/services/marker.service";
import { getSpotSubscribers, getUserByEmail } from "@/services/user.service";
import { alertController } from "@ionic/vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const spotId = String(route.params.id);

const currentSpot = getMarkerId(spotId);

const newSpotSubscriber = ref<string>("");

const firends = currentSpot.value?.sharedWith
  ? currentSpot.value.sharedWith
  : [];
const spotsSubscribers = getSpotSubscribers(firends);

async function addNewSubscriber() {
  try {
    const subscriber = getUserByEmail(newSpotSubscriber.value);
    const sharedWith = currentSpot.value?.sharedWith ?? [];

    setTimeout(async () => {
      if (currentSpot.value && subscriber.value) {
        const userId = subscriber.value[0].id;
        const isExists = sharedWith.includes(userId);

        if (!isExists) {
          sharedWith.push(userId);

          const newSpot: Spot = { ...currentSpot.value, sharedWith };

          await updateSpot(spotId, newSpot);

          const alert = await alertController.create({
            header: "Nouvel invité",
            message: `Vous partagez maintenant ce spot avec ${subscriber.value[0].pseudo}.`,
            buttons: ["Fermer"],
          });

          await alert.present();

          newSpotSubscriber.value = "";
          spotsSubscribers?.value.push(subscriber.value[0]);
        }
      }
    }, 400);
  } catch {
    const alert = await alertController.create({
      header: "Utilisateur inconnu",
      message: "Aucun utilisateur trouvé, veuillez saisir un email valide.",
      buttons: ["Fermer"],
    });

    await alert.present();
  }
}

async function removeUser(index: number) {
  try {
    if (spotsSubscribers?.value && currentSpot.value?.sharedWith) {
      spotsSubscribers.value.splice(index, 1);

      currentSpot.value.sharedWith = spotsSubscribers.value.map(
        (spot) => spot.id
      );
      await updateSpot(spotId, currentSpot.value);
    }
  } catch {
    const alert = await alertController.create({
      header: "Erreur inconnu",
      message: "Un problème est survenu, veuillez réessayer plus tard.",
      buttons: ["Fermer"],
    });

    await alert.present();
  }
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
              defaultHref="/tabs"
            ></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title>Partages</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h3>Partager avec</h3>
      <ion-item lines="none">
        <ion-input
          type="text"
          label="email"
          labelPlacement="stacked"
          v-model="newSpotSubscriber"
          ><ion-button @click="addNewSubscriber" slot="end">
            <ion-icon slot="icon-only" name="add"></ion-icon> </ion-button
        ></ion-input>
      </ion-item>

      <ion-list>
        <ion-list-header class="ion-no-padding">
          <ion-label>Invités sur ce spot</ion-label>
        </ion-list-header>
        <div v-if="spotsSubscribers">
          <ion-item-sliding
            lines="none"
            v-for="(user, index) in spotsSubscribers"
            :key="index"
          >
            <ion-item>
              <ion-avatar v-if="user.avatar" slot="start">
                <img :src="user.avatar" />
              </ion-avatar>
              <ion-avatar v-else class="no-avatar" slot="start"> </ion-avatar>
              <ion-label>{{ user.pseudo }}</ion-label>
            </ion-item>

            <ion-item-options side="end">
              <ion-item-option color="danger" @click="removeUser(index)"
                >Supprimer</ion-item-option
              >
            </ion-item-options>
          </ion-item-sliding>
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped></style>
