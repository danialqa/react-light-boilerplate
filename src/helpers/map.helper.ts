import { includes } from "lodash";

export default (place, completeAddress) => {
  if (
    completeAddress &&
    (!place ||
      (!includes(place.types, "subpremise") &&
        !includes(place.types, "premise") &&
        !includes(place.types, "route") &&
        !includes(place.types, "street_address")))
  ) {
    return null;
  }

  const meta = {
    street: place.name,
    postcode: undefined,
    suburb: undefined,
    state: undefined,
    country: undefined,
    latitude: undefined,
    longitude: undefined,
  };

  if (place.address_components) {
    place.address_components.forEach((address) => {
      if (address.types.length === 1) {
        if (includes(address.types, "postal_code")) {
          meta.postcode = address.long_name;
        }
      } else if (address.types.length === 2) {
        if (
          includes(address.types, "locality") &&
          includes(address.types, "political")
        ) {
          meta.suburb = address.long_name;
        } else if (
          includes(address.types, "political") &&
          includes(address.types, "administrative_area_level_1")
        ) {
          meta.state = address.short_name;
        } else if (includes(address.types, "country")) {
          meta.country = address.long_name;
        }
      }
    });
  }

  if (place.geometry) {
    meta.latitude = place.geometry.location.lat();
    meta.longitude = place.geometry.location.lng();
  }

  return { ...place, meta };
};
