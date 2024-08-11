<script setup lang="ts">
import success from "@/assets/success.png";

const emit = defineEmits<{
  (event: "close"): void;
}>();
</script>

<template>
  <ion-content>
    <div class="success-content">
      <h1>Merci de votre contribution</h1>
      <img :src="success" />

      <p>
        Vous venez d'ajouter un nouveau sopt, retrouvez toutes ses informations
        additionelles sur la carte.
      </p>
    </div>
  </ion-content>
</template>

<style scoped lang="scss">
.success-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
