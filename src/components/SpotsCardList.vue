<script setup lang="ts">
import { DocumentData } from "firebase/firestore";
import { toRefs } from "vue";

const props = defineProps<{
  spots: DocumentData[];
  title?: string;
}>();

const { spots, title } = toRefs(props);

const emit = defineEmits<{
  (event: "view-post", id: string): void;
}>();
</script>

<template>
  <ion-list>
    <ion-list-header v-if="title">
      <ion-label>{{ title }}</ion-label>
    </ion-list-header>
    <ion-item
      button
      detail="false"
      class="item-card"
      v-for="(spot, index) in spots"
      :key="index"
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
  </ion-list>
</template>

<style scoped lang="scss">
.note-danger {
  color: var(--ion-color-danger);
  font-weight: 500;
}
</style>
