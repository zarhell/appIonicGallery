import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';

interface Location {
  latitude: number;
  longitude: number;
}

const MapPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [initialLocation, setInitialLocation] = useState<Location | null>(null);
  const history = useHistory();
  const locationState = useLocation<{ gpsLocation: Location } | undefined>();

  useEffect(() => {
    if (locationState?.state?.gpsLocation) {
      setInitialLocation(locationState.state.gpsLocation);
    } else {
      setInitialLocation({
        latitude: 51.505,
        longitude: -0.09,
      });
    }
  }, [locationState]);

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
      history.push('/register-patient', { location: selectedLocation });
    } else if (initialLocation) {
      history.push('/register-patient', { location: initialLocation });
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
        {initialLocation && (
          <MapContainer center={[initialLocation.latitude, initialLocation.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
        </MapContainer>
        )}
        {selectedLocation || initialLocation ? (
          <IonButton expand="block" onClick={handleConfirmLocation}>
            Confirmar Ubicación
          </IonButton>
        ) : (
          <IonButton expand="block" disabled>
            Confirmar Ubicación
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MapPage;
