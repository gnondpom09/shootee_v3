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
        console.log(spot.location);

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
        infoWindow.setContent(
          `<span id="${index}-${spot.createdAt}">${spot.address}</span>`
        );
        // infoWindow.open(map, marker);

        marker.addListener("click", function () {
          console.log(marker);
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
