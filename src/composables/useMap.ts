import { onMounted } from "vue";
import { MAP_STYLES } from "../constants/map";
import { Spot } from "@/models/spot.model";

interface UseMap {
  initMap: () => void;
  resetMap: () => void;
  setMarker: (latitude: number, longitude: number) => void;
  setMarkersOnMap: (spots: Spot[]) => void;
  removeMarker: (latitude: number, longitude: number) => void;
}

export function useMap(elementId: string): UseMap {
  let map: woosmap.map.Map;

  onMounted(() => {
    initMap();
  });

  function initMap(): void {
    map = new woosmap.map.Map(
      document.getElementById(elementId) as HTMLElement,
      {
        zoom: 4,
        disableDefaultUI: true,
        styles: MAP_STYLES,
      }
    );
  }

  function setMarker(latitude: number, longitude: number): void {
    const marker = new woosmap.map.Marker({
      position: { lat: latitude, lng: longitude },
      icon: {
        url: "https://images.woosmap.com/marker.png",
        scaledSize: {
          height: 50,
          width: 32,
        },
      },
    });
    marker.setMap(map);

    map.flyTo({
      center: { lat: latitude, lng: longitude },
      zoom: 14,
    });
  }

  function removeMarker(latitude: number, longitude: number): void {
    const marker = new woosmap.map.Marker({
      position: { lat: latitude, lng: longitude },
    });
    marker.setMap(null);
  }

  function setMarkersOnMap(spots: Spot[]): void {
    if (spots) {
      spots.forEach((spot, index) => {
        const center = {
          lat: spot.location.latitude,
          lng: spot.location.longitude,
        };

        const marker = new woosmap.map.Marker({
          position: center,
          icon: {
            url: "https://images.woosmap.com/marker.png",
            scaledSize: {
              height: 50,
              width: 32,
            },
          },
        });

        const infoWindow = new woosmap.map.InfoWindow({});
        const id = `${index}-${spot.createdAt}`;

        const photosCount = spot.photos ? spot.photos.length : 0;

        const infoHTML =
          `<div id="${id}" class="info-content">` +
          `<ion-thumbnail slot="start"><img src="${spot.thumbnail}" /></ion-thumbnail>` +
          "<ion-label>" +
          `<h4>${spot.address}</h4>` +
          `<p>${photosCount} photos. <a href='/spot-detail/${spot.id}'>Voir les détails</a>` +
          "</ion-label>" +
          "</div>";

        infoWindow.setOffset(new woosmap.map.Point(50, -500));
        // infoWindow.setContent(`<span id="${id}">${spot.address}</span>`);
        infoWindow.setContent(infoHTML);

        marker.addListener("click", function () {
          infoWindow.open(map, marker);

          map.flyTo({
            center: marker.getPosition(),
            zoom: 14,
          });

          const element = document.getElementById(id);

          if (element) {
            element.style.color = "blue";
            element.style.background = "white";
            element.style.display = "flex";
            element.style.gap = "8px";
          }
        });
        marker.setMap(map);
      });
    }
  }

  function resetMap(): void {
    map = {} as woosmap.map.Map;
  }

  function clearMarkers(): void {
    let markersArray: woosmap.map.Marker[] = [];

    for (const marker of markersArray) {
      marker.setMap(null);
    }
    markersArray = [];
  }

  return {
    initMap,
    resetMap,
    setMarker,
    setMarkersOnMap,
    removeMarker,
  };
}
