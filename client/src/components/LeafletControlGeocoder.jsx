import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder";

const LeafletControlGeocoder = () => {
  const map = useMap();

  useEffect(() => {
    let geocoder = L.Control.geocoder({
      collapsed: false,
      placeholder: "Search here...",
      errorMessage: "Nothing found.",
      geocoder: L.Control.Geocoder.nominatim(), // Initialize nominatim geocoder
    });

    // Check for geocoder string from URL
    if (typeof URLSearchParams !== "undefined" && location.search) {
      const params = new URLSearchParams(location.search);
      const geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }

    // Add event listener for markgeocode
    geocoder.on("markgeocode", function (e) {
      const latlng = e.geocode.center;
      map.setView(latlng, 13); // Set the map view to the selected location with a zoom level of 13
      L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
    });

    // Add geocoder control to the map
    geocoder.addTo(map);
  }, [map]);

  return null;
};

export default LeafletControlGeocoder;
