import { ref, Ref } from "vue";
import { API_KEY_WOOSMAP, GEOCODE_API } from "../constants/map";

interface UseGeocode {
  spotName: Ref<string>;
  address: Ref<string>;
  latitude: Ref<number | null>;
  longitude: Ref<number | null>;
  setCoordonates: (latitude: number, longitude: number) => void;
  resetCoordonates: () => void;
  reverseGeocodeMarker: (latitude: number, longitude: number) => void;
  reverseGeocode: (lat_lng: string) => any;
}

const spotName = ref<string>("");
const address = ref<string>("");
const latitude = ref<number | null>(null);
const longitude = ref<number | null>(null);

export function useGeocode(): UseGeocode {
  function reverseGeocode(lat_lng: string) {
    /*     const args = {
      key: API_KEY_WOOSMAP,
      latlng: lat_lng,
    }; */

    const parts = lat_lng.split(",");
    const latitude = Number(parts[0]);
    const longitude = Number(parts[1]);

    return fetch(
      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${GEOCODE_API}`
    ).then((response) => {
      return response.json();
    });

    /*     return fetch(
      `https://api.woosmap.com/localities/geocode/?${buildQueryString(args)}`
    ).then((response) => response.json()); */
  }

  /*   function buildQueryString(params: any) {
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
  } */

  function reverseGeocodeMarker(lat: number, lng: number): void {
    let reverseGeocodeLatLng = lat + "," + lng;

    reverseGeocode(reverseGeocodeLatLng).then((addressDetails) => {
      // let result = addressDetails.results[0];
      // address.value = result.formatted_address;

      address.value = `${addressDetails.address.road ?? ""} ${
        addressDetails.address.postcode
      } ${addressDetails.address.village ?? addressDetails.address.city} - ${
        addressDetails.address.country
      }`;

      if (
        addressDetails.results == null ||
        addressDetails.results.length === 0
      ) {
        return;
      }
    });
  }

  function setCoordonates(lat: number, lng: number): void {
    latitude.value = lat;
    longitude.value = lng;
  }

  function resetCoordonates(): void {
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
    reverseGeocode,
  };
}
