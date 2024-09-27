import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { GeolocationService, Location } from '../application/services/GeolocationService';


L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapComponentProps {
  initialLocation: Location;
  onLocationSelect: (location: Location) => void;
}   

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
  const [position, setPosition] = useState<Location | null>(null);
  const [initialLocation, setInitialLocation] = useState<Location | null>(null);

  useEffect(() => {
    
    const fetchCurrentLocation = async () => {
      const geolocationService = new GeolocationService();
      const currentLocation = await geolocationService.getCurrentLocation();
      if (currentLocation) {
        setInitialLocation(currentLocation);
      } else {
        
        setInitialLocation({ latitude: 4.6676355, longitude: -74.087 });
      }
    };

    fetchCurrentLocation();
  }, []);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newPosition = {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        };
        setPosition(newPosition);
        onLocationSelect(newPosition);
      },
    });
    return position ? <Marker position={[position.latitude, position.longitude]}></Marker> : null;
  };
  if (!initialLocation) {
    return <p>Cargando mapa...</p>;
  }
  const customIcon = new L.Icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  return (
    <MapContainer center={[initialLocation.latitude, initialLocation.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {initialLocation && (
        <Marker 
          position={[initialLocation.latitude, initialLocation.longitude]} 
          icon={customIcon}
        />
      )}
    </MapContainer>
    );
};

export default MapComponent;
