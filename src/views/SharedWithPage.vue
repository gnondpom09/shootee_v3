<script setup lang="ts">
import { getMarkerId, updateSpot } from "@/services/marker.service";
import { getUserByEmail } from "@/services/user.service";
import { alertController } from "@ionic/vue";
/* import { getSpotsSubscribers } from "@/services/user.service";
 */ import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const spotId = String(route.params.id);

const currentSpot = getMarkerId(spotId);

const userAuth = useCurrentUser();

/* const currentUser = getUserById(userAuth.value?.uid as string);
 */
const newSpotSubscriber = ref<string>("");

const spotsSubscribers = ref();

onMounted(() => {
  /*   spotsSubscribers.value = getSpotsSubscribers(spotId); */
  console.log(userAuth.value);
});

async function addNewSubscriber() {
  console.log(newSpotSubscriber.value);
  try {
    const subscriber = getUserByEmail(newSpotSubscriber.value);
    console.log(subscriber);

    if (currentSpot.value) {
      currentSpot.value.sharedWith?.push(subscriber.value[0].id);
      await updateSpot(spotId, currentSpot.value);
    }
  } catch {
    const alert = await alertController.create({
      header: "Service indisponible",
      message: "Un problème est survenu, veuillez réessayer plus tard.",
      buttons: ["Fermer"],
    });

    await alert.present();
  }
}

function removeUser(index: number) {
  //  const subscribers = spotsSubscribers.value.splice(index, 1);
  //    currentSpot.value?.sharedWith = subscribers;

  console.log("remove user");
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
              <ion-avatar slot="start">
                <img :src="user.avatar" />
              </ion-avatar>
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
