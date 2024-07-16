<script setup lang="ts">
const emit = defineEmits<{
  (event: "close"): void;
}>();
</script>

<template>
  <ion-content>
    <h1>Merci de votre contribution</h1>
    <ion-img src="../../assets/success.png"></ion-img>

    <p>Vous venez d'ajouter un nouveau sopt avec 7 photos.</p>
  </ion-content>
</template>

<style scoped lang="scss"></style>
