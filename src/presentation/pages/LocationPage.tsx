import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBackButton, IonButtons } from '@ionic/react';
import MapComponent from '../../components/MapComponent';
import { useHistory } from 'react-router-dom';
import { LocalStorageService } from '../../application/services/LocalStorageService';
import { ReverseGeocodeService } from '../../application/services/ReverseGeocodeService';

const LocationPage: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    const loadLocation = async () => {
      const savedData = await LocalStorageService.getData('patientForm');
      if (savedData?.location) {
        setLocation(savedData.location);
      }
    };
    loadLocation();
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      if (location) {
        const reverseGeocodeService = new ReverseGeocodeService();
        const foundAddress = await reverseGeocodeService.getAddressFromCoordinates(location.latitude, location.longitude);
        setAddress(foundAddress);
      }
    };
    fetchAddress();
  }, [location]);

  const handleSaveLocation = async () => {
    const formData = await LocalStorageService.getData('patientForm');
    await LocalStorageService.saveData('patientForm', { ...formData, location });
    history.push('/patient-data');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/photo-registration" />
          </IonButtons>
          <IonTitle>Seleccionar Ubicación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MapComponent initialLocation={{ latitude: 4.62433, longitude: -74.063644 }} onLocationSelect={setLocation} />
        {address && <p>Dirección: {address}</p>}
        <IonButton expand="block" onClick={handleSaveLocation}>
          Guardar Ubicación
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LocationPage;
