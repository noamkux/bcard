import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript
} from "@react-google-maps/api";

interface GoogleMapProps {
  city: string;
  street: string;
  houseNumber: string;
  country: string;
  apiKey: string;
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({
  city,
  street,
  houseNumber,
  country,
  apiKey
}) => {
  const [coordinates, setCoordinates] = useState<any>(null);

  useEffect(() => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address: `${city} ${street} ${houseNumber} ${country}` },
      (results, status) => {
        if (status === "OK") {
          setCoordinates(results![0].geometry.location);
        } else {
          console.error("Geocode was not successful:", status);
        }
      }
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      {coordinates ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "300px" }}
          center={coordinates}
          zoom={15}
        >
          <Marker position={coordinates} />
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </LoadScript>
  );
};

export default GoogleMapComponent;
