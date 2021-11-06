import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

// To create routes between points in map
const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: props.waypoints,
    lineOptions: {
      styles: [{ color: "#000", weight: 4 }],
    },
    show: false,
    addWaypoints: true,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
    createMarker: () => null,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
