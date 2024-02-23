import '../App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import markers from "../components/markers";


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
          <div className='w-full h-screen bg-[#1a1a1a] text-white flex items-center flex-col'>
          <MapContainer className='w-full' center={[43.0747, -89.3841]} zoom={13} minZoom={2} maxZoom={18} worldCopyJump={true}>
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
          </div>
        )
      }
      
      
      export default Leafletmap;