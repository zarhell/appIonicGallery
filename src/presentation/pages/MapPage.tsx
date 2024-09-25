import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import MapComponent from '../../components/MapComponent';
import { Location } from '../../application/services/GeolocationService';
import { LocalStorageService } from '../../application/services/LocalStorageService';
import { useHistory } from 'react-router-dom';

const MapPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const initialLocation: Location = { latitude: 4.62433, longitude: -74.063644 };
  const history = useHistory();

  const handleLocationSelect = (location: Location) => {

    setSelectedLocation(location);
  };


  const handleConfirmLocation = async () => {
    if (selectedLocation) {
      console.log('Ubicación seleccionada:', selectedLocation);
    
      await LocalStorageService.saveData('selectedLocation', selectedLocation);
      alert('Ubicación guardada con éxito');
      history.push({
        pathname: '/register-patient',
        state: { selectedLocation },
      });
    } else {
      alert('No se ha seleccionado ninguna ubicación');
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
        <MapComponent initialLocation={initialLocation} onLocationSelect={handleLocationSelect} />
        <IonButton expand="block" onClick={handleConfirmLocation} disabled={!selectedLocation}>
          Confirmar Ubicación
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MapPage;
