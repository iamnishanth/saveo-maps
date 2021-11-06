import { useContext, createContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// const developmentServer = "http://localhost:5000";
const productionServer = "https://saveo-maps.herokuapp.com";

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [waypoints, setWaypoints] = useState([["13.0833", "80.2833"]]); // default chennai location
  const [locationDetails, setLocationDetails] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [locationLat, setLocationLat] = useState("");
  const [locationLon, setLocationLon] = useState("");
  const [loading, setLoading] = useState(false);
  const rMachine = useRef();

  useEffect(() => {
    // Get user location
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log(coords);
        setWaypoints([[coords.latitude, coords.longitude]]);
        setLocationDetails([
          ...locationDetails,
          {
            name: "My Co-ordinates",
            lat: coords.latitude,
            lon: coords.longitude,
          },
        ]);
      },
      (err) => {
        if (err.code === 1) {
          alert(
            "User denied location permission. Setting default location to Chennai."
          );

          setLocationDetails([
            ...locationDetails,
            {
              name: "My Co-ordinates",
              lat: "13.0833", // default Chennai coords
              lon: "80.2833",
            },
          ]);
        } else {
          alert(
            "Error getting location permission. Setting default location to Chennai."
          );
          setLocationDetails([
            ...locationDetails,
            {
              name: "My Co-ordinates",
              lat: "13.0833", // default Chennai coords
              lon: "80.2833",
            },
          ]);
        }
      }
    );

    // check user id exist in localstorage
    const userId = window.localStorage.getItem("userId");
    if (!userId) {
      const uuid = uuidv4().split("-").join("");
      window.localStorage.setItem("userId", uuid);
    }
  }, []);

  // show route directions
  const handleShowRoute = async () => {
    if (rMachine.current) {
      // backend api rate limit check logic
      const userId = window.localStorage.getItem("userId");
      const timestamp = new Date();
      setLoading(true);
      try {
        const { data } = await axios.post(`${productionServer}/show-route`, {
          userId,
          timestamp,
        });
        console.log(data);
        setLoading(false);
        rMachine.current.setWaypoints(waypoints);
      } catch (e) {
        alert("Too many requests. Maximum of 10 request per minute.");
        setLoading(false);
      }
    }
  };

  // Check whether the given latitude and longitude is valid or not
  const checkValidLatLon = (lat, lon) => {
    if (
      isFinite(lat) &&
      Math.abs(lat) <= 90 &&
      isFinite(lon) &&
      Math.abs(lon) <= 180
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Add location to waypoints
  const handleLocationAdd = () => {
    if (
      locationName.trim().length > 0 &&
      locationLat.trim().length > 0 &&
      locationLon.trim().length > 0
    ) {
      if (checkValidLatLon(locationLat, locationLon)) {
        setLocationDetails([
          ...locationDetails,
          { name: locationName, lat: locationLat, lon: locationLon },
        ]);
        setWaypoints([...waypoints, [locationLat, locationLon]]);
        setLocationName("");
        setLocationLat("");
        setLocationLon("");
      } else {
        alert("Invalid Latitude or Longitude");
      }
    } else {
      alert("Fields cannot be empty");
    }
  };

  const value = {
    waypoints,
    setWaypoints,
    locationDetails,
    locationName,
    setLocationName,
    locationLat,
    setLocationLat,
    locationLon,
    setLocationLon,
    handleLocationAdd,
    handleShowRoute,
    rMachine,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
