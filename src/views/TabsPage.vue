<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon aria-hidden="true" :icon="gridOutline" />
        </ion-tab-button>

        <ion-tab-button tab="search" href="/tabs/search">
          <ion-icon aria-hidden="true" :icon="locationOutline" />
        </ion-tab-button>

        <ion-tab-button tab="add-spot" href="/add-spot">
          <ion-icon aria-hidden="true" :icon="addCircleOutline" />
        </ion-tab-button>

        <ion-tab-button tab="bookmarks" href="/tabs/bookmarks" disabled>
          <ion-icon aria-hidden="true" :icon="bookmarksOutline" />
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon aria-hidden="true" :icon="personCircleOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  gridOutline,
  locationOutline,
  personCircleOutline,
  addCircleOutline,
  bookmarksOutline,
} from "ionicons/icons";
</script>
