import { onMounted, ref } from "vue";
import { measure } from "@/utils/map.utils";
import { useGeocode } from "@/composables/useGeocode";
import { RADIUS_POINTS_OF_INTEREST } from "@/constants/map";
import { getRandomId } from "@/utils/html.utils";

const { reverseGeocode } = useGeocode();

let results: HTMLOListElement;
let localitiesService: woosmap.map.LocalitiesService;
let nearbyRequest: woosmap.map.localities.LocalitiesNearbyRequest;

interface radiusButton {
  inputId: string;
  labelId: string;
}

export function useNearby(
  latitude: number,
  longitude: number,
  availableCategories: string[],
  radiusBtn: radiusButton
) {
  const position = ref<woosmap.map.LatLngLiteral>({
    lat: latitude,
    lng: longitude,
  });
  const radius = ref<number>(RADIUS_POINTS_OF_INTEREST);

  localitiesService = new woosmap.map.LocalitiesService();

  nearbyRequest = {
    types: "point_of_interest",
    location: position.value,
    radius: RADIUS_POINTS_OF_INTEREST,
    categories: "",
    page: 1,
    limit: 10,
  };

  onMounted(() => {
    initUI();
    performNearbyRequest();
  });

  function initUI() {
    results = document.querySelector("#results") as HTMLOListElement;

    const debouncedHandleRadius = debounce(handleRadius, 300);

    document
      .getElementById(radiusBtn.inputId)
      ?.addEventListener("input", (e) => {
        const radiusValue = parseInt((e.target as HTMLInputElement).value);
        debouncedHandleRadius(radiusValue);
      });
    document
      .getElementById("page-previous")
      ?.addEventListener("click", previousPage);
    document.getElementById("page-next")?.addEventListener("click", nextPage);
  }

  function performNearbyRequest(
    overrideCenter: woosmap.map.LatLng | null = null,
    newQuery = true
  ) {
    const requestCenter = overrideCenter || position.value;

    nearbyRequest.location = requestCenter;
    nearbyRequest.radius = radius.value;
    nearbyRequest.categories = "";

    nearbyRequest.categories = Array.from(availableCategories).join("|");

    if (newQuery) {
      nearbyRequest.page = 1;
    }

    localitiesService.nearby(nearbyRequest).then((responseJson) => {
      updateResults(responseJson, requestCenter);
    });
  }

  function handleRadius(radiusValue: number) {
    radius.value = radiusValue;

    const label = document.getElementById(radiusBtn.labelId);
    if (radiusValue < 1000 && label) {
      label.innerHTML = `${radiusValue}&thinsp;m`;
    } else if (label) {
      label.innerHTML = `Rayon ${radiusValue / 1000}&thinsp;km`;
    }

    performNearbyRequest();
  }

  function previousPage() {
    let newQuery = true;

    if (nearbyRequest.page && nearbyRequest.page > 1) {
      nearbyRequest.page--;
      newQuery = false;
    }
    performNearbyRequest(null, newQuery);
  }

  function nextPage() {
    let newQuery = true;

    if (nearbyRequest.page) {
      nearbyRequest.page++;
      newQuery = false;
    }
    performNearbyRequest(null, newQuery);
  }

  function updatePagination(
    pagination: woosmap.map.localities.LocalitiesNearbyPagination
  ) {
    if (pagination.next_page) {
      document.getElementById("page-next")?.removeAttribute("disabled");
    } else {
      document.getElementById("page-next")?.setAttribute("disabled", "true");
    }
    if (pagination.previous_page) {
      document.getElementById("page-previous")?.removeAttribute("disabled");
    } else {
      document
        .getElementById("page-previous")
        ?.setAttribute("disabled", "true");
    }
  }

  function updateResults(
    response: woosmap.map.localities.LocalitiesNearbyResponse,
    center: any
  ) {
    results.innerHTML = "";

    updatePagination(response.pagination);

    response.results.forEach(
      async (result: woosmap.map.localities.LocalitiesNearbyResult) => {
        const distance = measure(
          center.lat,
          center.lng,
          result.geometry.location.lat,
          result.geometry.location.lng
        );
        const resultListItem = document.createElement("div");

        reverseGeocode(
          result.geometry.location.lat + "," + result.geometry.location.lng
        ).then((geocode: any) => {
          //const firstElement = address.results[0];
          const { address } = geocode;

          const getName = (
            amenity: string | undefined,
            tourism: string | undefined
          ) => {
            if (amenity) {
              return amenity;
            }
            if (tourism) {
              return tourism;
            }
            return "-";
          };

          /*           <strong>${result.name}</strong>
          ${firstElement.formatted_address} */

          resultListItem.innerHTML = `
            <ion-item
              detail="false"
              class="item-card"
              button
            >
              <a
                style="position: absolute; width: 100%; height: 100%;"
                href="https://waze.com/ul?ll=${result.geometry.location.lat},${
            result.geometry.location.lng
          }&navigate=yes"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
              <ion-label>
                  <strong>${getName(address.amenity, address.tourism)}</strong>
                  <ion-note color="medium" class="ion-text-wrap">
                    ${address.house_number ?? ""} ${address.road}, ${
            address.postcode
          } ${address.village ?? address.city}
                  </ion-note>
                </ion-label>
              <div class="metadata-end-wrapper" slot="end">
                <ion-note color="medium">${distance.toFixed(0)} m</ion-note>
                <ion-icon color="medium" icon="chevron-forward"></ion-icon>
              </div>
            </ion-item>
        `;
        });

        results.appendChild(resultListItem);
      }
    );
  }

  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return {
    handleRadius,
  };
}
