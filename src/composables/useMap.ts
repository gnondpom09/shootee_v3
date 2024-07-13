import { ref, Ref, onMounted } from "vue";
import { API_KEY_WOOSMAP, MAP_STYLES } from "../constants/map";

interface UseMap {
  initMap: () => void;
}

export function useMap(): UseMap {
  let map: woosmap.map.Map;

  onMounted(() => {
    const script = document.createElement("script");
    script.src = `https://sdk.woosmap.com/map/map.js?key=${API_KEY_WOOSMAP}&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      initMap();
    });
  });

  function initMap(): void {
    map = new woosmap.map.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 42.895328519999985, lng: 1.7943832799999995 },
      zoom: 10,
      disableDefaultUI: true,
      styles: MAP_STYLES,
    });

    const currentMarker = new woosmap.map.Marker({
      position: map.getCenter(),
      icon: {
        url: "https://images.woosmap.com/marker.png",
        scaledSize: {
          height: 50,
          width: 32,
        },
      },
    });
    currentMarker.setMap(map);
  }

  return {
    initMap,
  };
}
