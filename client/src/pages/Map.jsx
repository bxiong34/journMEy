import "../App.css";
import L from "leaflet"; // Import Leaflet library
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import markers from "../components/markers";
import useGeoLocation from "../components/useGeoLocation";
import { useRef } from "react";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import LeafletControlGeocoder from "../components/LeafletControlGeocoder";
import "leaflet-control-geocoder";


const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/9131/9131546.png",
  // size of icon
  iconSize: [38, 38],
});

const createCustomClusterIcon = (cluster) => {
  return new divIcon({
    html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    iconSize: point(33, 33, true),
  });
};

const addToFavorite = (marker) => {
  console.log("Marker added to account:", marker);
};

function Leafletmap() {
  const location = useGeoLocation();

  const mapRef = useRef(null);

  const zoom = 13;

  const showMyLocation = () => {
    if (mapRef.current && location.loaded && !location.error) {
      // Check if mapRef.current exists
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        zoom,
        { animate: true },
      ); // Use mapRef.current directly
    } else if (location.error) {
      alert(location.error.message);
    }
  };

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
          // attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          accessToken="9OHyglPUFdqXritzAZGFb1IXCvZgQBGFArRhOQ819CcqZZfWONdETSlMIIMaDoLU"
        />
         <LeafletControlGeocoder />

        {location.loaded && !location.error && (
          <Marker
            icon={customIcon}
            position={[location.coordinates.lat, location.coordinates.lng]}
          ></Marker>
        )}

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map((marker, index) => (
    <Marker key={index} position={marker.geocode} icon={customIcon}>
      <Popup style={{ paddingLeft: "20px" }}>
        <strong>{marker.cityName}</strong>
        <div style={{ marginLeft: "20px" }}>
          {marker.review1}
          <br />
          <br />
          {marker.review2}
          <br />
          <button onClick={() => addToFavorite(marker)} style={{backgroundColor: "#008CBA", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", display: "block", margin: "10px auto 0",}}>Add to Account</button> {/* Add button */}
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
