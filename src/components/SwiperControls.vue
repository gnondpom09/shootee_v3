<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{
  slider: any;
  nextButtonLabel: string;
}>();

const { slider, nextButtonLabel } = toRefs(props);

const emit = defineEmits<{
  (e: "nextStep"): void;
}>();
</script>

<template>
  <div>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-button
            class="action"
            block
            color="primary"
            type="submit"
            expand="full"
            fill="clear"
            @click="slider.slidePrev()"
          >
            Retour
          </ion-button>
        </ion-col>
        <ion-col>
          <ion-button
            class="action"
            block
            color="primary"
            type="submit"
            expand="full"
            @click="emit('nextStep')"
          >
            {{ nextButtonLabel }}
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>
