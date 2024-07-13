<script setup lang="ts">
import { onMounted, ref } from "vue";

import { API_KEY_WOOSMAP } from "../constants/map";
import { useGeolocation } from "@vueuse/core";
// import SearchContainer from '@/components/SearchContainer.vue';

// const { coords } = useGeolocation();

type DebouncePromiseFunction<T, Args extends any[]> = (
  ...args: Args
) => Promise<T>;

let map: woosmap.map.Map;
let marker: woosmap.map.Marker;
let infoWindow: woosmap.map.InfoWindow;
let localitiesService: woosmap.map.LocalitiesService;
let request: woosmap.map.localities.LocalitiesAutocompleteRequest;
let debouncedLocalitiesAutocomplete: (...args: any[]) => Promise<any>;

const inputElement = ref<HTMLInputElement | null>(null);
const suggestionsList = ref<HTMLUListElement | null>(null);
const clearSearchBtn = ref<HTMLButtonElement | null>(null);

onMounted(() => {
  const script = document.createElement("script");
  script.src = `https://sdk.woosmap.com/map/map.js?key=${API_KEY_WOOSMAP}&callback=initMap`;
  script.async = true;
  document.body.appendChild(script);

  inputElement.value = document.getElementById(
    "autocomplete-input"
  ) as HTMLInputElement;

  suggestionsList.value = document.getElementById(
    "suggestions-list"
  ) as HTMLUListElement;
  clearSearchBtn.value = document.getElementsByClassName(
    "clear-searchButton"
  )[0] as HTMLButtonElement;

  script.addEventListener("load", () => {
    initMap();
  });

  if (inputElement.value && suggestionsList.value) {
    inputElement.value.addEventListener("input", handleAutocomplete);

    inputElement.value.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        if (suggestionsList.value) {
          const firstLi = suggestionsList.value.querySelector("li");

          if (firstLi) {
            firstLi.click();
          }
        }
      }
    });

    if (clearSearchBtn.value && inputElement.value && suggestionsList.value) {
      clearSearchBtn.value.addEventListener("click", () => {
        if (
          inputElement.value &&
          suggestionsList.value &&
          clearSearchBtn.value
        ) {
          inputElement.value.value = "";
          suggestionsList.value.style.display = "none";
          clearSearchBtn.value.style.display = "none";

          if (marker) {
            marker.setMap(null);
            infoWindow.close();
          }
          inputElement.value.focus();
        }
      });
    }
  }
});

function initMap(): void {
  map = new woosmap.map.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 42.895328519999985, lng: 1.7943832799999995 },
    zoom: 10,
    disableDefaultUI: false,
    styles: [
      {
        featureType: "point_of_interest",
        elementType: "all",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "point_of_interest.business.shop",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        stylers: [
          {
            lightness: -15,
          },
        ],
      },
    ],
  });

  const currentMarker = new woosmap.map.Marker({
    position: map.getCenter(),
    icon: {
      url: "https://images.woosmap.com/marker.png",
      scaledSize: {
        height: 50,
        width: 32,
      },
    },
  });
  currentMarker.setMap(map);

  infoWindow = new woosmap.map.InfoWindow({});
  localitiesService = new window.woosmap.map.LocalitiesService();

  request = {
    input: "",
    types: ["locality", "address", "postal_code"],
  };

  debouncedLocalitiesAutocomplete = debouncePromise(
    localitiesService.autocomplete,
    0
  );
}

function handleAutocomplete(): void {
  if (inputElement.value && suggestionsList.value && inputElement.value) {
    request.input = inputElement.value.value;

    const args = {
      key: API_KEY_WOOSMAP,
      input: request.input,
      types: "locality|postal_code|address",
      components: "country:fr|country:es",
    };

    if (request.input) {
      debouncedLocalitiesAutocomplete(args)
        .then((localities) => displaySuggestions(localities))
        .catch((error) =>
          console.error("Error autocomplete localities:", error)
        );
      // Filter by country
      // const types = "locality|postal_code|address";
      // const components = "country:fr|country:gb|country:it|country:es|country:de";
      /*         fetch(
          `https://api.woosmap.com/localities/autocomplete/?input=${request.input}&components=${components}&types=${types}&key=${API_KEY_WOOSMAP}`,
        ).then(async(response) => {
          const localities = await response.json() as woosmap.map.localities.LocalitiesAutocompleteResponse;      
          displaySuggestions(localities);
        }); */
    } else {
      if (suggestionsList.value && clearSearchBtn.value) {
        suggestionsList.value.style.display = "none";
        clearSearchBtn.value.style.display = "none";
      }
    }
  }
}

function handleDetails(publicId: string) {
  localitiesService
    .getDetails({ publicId })
    .then((locality) => displayLocality(locality.result))
    .catch((error) => console.error("Error getting locality details:", error));
}

function displayLocality(
  locality: woosmap.map.localities.LocalitiesDetailsResult
) {
  if (marker) {
    marker.setMap(null);
    infoWindow.close();
  }

  if (locality?.geometry) {
    marker = new woosmap.map.Marker({
      position: locality.geometry.location,
      icon: {
        url: "https://images.woosmap.com/marker.png",
        scaledSize: {
          height: 50,
          width: 32,
        },
      },
    });

    marker.setMap(map);
    infoWindow.setContent(
      `<span id="${locality.public_id}">${locality.formatted_address}</span>`
    );

    infoWindow.open(map, marker);
    map.flyTo({ center: locality.geometry.location, zoom: 14 });

    const selectedLocality = document.getElementById(locality.public_id);
    if (selectedLocality) {
      selectedLocality.style.color = "blue";
    }
  }
}

function displaySuggestions(
  localitiesPredictions: woosmap.map.localities.LocalitiesAutocompleteResponse
) {
  if (inputElement.value && suggestionsList.value && clearSearchBtn.value) {
    suggestionsList.value.innerHTML = "";

    if (localitiesPredictions.localities.length > 0 && request["input"]) {
      localitiesPredictions.localities.forEach((locality) => {
        const li = document.createElement("li");

        // Define style result item
        li.onmouseover = () => {
          li.style.backgroundColor = "#f2f2f2";
        };
        li.onmouseout = () => {
          li.style.backgroundColor = "#FFFFFF";
        };
        li.style.padding = "12px";
        li.style.transition = "background-color 0.3s ease";
        li.style.cursor = "pointer";
        li.textContent = locality.description ?? "";

        li.addEventListener("click", () => {
          if (inputElement.value && suggestionsList.value) {
            inputElement.value.value = locality.description ?? "";
            suggestionsList.value.style.display = "none";
            handleDetails(locality.public_id);
          }
        });

        if (suggestionsList.value) {
          suggestionsList.value.appendChild(li);
        }
      });

      suggestionsList.value.style.display = "block";
      clearSearchBtn.value.style.display = "block";
    } else {
      suggestionsList.value.style.display = "none";
    }
  }
}

document.addEventListener("click", (event) => {
  const targetElement = event.target as Element;
  const isClickInsideAutocomplete = targetElement.closest(
    "#autocomplete-container"
  );

  if (!isClickInsideAutocomplete && suggestionsList.value) {
    suggestionsList.value.style.display = "none";
  }
});

function debouncePromise<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>,
  delay: number
): DebouncePromiseFunction<T, Args> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let latestResolve: ((value: T | PromiseLike<T>) => void) | null = null;
  let latestReject: ((reason?: any) => void) | null = null;

  return function (...args: Args): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      latestResolve = resolve;
      latestReject = reject;

      timeoutId = setTimeout(() => {
        fn(...args)
          .then((result) => {
            if (latestResolve === resolve && latestReject === reject) {
              resolve(result);
            }
          })
          .catch((error) => {
            if (latestResolve === resolve && latestReject === reject) {
              reject(error);
            }
          });
      }, delay);
    });
  };
}
</script>

<template>
  <div id="app">
    <div id="autocomplete-container">
      <svg class="search-icon" viewBox="0 0 16 16">
        <path
          d="M3.617 7.083a4.338 4.338 0 1 1 8.676 0 4.338 4.338 0 0 1-8.676 0m4.338-5.838a5.838 5.838 0 1 0 2.162 11.262l2.278 2.279a1 1 0 0 0 1.415-1.414l-1.95-1.95A5.838 5.838 0 0 0 7.955 1.245"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>

      <input
        type="text"
        id="autocomplete-input"
        placeholder="Search Localities..."
        autocomplete="off"
      />
      <button aria-label="Clear" class="clear-searchButton" type="button">
        <svg class="clear-icon" viewBox="0 0 24 24">
          <path
            d="M7.074 5.754a.933.933 0 1 0-1.32 1.317L10.693 12l-4.937 4.929a.931.931 0 1 0 1.319 1.317l4.938-4.93 4.937 4.93a.933.933 0 0 0 1.581-.662.93.93 0 0 0-.262-.655L13.331 12l4.937-4.929a.93.93 0 0 0-.663-1.578.93.93 0 0 0-.656.261l-4.938 4.93z"
          ></path>
        </svg>
      </button>
      <ul id="suggestions-list"></ul>
    </div>

    <div id="map"></div>
  </div>
</template>

<style scoped lang="scss">
#map {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.mapboxgl-ctrl-top-right {
  right: 0;
  bottom: 55px !important;
}

#autocomplete-container {
  position: absolute;
  top: 10px;
  left: 10px;
}

#app {
  height: 100%;
}
</style>
