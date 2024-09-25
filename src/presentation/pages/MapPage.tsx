import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Location {
  latitude: number;
  longitude: number;
}

const MapPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [initialLocation, setInitialLocation] = useState<Location>({ latitude: 51.505, longitude: -0.09 });

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Seleccionar Ubicación en el Mapa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MapContainer center={[initialLocation.latitude, initialLocation.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
        </MapContainer>
        <IonButton expand="block">
          Confirmar Ubicación
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MapPage;
