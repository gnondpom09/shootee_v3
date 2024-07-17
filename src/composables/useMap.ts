import { onMounted } from "vue";
import { MAP_STYLES } from "../constants/map";

interface UseMap {
  initMap: () => void;
  resetMap: () => void;
  setMarker: (latitude: number, longitude: number) => void;
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

  function resetMap(): void {
    map = {} as woosmap.map.Map;
  }

  return {
    initMap,
    resetMap,
    setMarker,
  };
}
