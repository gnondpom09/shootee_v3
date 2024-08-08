import { onMounted } from "vue";
import { MAP_STYLES } from "../constants/map";
import { Spot } from "@/models/spot.model";
import { DocumentData } from "firebase/firestore";

interface UseMap {
  initMap: () => void;
  resetMap: () => void;
  setMarker: (latitude: number, longitude: number) => void;
  setMarkersOnMap: (spots: DocumentData[]) => void;
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

  function setMarkersOnMap(spots: DocumentData[]): void {
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
          `<h4 id="title">${spot.address}</h4>` +
          `<p id="legend">${photosCount} photos. <span id="link-more"> <a href='/spot-detail/${spot.id}'>Voir les détails</a></span></p>` +
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

          setStyleInfo(id);
        });
        marker.setMap(map);
      });
    }
  }

  function setStyleInfo(id: string) {
    const title = document.getElementById("title");
    const card = document.getElementById(id);
    const link = document.getElementById("link-more");
    const legend = document.getElementById("legend");

    const parent = card?.parentNode as HTMLElement;
    parent.setAttribute("id", "card-container");
    const arrow = document.querySelector(
      "#card-container + span"
    ) as HTMLElement;

    if (arrow) {
      arrow.style.borderTop = "11px solid var(--ion-background-color-step-50)";
    }

    if (parent) {
      parent.style.background = "var(--ion-background-color-step-50)";
      parent.style.borderRadius = "4px";
    }

    if (title) {
      title.style.color = "white";
      title.style.fontWeight = "700";
    }

    if (card) {
      card.style.color = "white";
      card.style.background = "var(--ion-background-color-step-50)";
      card.style.display = "flex";
      card.style.gap = "8px";
    }

    if (legend) {
      legend.style.display = "flex";
      legend.style.justifyContent = "space-between";
      legend.style.color = "rgba(255, 255, 255, 0.6)";
    }

    if (link) {
      link.style.color = "var(--ion-color-primary)";
      link.style.textAlign = "right";
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
