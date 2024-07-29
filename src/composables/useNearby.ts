import { onMounted, ref } from "vue";
import { measure } from "@/utils/map.utils";
import { useGeocode } from "@/composables/useGeocode";

const { address, reverseGeocode } = useGeocode();

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
  const radius = ref<number>(1000);

  localitiesService = new woosmap.map.LocalitiesService();

  nearbyRequest = {
    types: "point_of_interest",
    location: position.value,
    radius: 1000,
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
      label.innerHTML = `${radiusValue / 1000}&thinsp;km`;
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
        const resultListItem = document.createElement("li");

        reverseGeocode(
          result.geometry.location.lat + "," + result.geometry.location.lng
        ).then((address: any) => {
          const firstElement = address.results[0];

          resultListItem.innerHTML = `
            <h5>${result.name}</h5>
            <div style="display: flex;">
                <p>${firstElement.formatted_address}</p>
                <span class="distance">${distance.toFixed(0)}m</span>
            </div>
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
