<script setup lang="ts">
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";
import { createUser } from "@/services/user.service";

const auth = useFirebaseAuth();

const email = ref("");
const pseudo = ref("");
const password = ref("");
const repeatPassword = ref("");
const errMsg = ref("");

const router = useRouter();

function signUp() {
  if (password.value === repeatPassword.value) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async (data) => {
        console.log("registration success!", data);
        await createUser(data.user.uid, pseudo.value, email.value);

        router.push("/tabs");
      })
      .catch((error) => {
        errMsg.value = error.message;
      });
  } else {
    alert("Les mots de passe ne sont pas identiques");
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
              defaultHref="/tabs/home"
            ></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title>S'enregistrer</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-item>
          <ion-input
            type="text"
            label="email"
            labelPlacement="stacked"
            v-model="email"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-input
            type="text"
            label="pseudo"
            labelPlacement="stacked"
            v-model="pseudo"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-input
            type="password"
            label="Password"
            labelPlacement="stacked"
            v-model="password"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-input
            type="password"
            label="Repeat password"
            labelPlacement="stacked"
            v-model="repeatPassword"
          ></ion-input>
        </ion-item>

        <p v-if="errMsg">{{ errMsg }}</p>

        <ion-button @click="signUp" expand="block" fill="clear" shape="round">
          Créer mon compte
        </ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
