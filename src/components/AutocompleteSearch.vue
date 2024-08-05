<script setup lang="ts">
import { ref, onMounted } from "vue";
import { API_KEY_WOOSMAP } from "@/constants/map";
import { getRandomId } from "@/utils/html.utils";

const randomId = getRandomId();

const emit = defineEmits<{
  (
    event: "select-city",
    locality: woosmap.map.localities.LocalitiesDetailsResult
  ): void;
}>();

type DebouncePromiseFunction<T, Args extends any[]> = (
  ...args: Args
) => Promise<T>;

let request: woosmap.map.localities.LocalitiesAutocompleteRequest;
let debouncedLocalitiesAutocomplete: (...args: any[]) => Promise<any>;

let marker: woosmap.map.Marker;
let infoWindow: woosmap.map.InfoWindow;
let localitiesService: woosmap.map.LocalitiesService;

const inputElement = ref<HTMLInputElement | null>(null);
const suggestionsList = ref<HTMLUListElement | null>(null);
const clearSearchBtn = ref<HTMLButtonElement | null>(null);

document.addEventListener("click", (event) => {
  const targetElement = event.target as Element;
  const isClickInsideAutocomplete = targetElement.closest(
    `#autocomplete-container-${randomId}`
  );

  if (!isClickInsideAutocomplete && suggestionsList.value) {
    suggestionsList.value.style.display = "none";
  }
});

onMounted(() => {
  inputElement.value = document.getElementById(
    `autocomplete-input-${randomId}`
  ) as HTMLInputElement;

  suggestionsList.value = document.getElementById(
    `suggestions-list-${randomId}`
  ) as HTMLUListElement;
  clearSearchBtn.value = document.getElementById(
    `clear-searchButton-${randomId}`
  ) as HTMLButtonElement;

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

  initListeners();
});

function initListeners(): void {
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

    emit("select-city", locality);
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
        li.style.textAlign = "left";
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
  <div
    :id="`#autocomplete-container-${randomId}`"
    class="autocomplete-container"
  >
    <svg class="search-icon" viewBox="0 0 16 16">
      <path
        d="M3.617 7.083a4.338 4.338 0 1 1 8.676 0 4.338 4.338 0 0 1-8.676 0m4.338-5.838a5.838 5.838 0 1 0 2.162 11.262l2.278 2.279a1 1 0 0 0 1.415-1.414l-1.95-1.95A5.838 5.838 0 0 0 7.955 1.245"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>

    <input
      type="text"
      :id="`autocomplete-input-${randomId}`"
      class="autocomplete-input"
      placeholder="Rechercher un lieu..."
      autocomplete="off"
    />
    <button
      aria-label="Clear"
      :id="`clear-searchButton-${randomId}`"
      class="clear-searchButton"
      type="button"
    >
      <svg class="clear-icon" viewBox="0 0 24 24">
        <path
          d="M7.074 5.754a.933.933 0 1 0-1.32 1.317L10.693 12l-4.937 4.929a.931.931 0 1 0 1.319 1.317l4.938-4.93 4.937 4.93a.933.933 0 0 0 1.581-.662.93.93 0 0 0-.262-.655L13.331 12l4.937-4.929a.93.93 0 0 0-.663-1.578.93.93 0 0 0-.656.261l-4.938 4.93z"
        ></path>
      </svg>
    </button>
    <ul :id="`suggestions-list-${randomId}`" class="suggestions-list"></ul>
  </div>
</template>

<style scoped lang="scss">
.autocomplete-container {
  display: flex;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 -1px 0px rgba(0, 0, 0, 0.02);
  background: #fff;
  border-radius: 12px;
  padding: 0 12px;
  max-width: 320px;
  width: 100%;
  height: 42px;
  border: none;
  box-sizing: border-box;
  align-items: center;
  cursor: text;
  font-size: 15px;
}

.autocomplete-container .search-icon,
.autocomplete-container .clear-icon {
  color: black;
  flex-shrink: 0;
  height: 16px;
  width: 16px;
}

.autocomplete-container .clear-icon {
  transform: scale(1.3);
}

.autocomplete-input {
  box-sizing: border-box;
  padding: 0;
  height: 40px;
  line-height: 24px;
  vertical-align: top;
  transition-property: color;
  transition-duration: 0.3s;
  width: 100%;
  text-overflow: ellipsis;
  background: transparent;
  border-radius: 0;
  border: 0;
  margin: 0 8px;
  outline: 0;
  overflow: visible;
  appearance: textfield;
  font-size: 100%;
  color: black;
}

.clear-searchButton {
  display: none;
  height: 18px;
  width: 22px;
  background: none;
  border: none;
  vertical-align: middle;
  pointer-events: all;
  cursor: pointer;
}

.suggestions-list {
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 -1px 0px rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
  position: absolute;
  max-width: 320px;
  width: 100%;
  top: 100%;
  left: 0;
  z-index: 1;
  list-style: none;
  max-height: 80vh;
  margin: 5px 0 0;
  padding: 0;
  display: none;
  overflow-y: auto;
  background-color: #fff;
  color: black;
}

.suggestions-list.visible {
  display: block;
}

.suggestions-list li:hover {
  background-color: #f2f2f2;
}
</style>
