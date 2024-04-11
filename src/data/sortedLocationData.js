import { useEffect, useState } from "react";
import data from "./locationData.json";
import * as Location from "expo-location";

const sortedLocationData = (setLoading) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [sortedLocation, setSortedLocation] = useState([...data]);

  useEffect(() => {
    // Request permission to access device location
    setLoading(true);
    const handleLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      } catch (error) {
        console.error("Error updating location:", error);
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(() => {
      handleLocation();
    }, 5000);

    if (currentLocation) {
      // Calculate distance for each location
      const updatedLocations = sortedLocation.map((location) => {
        const distance = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          location.latitude ? location.latitude : null,
          location.longitude
        );

        return { ...location, distance };
      });

      // Update state with the calculated distances
      setSortedLocation((prev) =>
        updatedLocations.sort((a, b) => a.distance - b.distance)
      );
    }

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentLocation) {
      // Calculate distance for each location
      const updatedLocations = sortedLocation.map((location) => {
        const distance = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          location.latitude ? location.latitude : null,
          location.longitude
        );

        return { ...location, distance };
      });

      // Update state with the calculated distances
      setSortedLocation((prev) =>
        updatedLocations.sort((a, b) => a.distance - b.distance)
      );
      // console.log("done");
    }
    // console.log("done");
  }, [currentLocation]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!currentLocation) {
      // console.log("Current location not available");
      return;
    }

    if (lat2 === null || lon2 === null) {
      return;
    }

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = R * c; // Distance in kilometers

    // Set the distance state
    return distanceInKm.toFixed(2); // Round to 2 decimal places
  };

  return sortedLocation;
};

export default sortedLocationData;
