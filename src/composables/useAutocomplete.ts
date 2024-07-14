import { onMounted, ref } from "vue";

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

export function useAutoComplete() {
  onMounted(() => {
    inputElement.value = document.getElementById(
      "autocomplete-input"
    ) as HTMLInputElement;

    suggestionsList.value = document.getElementById(
      "suggestions-list"
    ) as HTMLUListElement;
    clearSearchBtn.value = document.getElementsByClassName(
      "clear-searchButton"
    )[0] as HTMLButtonElement;

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

  document.addEventListener("click", (event) => {
    const targetElement = event.target as Element;
    const isClickInsideAutocomplete = targetElement.closest(
      "#autocomplete-container"
    );

    if (!isClickInsideAutocomplete && suggestionsList.value) {
      suggestionsList.value.style.display = "none";
    }
  });

  function handleAutocomplete(): void {
    if (inputElement.value && suggestionsList.value && inputElement.value) {
      request.input = inputElement.value.value;

      if (request.input) {
        debouncedLocalitiesAutocomplete(request)
          .then((localities) => displaySuggestions(localities))
          .catch((error) =>
            console.error("Error autocomplete localities:", error)
          );
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
      .catch((error) =>
        console.error("Error getting locality details:", error)
      );
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

  return {};
}
