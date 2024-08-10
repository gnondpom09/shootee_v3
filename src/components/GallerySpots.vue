<script setup lang="ts">
import { DocumentData } from "firebase/firestore";
import { Ref, toRefs } from "vue";

const props = defineProps<{
  spots: Ref<DocumentData[]>;
}>();

const { spots } = toRefs(props);

const emit = defineEmits<{
  (event: "view-spot", id: string): void;
}>();
</script>

<template>
  <ion-row class="pins">
    <ion-col :key="index" v-for="(spot, index) in spots" size="4" class="pin">
      <div
        class="gallery"
        :style="{ 'background-image': 'url(' + spot.thumbnail + ')' }"
        style="
          height: 120px;
          background-size: cover;
          background-color: #fff;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 12px;
        "
      >
        <ion-button
          class="link"
          @click="emit('view-spot', spot.id)"
        ></ion-button>
        <ion-icon
          v-if="!spot.isPublic"
          slot="icon-only"
          class="private-spot"
          name="ellipse"
        ></ion-icon>
      </div>
    </ion-col>
  </ion-row>
</template>

<style lang="scss" scoped>
.private-spot {
  padding: 4px;
  color: var(--ion-color-primary);
  position: absolute;
  right: 4px;
}

.link {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  bottom: 0;
}
</style>
