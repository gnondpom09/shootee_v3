<script setup lang="ts">
import { toRefs, computed } from "vue";

const props = defineProps<{
  slider: any;
  nextButtonLabel: string;
  isNextButtonDisabled?: boolean;
}>();

const { nextButtonLabel, slider, isNextButtonDisabled } = toRefs(props);

const emit = defineEmits<{
  (event: "previousStep"): void;
  (event: "nextStep"): void;
}>();

const disabledBackButton = computed<boolean>(() => {
  if (slider.value) {
    return slider.value.activeIndex === 0 || slider.value.activeIndex === 2;
  }
  return false;
});
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
            :disabled="disabledBackButton"
            @click="emit('previousStep')"
          >
            Retour
          </ion-button>
        </ion-col>
        <ion-col>
          <ion-button
            class="action"
            color="primary"
            type="submit"
            shape="round"
            expand="full"
            :disabled="isNextButtonDisabled"
            @click="emit('nextStep')"
          >
            {{ nextButtonLabel }}
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>
