<script setup lang="ts">
const emit = defineEmits<{
  (event: "close"): void;
}>();
</script>

<template>
  <ion-content>
    <h4>Meilleure saison</h4>
    <ion-grid>
      <ion-row>
        <ion-col size="6" size-md="4" size-lg="2">Printemps</ion-col>
        <ion-col size="6" size-md="4" size-lg="2">Eté</ion-col>
        <ion-col size="6" size-md="4" size-lg="2">Automne</ion-col>
        <ion-col size="6" size-md="4" size-lg="2">Hiver</ion-col>
      </ion-row>
    </ion-grid>

    <h4>Meilleur créneau horaire</h4>
    <ion-grid>
      <ion-row>
        <ion-col size="12" size-sm="3">1</ion-col>
        <ion-col size="12" size-sm="3">2</ion-col>
        <ion-col size="12" size-sm="3">3</ion-col>
        <ion-col size="12" size-sm="3">4</ion-col>
      </ion-row>
    </ion-grid>

    <h4>Catégories</h4>
    <ion-item>
      <ion-label>Catégorie</ion-label>
      <ion-input></ion-input>
    </ion-item>
    <ion-chip color="primary" mode="ios" outline="true">
      <ion-label>Default</ion-label>
      <ion-icon name="close-circle"></ion-icon>
    </ion-chip>
    <ion-chip color="primary" mode="ios" outline="true">
      <ion-label>Default</ion-label>
      <ion-icon name="close-circle"></ion-icon>
    </ion-chip>
    <ion-chip color="primary" mode="ios" outline="true">
      <ion-label>Default</ion-label>
      <ion-icon name="close-circle"></ion-icon>
    </ion-chip>
  </ion-content>
</template>

<style scoped lang="scss">
ion-grid {
  --ion-grid-padding: 20px;

  --ion-grid-padding-xs: 20px;
  --ion-grid-padding-sm: 20px;
  --ion-grid-padding-md: 20px;
  --ion-grid-padding-lg: 20px;
  --ion-grid-padding-xl: 20px;

  --ion-grid-column-padding: 30px;

  --ion-grid-column-padding-xs: 30px;
  --ion-grid-column-padding-sm: 30px;
  --ion-grid-column-padding-md: 30px;
  --ion-grid-column-padding-lg: 30px;
  --ion-grid-column-padding-xl: 30px;
}

ion-col {
  background-color: #135d54;
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
</style>
