<script setup lang="ts">
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";

import logo from "@/assets/logo.png";

const auth = useFirebaseAuth();

const email = ref("");
const password = ref("");
const errMsg = ref("");

const router = useRouter();

function signIn() {
  if (auth) {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        sessionStorage.setItem("uid", data.user.uid);
        router.push("/tabs");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Invalid email";
            break;
          case "auth/user-not-found":
            errMsg.value = "No account with that email was found";
            break;
          case "auth/wrong-password":
            errMsg.value = "Incorrect password";
            break;
          default:
            errMsg.value = "Email or password was incorrect";
            break;
        }
      });
  }
}

function resetPassword() {
  window.alert("reset password");
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-buttons slot="start">
            <ion-button mode="ios" router-link="/tabs/home">
              <ion-icon slot="icon-only" name="chevron-back"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="login-form">
        <div>
          <ion-img :src="logo"></ion-img>
        </div>
        <div class="form">
          <ion-item class="ion-no-padding">
            <ion-input
              type="text"
              label="email"
              labelPlacement="stacked"
              v-model="email"
            ></ion-input>
          </ion-item>

          <ion-item class="ion-no-padding">
            <ion-input
              type="password"
              label="Password"
              labelPlacement="stacked"
              v-model="password"
            ></ion-input>
          </ion-item>

          <div lines="text-center">
            <div class="actions">
              Mot de passe perdu ?
              <ion-button disabled :click="resetPassword" fill="clear"
                >Réinitialiser</ion-button
              >
            </div>
            <div class="actions">
              <p>Pas encore inscrit ?</p>

              <ion-button
                router-link="/register"
                router-direction="forward"
                fill="clear"
                >Créer mon compte</ion-button
              >
            </div>
          </div>

          <p v-if="errMsg">{{ errMsg }}</p>
        </div>
        <ion-button @click="signIn"> Se connecter </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
}
</style>
