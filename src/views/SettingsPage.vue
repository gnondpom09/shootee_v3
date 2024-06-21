<script setup lang="ts">
import { useFirebaseAuth } from 'vuefire';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const auth = useFirebaseAuth();

const router = useRouter();

function logout() {
  if (auth) {
    signOut(auth);
    router.push('/login');
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
        <ion-title>Réglages</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item button>
          <ion-label>Notifications</ion-label>
        </ion-item>
        <ion-item button>
          <ion-label>Conditions générales</ion-label>
        </ion-item>
        <ion-item button @click="logout">
          <ion-label color="primary">Se déconnecter</ion-label>
        </ion-item>
        <ion-item>
          <ion-label></ion-label>
        </ion-item>
        <ion-item button>
          <ion-label>Se désabonner</ion-label>
        </ion-item>
        <ion-item button>
          <ion-label color="danger">Supprimer mon compte</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
