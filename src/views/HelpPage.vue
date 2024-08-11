<script setup lang="ts">
import { ref } from "vue";

const selectedSegment = ref<string>("ios");

function segmentChanged(e: CustomEvent) {
  selectedSegment.value = e.detail.value;
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
              defaultHref="/settings"
            ></ion-back-button>
          </ion-buttons>
        </ion-buttons>
        <ion-title>Rubrique d'aide</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="help-page">
        <h2>Utilisation Progressive Web App</h2>
        <ion-segment
          mode="md"
          :value="selectedSegment"
          class="sub-menu"
          @ionChange="segmentChanged($event)"
        >
          <ion-segment-button value="ios">
            <ion-label>IPhone et IPad</ion-label>
          </ion-segment-button>
          <ion-segment-button value="android">
            <ion-label>Android</ion-label>
          </ion-segment-button>
        </ion-segment>

        <div v-if="selectedSegment === 'ios'">
          <h4>Ajouter à l'écran d'accueil</h4>
          <p>
            Vous pouvez ajouter sur l'écran d'accueil un raccourci vers les
            sites Web que vous aimez. La fonctionnalité d'application Web peut
            fonctionner différemment selon le site Web.
          </p>
          <ol>
            <li>Sur votre iPhone ou votre iPad, ouvrez Chrome .</li>
            <li>Accédez à un site Web que vous souhaitez ajouter.</li>
            <li>À droite de la barre d'adresse, appuyez sur Partager .</li>
            <li>
              Recherchez l'option Ajouter à l'écran d'accueil, puis appuyez
              dessus.
            </li>
            <li>
              Confirmez ou modifiez les détails concernant le site Web, puis
              appuyez sur Ajouter.
            </li>
          </ol>

          <h5>Remarques</h5>
          <ul>
            <li>
              Si une application Web est disponible, le raccourci ouvre
              l'application.
            </li>
            <li>
              Sinon, le raccourci s'ouvre dans votre navigateur par défaut.
            </li>
          </ul>
        </div>
      </div>

      <div v-if="selectedSegment === 'android'">
        <h4>Installer une application Web</h4>

        <ol>
          <li>Sur votre appareil Android, ouvrez Chrome Chrome.</li>
          <li>
            Accédez au site Web proposant l'application Web que vous souhaitez
            installer.
          </li>
          <li>
            À droite de la barre d'adresse, appuyez sur Plus Organiser puis
            Ajouter à l'écran d'accueil puis Installer.
          </li>
          <li>Suivez les instructions à l'écran.</li>
        </ol>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped></style>
