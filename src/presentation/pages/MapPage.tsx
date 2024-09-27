import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Location {
  latitude: number;
  longitude: number;
}

interface MapPageProps {
  onLocationSelect: (location: Location) => void;
}

const MapPage: React.FC<MapPageProps> = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const initialLocation: Location = { latitude: 51.505, longitude: -0.09 };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const location = {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        };
        setSelectedLocation(location);
      },
    });
    return selectedLocation ? <Marker position={[selectedLocation.latitude, selectedLocation.longitude]}></Marker> : null;
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    }
  };

  return (
    <div>
      <MapContainer center={[initialLocation.latitude, initialLocation.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
      </MapContainer>
      <button onClick={handleConfirmLocation}>Confirmar Ubicación</button>
    </div>
  );
};

export default MapPage;
