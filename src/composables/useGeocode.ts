import { ref, Ref } from "vue";
import { API_KEY_WOOSMAP } from "../constants/map";

interface UseGeocode {
  address: Ref<string>;
  reverseGeocodeMarker: (latitude: number, longitude: number) => void;
}

export function useGeocode(): UseGeocode {
  const address = ref<string>("");

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

        console.log(address.value);

        if (
          addressDetails.results == null ||
          addressDetails.results.length === 0
        ) {
          return;
        }

        let lat = result.geometry.location.lat;
        let lng = result.geometry.location.lng;
        let markerPosition = {
          lat,
          lng,
        };
      }
    );
  }

  return {
    address,
    reverseGeocodeMarker,
  };
}
