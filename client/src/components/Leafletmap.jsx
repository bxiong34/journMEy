import '../App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';



// LEAFLET
const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "This place is awesome!"
    },
    {
      geocode: [48.85, 2.3522],
      popUp: "This place is wild!"
    },
    {
      geocode: [48.855, 2.34],
      popUp: "This place is amazing!"
    },
    {
      geocode: [48.8734, 2.3680],
      popUp: "Ate so much Crossant had to go to the hospital!"
    },
    {
      geocode: [43.0722, -89.4008],
      popUp: "This place is meh!"
    },
    {
      geocode: [43.0752, -89.3842],
      popUp: "CapiTOOOL!"
    },
  ];
  const customIcon = new Icon ({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/9131/9131546.png",
    // size of icon
    iconSize: [38,38]   
  });
  
  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      iconSize: point(33, 33, true)
    })};


    function Leafletmap() {
        return (
          <MapContainer center={[48.8566, 2.3522]} zoom={13}>
            <TileLayer
              // attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              url='https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}'
              accessToken='9OHyglPUFdqXritzAZGFb1IXCvZgQBGFArRhOQ819CcqZZfWONdETSlMIIMaDoLU'
            />
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon}
          
          >
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
              </Marker>
            ))}
      
          </MarkerClusterGroup> 
      
          </MapContainer>
         
        )
      }
      
      export default Leafletmap;