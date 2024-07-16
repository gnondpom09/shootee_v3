import { getAllMarkers } from "@/services/marker.service";

interface UseMarkers {
  setMarker: (
    latitude: number,
    longitude: number,
    map: woosmap.map.Map
  ) => void;
  removeMarker: (latitude: number, longitude: number) => void;
  setMarkersOnMap: (map: woosmap.map.Map) => void;
}

export function useMarkers(): UseMarkers {
  function setMarker(
    latitude: number,
    longitude: number,
    map: woosmap.map.Map
  ): void {
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

  function setMarkersOnMap(map: woosmap.map.Map): void {
    const spots = getAllMarkers();

    if (spots.value) {
      spots.value.forEach((spot, index) => {
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

        const infoHTML =
          `<div id="${id}" class="info-content">` +
          `<ion-thumbnail slot="start"><img src="${spot.thumbnail}" /></ion-thumbnail>` +
          "<ion-label>" +
          `<h4>${spot.address}</h4>` +
          `<p>${spot.photosCount ?? 0} photos. <a href='/spot-detail/${
            spot.id
          }'>Voir les détails</a>` +
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

  return {
    setMarker,
    removeMarker,
    setMarkersOnMap,
  };
}
