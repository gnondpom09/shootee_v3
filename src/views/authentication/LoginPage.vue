<script setup lang="ts">
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();

const email = ref("");
const password = ref("");
const errMsg = ref("");

const router = useRouter();

function signIn() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully logged in!", data);
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
            <ion-back-button defaultHref="/tabs/home"></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title>Login</ion-title>
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
            type="password"
            label="Password"
            labelPlacement="stacked"
            v-model="password"
          ></ion-input>
        </ion-item>

        <div lines="text-center">
          <p>
            Mot de passe perdu ?
            <ion-button :click="resetPassword" fill="clear">
              Réinitialiser
            </ion-button>
          </p>
          <p>
            Pas encore inscrit ?
            <!-- <span routerLink="/register" tappable>Créer un compte</span> -->
            <router-link
              to="/register"
              custom
              v-slot="{ href, navigate, isActive }"
            >
              <NavLink :active="isActive" :href="href" @click="navigate"
                >Créer un compte</NavLink
              >
            </router-link>
          </p>
        </div>

        <p v-if="errMsg">{{ errMsg }}</p>
      </ion-card>
      <ion-button @click="signIn" expand="full"> Se connecter </ion-button>
    </ion-content>
  </ion-page>
</template>
