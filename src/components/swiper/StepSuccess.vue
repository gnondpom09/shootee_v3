<script setup lang="ts">
const emit = defineEmits<{
  (event: "close"): void;
}>();

function getImageUrl(url: string) {
  return new URL(url, import.meta.url).href;
}
</script>

<template>
  <ion-content>
    <div class="success-content">
      <h1>Merci de votre contribution</h1>
      <ion-img :src="getImageUrl('../../assets/success.png')"></ion-img>

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
