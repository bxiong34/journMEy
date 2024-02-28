import React, { useState, useEffect, useRef } from "react";
import L from "leaflet"; // Import Leaflet library
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import markers from "../components/markers";
import useGeoLocation from "../components/useGeoLocation";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import LeafletControlGeocoder from "../components/LeafletControlGeocoder";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/9131/9131546.png",
  iconSize: [38, 38],
});

const createCustomClusterIcon = (cluster) => {
  return new divIcon({
    html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    iconSize: point(33, 33, true),
  });
};

function Leafletmap() {
  const location = useGeoLocation();
  const [favorites, setFavorites] = useState([]);
  const mapRef = useRef(null);
  const zoom = 13;

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

const addToFavorite = (marker) => {
  const favoritesData = localStorage.getItem("favorites");
  const favorites = favoritesData ? JSON.parse(favoritesData) : [];
  const id = Date.now(); // Generate a unique ID based on current timestamp
  const updatedFavorites = [...favorites, { id: id, ...marker }];
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  setFavorites(updatedFavorites);
  console.log("Marker added to favorites:", marker);
};

  const showMyLocation = () => {
    if (mapRef.current && location.loaded && !location.error) {
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        zoom,
        { animate: true },
      );
    } else if (location.error) {
      alert(location.error.message);
    }
  };

  // const locateOnMap = (coordinates) => {
  //   if (coordinates) {
  //     mapRef.current.flyTo(coordinates, zoom, { animate: true });
  //     console.log("Locating coordinates on the map:", coordinates);
  //   } else {
  //     console.log("Coordinates are undefined");
  //   }
  // };


  return (
    <div className="h-screen bg-[#1a1a1a] text-white flex items-center flex-col">
      <MapContainer
        center={[43.0747, -89.3841]}
        ref={mapRef}
        zoom={13}
        minZoom={2}
        maxZoom={18}
        worldCopyJump={true}
      >
        <TileLayer
          attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          accessToken="9OHyglPUFdqXritzAZGFb1IXCvZgQBGFArRhOQ819CcqZZfWONdETSlMIIMaDoLU"
        />
        <LeafletControlGeocoder />

        {location.loaded && !location.error && (
          <Marker
            key="currentLocation"
            icon={customIcon}
            position={[location.coordinates.lat, location.coordinates.lng]}
          ></Marker>
        )}

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map((marker, index) => (
            <Marker key={`${marker.id}-${index}`} position={marker.geocode} icon={customIcon}>
              <Popup style={{ paddingLeft: "20px" }}>
                <strong>{marker.cityName}</strong>
                <div style={{ marginLeft: "20px" }}>
                  {marker.review1}
                  <br />
                  <br />
                  {marker.review2}
                  <br />
                  <button
                    onClick={() => addToFavorite(marker)}
                    style={{
                      backgroundColor: "#008CBA",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      border: "none",
                      display: "block",
                      margin: "10px auto 0",
                    }}
                  >
                    Add to Account
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        style={{ zIndex: 1000 }}
      >
        <button
          className="bg-[#008CBA] text-black px-4 py-2 rounded "
          onClick={showMyLocation}
        >
          Locate Me
        </button>
      </div>
    </div>
  );
}

export default Leafletmap;
