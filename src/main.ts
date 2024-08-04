import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import "@ionic/vue/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/style.scss";

// Firebase
import { VueFire, VueFireAuthWithDependencies } from "vuefire";
import { firebaseApp } from "@/firebaseConfig";
import {
  browserLocalPersistence,
  debugErrorMap,
  indexedDBLocalPersistence,
  prodErrorMap,
} from "firebase/auth";

// PWA
import { defineCustomElements } from "@ionic/pwa-elements/loader";
defineCustomElements(window);

// Icons
import { addIcons } from "ionicons";
import {
  add,
  addCircleOutline,
  chevronUp,
  logOutOutline,
  logIn,
  remove,
  trash,
  camera,
  close,
  image,
  sunny,
  personCircleOutline,
  settingsOutline,
  person,
  grid,
  gridOutline,
  bookmark,
  bookmarkOutline,
  bookmarksOutline,
  location,
  locationOutline,
  bedOutline,
  albumsOutline,
  locateOutline,
  restaurantOutline,
  fastFoodOutline,
  carOutline,
  partlySunnyOutline,
  lockClosedOutline,
} from "ionicons/icons";
addIcons({
  add,
  remove,
  trash,
  camera,
  close,
  image,
  sunny,
  location,
  bookmark,
  person,
  grid,
  "log-in": logIn,
  "log-out-outline": logOutOutline,
  "chevron-up": chevronUp,
  "person-circle-outline": personCircleOutline,
  "settings-outline": settingsOutline,
  "location-outline": locationOutline,
  "bookmark-outline": bookmarkOutline,
  "bookmarks-outline": bookmarksOutline,
  "grid-outline": gridOutline,
  "add-circle-outline": addCircleOutline,
  "bed-outline": bedOutline,
  "albums-outline": albumsOutline,
  "locate-outline": locateOutline,
  "restaurant-outline": restaurantOutline,
  "fast-food-outline": fastFoodOutline,
  "car-outline": carOutline,
  "partly-sunny-outline": partlySunnyOutline,
  "lock-closed-outline": lockClosedOutline,
});

// Components
import {
  IonicVue,
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonItemGroup,
  IonItemDivider,
  IonAvatar,
  IonThumbnail,
  IonList,
  IonListHeader,
  IonItemSliding,
  IonLabel,
  IonInput,
  IonBackButton,
  IonButtons,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonItemOption,
  IonItemOptions,
  IonActionSheet,
  IonAlert,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonChip,
  IonImg,
  IonModal,
  IonRange,
  IonLoading,
  IonToggle,
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/vue";

// Import Swiper styles
import "swiper/scss";
import "@ionic/vue/css/ionic-swiper.css";
import { API_KEY_WOOSMAP } from "./constants/map";

const app = createApp(App).use(IonicVue).use(router);

app.component("ion-content", IonContent);
app.component("ion-page", IonPage);
app.component("ion-header", IonHeader);
app.component("ion-toolbar", IonToolbar);
app.component("ion-title", IonTitle);
app.component("ion-buttons", IonButtons);
app.component("ion-button", IonButton);
app.component("ion-back-button", IonBackButton);
app.component("ion-card", IonCard);
app.component("ion-card-header", IonCardHeader);
app.component("Ino-card-subtitle", IonCardSubtitle);
app.component("ion-card-content", IonCardContent);
app.component("ion-item", IonItem);
app.component("ion-item-group", IonItemGroup);
app.component("ion-item-divider", IonItemDivider);
app.component("ion-avatar", IonAvatar);
app.component("ion-thumbnail", IonThumbnail);
app.component("ion-list", IonList);
app.component("ion-list-header", IonListHeader);
app.component("ion-item-sliding", IonItemSliding);
app.component("ion-label", IonLabel);
app.component("ion-input", IonInput);
app.component("ion-fab", IonFab);
app.component("ion-fab-button", IonFabButton);
app.component("ion-fab-list", IonFabList);
app.component("ion-icon", IonIcon);
app.component("ion-item-option", IonItemOption);
app.component("ion-item-options", IonItemOptions);
app.component("ion-action-sheet", IonActionSheet);
app.component("ion-alert", IonAlert);
app.component("ion-grid", IonGrid);
app.component("ion-row", IonRow);
app.component("ion-col", IonCol);
app.component("ion-segment", IonSegment);
app.component("ion-segment-button", IonSegmentButton);
app.component("ion-chip", IonChip);
app.component("ion-img", IonImg);
app.component("ion-modal", IonModal);
app.component("ion-range", IonRange);
app.component("ion-lodaing", IonLoading);
app.component("ion-toggle", IonToggle);
app.component("ion-accordion", IonAccordion);
app.component("ion-accordion-group", IonAccordionGroup);

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuthWithDependencies({
      dependencies: {
        errorMap:
          process.env.NODE_ENV !== "production" ? debugErrorMap : prodErrorMap,
        persistence: [indexedDBLocalPersistence, browserLocalPersistence],
      },
    }),
  ],
});

router.isReady().then(() => {
  app.mount("#app");
});

const script = document.createElement("script");
script.src = `https://sdk.woosmap.com/map/map.js?key=${API_KEY_WOOSMAP}&callback=initMap`;
script.async = true;
document.head.appendChild(script);

/* const API_KEY_WOOSMAP = "woos-fc8fe374-edf7-3d11-86b2-7e787c73d350";

fetch(
  "https://api.woosmap.com/localities/autocomplete/?input=Lond&components=country%3Agb&no_deprecated_fields=true&key=" +
    API_KEY_WOOSMAP
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error)); */

// test nearby
fetch(
  `https://api.woosmap.com/localities/nearby?key=${API_KEY_WOOSMAP}&location=42.895424,1.794908&types=point_of_interest`
)
  .then((response) => response.text())
  //.then((result) => console.log(result))
  .catch((error) => console.log("error", error));
