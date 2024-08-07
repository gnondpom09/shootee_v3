import { onMounted } from "vue";
import { formatDistance } from "@/utils/map.utils";
import { formatTime } from "@/utils/date.utils";
import { useGeolocation } from "@vueuse/core";

import carIcon from "@/assets/car.png";

let map: woosmap.map.Map;
let bounds: woosmap.map.LatLngBounds;
let directionsService: woosmap.map.DirectionsService;
let directionsRequest: woosmap.map.DirectionRequest;
let markersArray: woosmap.map.Marker[] = [];

let directionsRenderer: woosmap.map.DirectionsRenderer;

const { coords } = useGeolocation();

export function useDistance(
  mapId: string,
  destination: woosmap.map.LatLngLiteral
) {
  onMounted(() => {
    initDistance();
  });

  function initDistance(): void {
    map = new woosmap.map.Map(document.getElementById(mapId) as HTMLElement, {
      center: {
        lat: coords.value.latitude,
        lng: coords.value.longitude,
      },
      zoom: 10,
    });
    directionsService = new woosmap.map.DirectionsService();
    directionsRenderer = new woosmap.map.DirectionsRenderer({});

    directionsRenderer.setMap(map);

    bounds = new woosmap.map.LatLngBounds();

    directionsRequest = createDefaultRequest(destination);
  }

  function createMarker(
    position: woosmap.map.LatLngLiteral | woosmap.map.LatLng,
    label: string,
    url: string
  ): woosmap.map.Marker {
    return new woosmap.map.Marker({
      map,
      position,
      draggable: false,
      icon: {
        url,
        labelOrigin: new woosmap.map.Point(13, 15),
        scaledSize: {
          height: 38,
          width: 26,
        },
      },
      label: {
        text: label,
        color: "white",
      },
    });
  }

  function displayDirectionsMarkers(): void {
    const origin = {
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    };
    const originMarker = createMarker(
      origin,
      "O",
      "https://images.woosmap.com/marker-blue.svg"
    );

    const destinationMarker = createMarker(
      directionsRequest.destination,
      "D",
      "https://images.woosmap.com/marker-red.svg"
    );

    markersArray.push(originMarker);
    markersArray.push(destinationMarker);

    bounds.extend(origin as woosmap.map.LatLngLiteral);
    bounds.extend(directionsRequest.destination as woosmap.map.LatLngLiteral);

    map.fitBounds(bounds, { top: 70, bottom: 40, left: 50, right: 50 }, true);
  }

  function createDefaultRequest(
    destination: woosmap.map.LatLngLiteral
  ): woosmap.map.DirectionRequest {
    return {
      origin: {
        lat: coords.value.latitude,
        lng: coords.value.longitude,
      },
      destination,
      details: "full",
      provideRouteAlternatives: true,
      travelMode: woosmap.map.TravelMode.DRIVING,
      unitSystem: woosmap.map.UnitSystem.METRIC,
    };
  }

  function createRoutesTable(response: woosmap.map.DirectionResult) {
    const directionTripElements = response.routes.map(
      (route: woosmap.map.DirectionRoute, index: number) => {
        const distanceTotal = route.legs.reduce(
          (total, leg) => total + leg.distance.value,
          0
        );
        const durationTotal = route.legs.reduce(
          (total, leg) => total + leg.duration.value,
          0
        );
        const directionTrip = document.createElement("div");
        directionTrip.className = "directionTrip";
        if (index === 0) {
          directionTrip.classList.add("directionTrip__selected");
        }

        directionTrip.innerHTML = `
              <div style="display: flex;">
                <div class="directionTrip__description" style="padding: 8px 4px 16px 4px;">
                    <div class="directionTrip__numbers">
                        <div class="directionTrip__duration">Temps : ${formatTime(
                          durationTotal
                        )}</div>
                        <div class="directionTrip__distance">${formatDistance(
                          distanceTotal
                        )}</div>
                    </div>
                    <div class="directionTrip__detailsMsg"></div>
                </div>
              </div>
            `;

        directionTrip.addEventListener("click", () => {
          selectCorrectRoute(index);
          directionsRenderer.setRouteIndex(index);
        });

        return directionTrip;
      }
    );

    function selectCorrectRoute(index: number) {
      document
        .querySelectorAll(".directionTrip__selected")
        .forEach((selectedElement) => {
          selectedElement.classList.remove("directionTrip__selected");
        });
      directionTripElements[index].classList.add("directionTrip__selected");
    }

    const tableContainer = document.querySelector(
      ".tableContainer"
    ) as HTMLElement;
    /*     tableContainer.innerHTML =
      '<ion-icon size="large" name="car-outline"></ion-icon>'; */
    directionTripElements.forEach((element) =>
      tableContainer.appendChild(element)
    );
    tableContainer.style.display = "flex";
    tableContainer.style.justifyContent = "space-between";
    tableContainer.style.width = "92%";
    tableContainer.style.margin = "8px 16px";
  }

  function displayDirectionsRoute(response: woosmap.map.DirectionResult) {
    directionsRenderer.setDirections(response);
  }

  function calculateDirections(): void {
    new Promise((resolve, reject): void => {
      const timeoutId = setTimeout(() => {
        reject(new Error("Callback not called within 3 secs"));
      }, 3000);

      directionsService.route(directionsRequest, (response, status) => {
        clearTimeout(timeoutId);
        if (status === "OK" && response && response.routes) {
          resolve(response);
        } else {
          reject(new Error(`Error calculating distances: ${status}`));
        }
      });
    }).then((response: unknown) => {
      const directionResult = response as woosmap.map.DirectionResult;
      displayDirectionsMarkers();
      displayDirectionsRoute(directionResult);
      createRoutesTable(directionResult);
    });
  }

  return {
    createMarker,
    calculateDirections,
  };
}
