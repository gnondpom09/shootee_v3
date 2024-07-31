import { onMounted } from "vue";
import { formatDistance } from "@/utils/map.utils";
import { formatTime } from "@/utils/date.utils";

let map: woosmap.map.Map;
let bounds: woosmap.map.LatLngBounds;
let directionsService: woosmap.map.DirectionsService;
let directionsRequest: woosmap.map.DirectionRequest;
let markersArray: woosmap.map.Marker[] = [];

let directionsRenderer: woosmap.map.DirectionsRenderer;

export function useDistance(mapId: string) {
  onMounted(() => {
    initDistance();
  });

  function initDistance(): void {
    map = new woosmap.map.Map(document.getElementById(mapId) as HTMLElement, {
      center: { lat: 51.5074, lng: -0.1478 },
      zoom: 10,
    });
    directionsService = new woosmap.map.DirectionsService();
    directionsRenderer = new woosmap.map.DirectionsRenderer({});

    directionsRenderer.setMap(map);

    bounds = new woosmap.map.LatLngBounds();

    directionsRequest = createDefaultRequest();
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
    const originMarker = createMarker(
      directionsRequest.origin,
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

    bounds.extend(directionsRequest.origin as woosmap.map.LatLngLiteral);
    bounds.extend(directionsRequest.destination as woosmap.map.LatLngLiteral);

    map.fitBounds(bounds, { top: 70, bottom: 40, left: 50, right: 50 }, true);
  }

  function createDefaultRequest(): woosmap.map.DirectionRequest {
    const origin = { lat: 51.6511, lng: -0.1615 };
    const destination = { lat: 51.5146, lng: -0.0212 };

    return {
      origin,
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
        const leg = route.legs[0];
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
                <div class="directionTrip__description">
                    <div class="directionTrip__numbers">
                        <div class="directionTrip__duration">${formatTime(
                          durationTotal
                        )}</div>
                        <div class="directionTrip__distance">${formatDistance(
                          distanceTotal
                        )}</div>
                    </div>
                    <div class="directionTrip__title">through ${
                      leg.start_address
                        ? leg.start_address
                        : JSON.stringify(leg.start_location)
                    }</div>
                    <div class="directionTrip__summary">${formatTime(
                      durationTotal
                    )} ${
          directionsRequest.departure_time || directionsRequest.arrival_time
            ? "with"
            : "without"
        } traffic</div>
                    <div class="directionTrip__detailsMsg"></div>
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
    tableContainer.innerHTML = "";
    directionTripElements.forEach((element) =>
      tableContainer.appendChild(element)
    );
    tableContainer.style.display = "flex";
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
