<script setup lang="ts">
import { toRefs } from "vue";
import { useSwiper } from "swiper/vue";

const props = defineProps<{
  slider: any;
}>();

const { slider } = toRefs(props);

const emit = defineEmits<{
  (e: "nextStep"): void;
}>();

const swiper = useSwiper();
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
            @click="$emit('nextStep')"
          >
            Continuer
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>
