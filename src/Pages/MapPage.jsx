import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './MapPage.css';

const mapContainerStyle = {
  width: '100%',
  height: '100vh', // Full height of the viewport
};

const MapPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date, persons } = location.state || {};
  const [response, setResponse] = useState(null);
  const [distance, setDistance] = useState('');

  const directionsCallback = (result, status) => {
    if (status === 'OK') {
      setResponse(result);
      setDistance(result.routes[0].legs[0].distance.text);
    } else {
      console.error('Error fetching directions:', status);
    }
  };

  const handleOkClick = () => {
    navigate('/ride-sharing', { state: { from, to, date, persons } });
  };

  return (
    <div className="map-page-container">
      <LoadScript googleMapsApiKey="AIzaSyDHUSYXQRHX7QsU0qJBC6ljF3PGtx6IJkY" libraries={['places']}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: 17.385044, lng: 78.486671 }} // Example center (Hyderabad)
          zoom={10}
        >
          <DirectionsService
            options={{
              origin: from,
              destination: to,
              travelMode: 'DRIVING',
            }}
            callback={directionsCallback}
          />
          {response && <DirectionsRenderer options={{ directions: response }} />}
        </GoogleMap>
      </LoadScript>
      {distance && (
        <p className="distance-info">
          Distance between <strong>{from}</strong> and <strong>{to}</strong>: <strong>{distance}</strong>
        </p>
      )}
      <button className="ok-button" onClick={handleOkClick}>
        OK
      </button>
    </div>
  );
};

export default MapPage;