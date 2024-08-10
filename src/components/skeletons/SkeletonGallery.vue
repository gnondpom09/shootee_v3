<template>
  <ion-row class="pins">
    <ion-col :key="index" v-for="(_spot, index) in 12" size="4" class="pin">
      <div class="gallery" style="height: 120px; border-radius: 12px">
        <ion-skeleton-text :animated="true"></ion-skeleton-text>
      </div>
    </ion-col>
  </ion-row>
</template>
