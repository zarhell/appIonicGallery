import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importamos los estilos de Leaflet
import L from 'leaflet';

// Actualización del icono por defecto en Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Location {
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  onLocationSelect: (location: Location) => void;
}   

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
  const [position, setPosition] = useState<Location | null>(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newPosition = {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        };
        setPosition(newPosition);
        onLocationSelect(newPosition); // Pasar la ubicación seleccionada al componente padre
      },
    });
    return position ? <Marker position={[position.latitude, position.longitude]}></Marker> : null;
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
    </MapContainer>
  );
};

export default MapComponent;
