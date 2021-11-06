import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import RoutingMachine from "./RoutingMachine";
import { useApp } from "../../context/AppContext";

import "leaflet/dist/leaflet.css";

const Map = (props) => {
  const { waypoints, rMachine } = useApp();

  // custom green marker
  const greenMarker = new L.Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      doubleClickZoom={false}
      id="mapId"
      zoom={5}
      center={waypoints[0]} //center to user/default location
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RoutingMachine ref={rMachine} waypoints={waypoints} />
      {waypoints.map((item, index) => (
        <Marker position={item} icon={greenMarker} key={index} /> // add markers from waypoints array
      ))}
    </MapContainer>
  );
};

export default Map;
