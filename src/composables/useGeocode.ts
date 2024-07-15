import { ref, Ref } from "vue";
import { API_KEY_WOOSMAP } from "../constants/map";
import { useMarkers } from "@/composables/useMarkers";

interface UseGeocode {
  spotName: Ref<string>;
  address: Ref<string>;
  latitude: Ref<number | null>;
  longitude: Ref<number | null>;
  setCoordonates: (latitude: number, longitude: number) => void;
  resetCoordonates: () => void;
  reverseGeocodeMarker: (latitude: number, longitude: number) => void;
}

const spotName = ref<string>("");
const address = ref<string>("");
const latitude = ref<number | null>(null);
const longitude = ref<number | null>(null);

const { removeMarker } = useMarkers();

export function useGeocode(): UseGeocode {
  function reverseGeocode(lat_lng: string, apiKey: string) {
    const args = {
      key: apiKey,
      latlng: lat_lng,
    };

    return fetch(
      `https://api.woosmap.com/localities/geocode/?${buildQueryString(args)}`
    ).then((response) => response.json());
  }

  function buildQueryString(params: any) {
    const queryStringParts = [];

    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        let value = params[key];
        queryStringParts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
    }
    return queryStringParts.join("&");
  }

  function reverseGeocodeMarker(lat: number, lng: number): void {
    let reverseGeocodeLatLng = lat + "," + lng;

    reverseGeocode(reverseGeocodeLatLng, API_KEY_WOOSMAP).then(
      (addressDetails) => {
        let result = addressDetails.results[0];

        address.value = result.formatted_address;

        if (
          addressDetails.results == null ||
          addressDetails.results.length === 0
        ) {
          return;
        }
      }
    );
  }

  function setCoordonates(lat: number, lng: number): void {
    latitude.value = lat;
    longitude.value = lng;
  }

  function resetCoordonates(): void {
    if (latitude.value && longitude.value) {
      removeMarker(latitude.value, longitude.value);
    }

    latitude.value = null;
    longitude.value = null;
    address.value = "";
    spotName.value = "";
  }

  return {
    spotName,
    address,
    latitude,
    longitude,
    setCoordonates,
    resetCoordonates,
    reverseGeocodeMarker,
  };
}
