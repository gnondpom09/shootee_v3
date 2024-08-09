<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { useAlert } from "@/composables/useAlert";
import { getUserById, updateUser } from "@/services/user.service";
import { alertController } from "@ionic/vue";

const auth = useFirebaseAuth();

const userAuth = useCurrentUser();

const currentUser = getUserById(userAuth.value?.uid as string);

const router = useRouter();

const { unavalaibleFunction } = useAlert();

const isPrivateAccount = ref<boolean>(false);

function logout() {
  if (auth) {
    signOut(auth);
    router.push("/login");
  }
}

onMounted(() => {
  if (currentUser.value) {
    isPrivateAccount.value = !!currentUser.value.isPrivateAccount;
  }
});

async function updateInformation() {
  // TODO: check instagram url
  if (currentUser.value) {
    try {
      currentUser.value.isPrivateAccount = !currentUser.value.isPrivateAccount;
      await updateUser(currentUser.value.id, currentUser.value);
      isPrivateAccount.value = currentUser.value.isPrivateAccount;
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
            <ion-back-button
              mode="ios"
              text="Retour"
              defaultHref="/tabs/profile"
            ></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title>Réglages</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="currentUser">
      <ion-list>
        <ion-item button lines="none" @click="unavalaibleFunction">
          <ion-label>Notifications</ion-label>
        </ion-item>
        <ion-item button lines="none" @click="unavalaibleFunction">
          <ion-label>Conditions générales</ion-label>
        </ion-item>
        <ion-item button @click="logout" lines="none">
          <ion-label color="primary">Se déconnecter</ion-label>
        </ion-item>

        <ion-item-group>
          <ion-item-divider></ion-item-divider>

          <ion-item button lines="none" @click="unavalaibleFunction">
            <ion-label>désactiver mon compte</ion-label>
          </ion-item>
          <ion-item button lines="none" @click="unavalaibleFunction">
            <ion-label color="danger">Supprimer mon compte</ion-label>
          </ion-item>
        </ion-item-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
