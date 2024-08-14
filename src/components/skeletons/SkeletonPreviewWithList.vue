<template>
  <div class="skeleton-preview ion-padding">
    <div class="preview">
      <ion-skeleton-text :animated="true"></ion-skeleton-text>
    </div>

    <h3><ion-skeleton-text :animated="true"></ion-skeleton-text></h3>
    <ion-grid>
      <ion-row class="pins">
        <ion-col
          size="2.5"
          :key="index"
          v-for="(_spot, index) in 3"
          class="pin"
        >
          <div class="square-img">
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<style lang="scss" scoped>
.skeleton-preview {
  .preview {
    display: block;
    height: 400px;
    width: 100%;
  }

  h3 {
    margin: 24px 0 16px 0;
    ion-skeleton-text {
      height: 32px;
    }
  }

  ion-row {
    flex-wrap: nowrap;
    overflow-x: scroll !important;
    overflow-y: hidden;
    height: 100%;

    ion-col {
      display: grid;

      .square-img {
        height: 90px;
        width: 90px;
      }
    }
  }
}
</style>
