import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importar los estilos de Leaflet
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';

interface Location {
  latitude: number;
  longitude: number;
}

const MapPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const history = useHistory();

  // Maneja el clic en el mapa
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

  // Maneja la selección de ubicación y vuelve al formulario
  const handleConfirmLocation = () => {
    if (selectedLocation) {
      history.push('/register-patient', { location: selectedLocation });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Seleccionar Ubicación en el Mapa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
        </MapContainer>
        {selectedLocation && (
          <IonButton expand="block" onClick={handleConfirmLocation}>
            Confirmar Ubicación
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MapPage;
