import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";

interface GoogleMapComponentProps {
  city: string;
  street: string;
  houseNumber: string;
  apiKey: string;
}

const GoogleMapComponent: FunctionComponent<GoogleMapComponentProps> = ({
  city,
  street,
  houseNumber,
  apiKey,
}) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
    
    
  };
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const address = `${houseNumber} ${street}, ${city}`;

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
    axios
      .get(geocodeUrl)
      .then((response) => {
        const location = response.data.results[0]?.geometry?.location;if (location) {
          setCoordinates({ lat: location.lat, lng: location.lng });
        } else {
          console.error("Error: Invalid geocoding response:", response.data);
      }})
      .catch((error) => {
        console.error("Error fetching geocoding data:", error);
      });
  }, [city, street, houseNumber, apiKey]);

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinates}
          zoom={15}
        >
          <Marker position={coordinates} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default GoogleMapComponent;
