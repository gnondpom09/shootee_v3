<script setup lang="ts">
import { alertController } from "@ionic/vue";
import { DocumentData } from "firebase/firestore";
import { toRefs, Ref } from "vue";

const props = defineProps<{
  spots: Ref<DocumentData[]>;
  title?: string;
  disabled?: boolean;
}>();

const { spots, title } = toRefs(props);

const emit = defineEmits<{
  (event: "view-post", id: string): void;
}>();

async function removeSpot(spotId: string) {
  const alert = await alertController.create({
    header: "Suppression spot",
    message:
      "Cette action est irréversible, souhaitez vous confirmer la suppression de ce spot.",
    buttons: [
      {
        text: "Annuler",
        role: "cancel",
      },
      {
        text: "OK",
        role: "confirm",
        handler: () => {
          removeSpot(spotId);
        },
      },
    ],
  });
  await alert.present();
}
</script>

<template>
  <ion-list>
    <ion-list>
      <ion-list-header v-if="title">
        <ion-label>{{ title }}</ion-label>
      </ion-list-header>
      <ion-item-sliding
        :disabled="disabled"
        v-for="(spot, index) in spots"
        :key="index"
      >
        <ion-item
          button
          detail="false"
          class="item-card"
          @click="emit('view-post', spot.id)"
        >
          <ion-thumbnail slot="start">
            <img :src="spot.thumbnail" />
          </ion-thumbnail>
          <ion-label>
            <strong v-if="spot.name"
              >{{ spot.name
              }}<span v-if="!spot.isPublic" class="note-danger">
                - Privé</span
              ></strong
            >
            <strong v-else
              >Spot {{ index + 1
              }}<span v-if="!spot.isPublic" class="note-danger">
                - Privé</span
              ></strong
            >
            <ion-text>{{ spot.address }}</ion-text
            ><br />
            <ion-note color="medium" class="ion-text-wrap">
              Ajouté le {{ spot.createdAt.toDate().toDateString() }}
            </ion-note>
          </ion-label>
          <div class="metadata-end-wrapper" slot="end">
            <ion-note color="medium">{{ spot.photos.length }} photos</ion-note>
            <ion-icon color="medium" icon="chevron-forward"></ion-icon>
          </div>
        </ion-item>

        <ion-item-options side="end">
          <ion-item-option color="danger" @click="removeSpot(spot.id)"
            >Supprimer</ion-item-option
          >
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  </ion-list>
</template>

<style scoped lang="scss">
.note-danger {
  color: var(--ion-color-danger);
  font-weight: 500;
}
</style>
