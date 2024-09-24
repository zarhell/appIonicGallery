import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonTitle, IonToolbar, IonHeader, IonItem, IonLabel, IonImg, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { GeolocationService, Location as GeoLocation } from '../../application/services/GeolocationService';
import { takePhoto } from '../../application/services/PhotoService';
import { Photo } from '../../domain/entities/Photo';
import { LocalStorageService } from '../../application/services/LocalStorageService';

const RegisterPatient: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [identification, setIdentification] = useState('');
  const [condition, setCondition] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [manualLocation, setManualLocation] = useState('');
  const history = useHistory();
  const locationState = useLocation<{ location: GeoLocation } | undefined>();

  useEffect(() => {
    loadFormData();
    if (locationState?.state?.location) {
      setLocation(locationState.state.location);
    }
  }, [locationState]);

  const loadFormData = async () => {
    const savedData = await LocalStorageService.getData('patientForm');
    if (savedData) {
      setName(savedData.name || '');
      setAge(savedData.age || '');
      setIdentification(savedData.identification || '');
      setCondition(savedData.condition || '');
      setPhotos(savedData.photos || []);
      setLocation(savedData.location || null);
    }
  };

  const saveFormData = async () => {
    const formData = {
      name,
      age,
      identification,
      condition,
      photos,
      location,
    };
    await LocalStorageService.saveData('patientForm', formData);
  };

  // Obtener ubicación desde GPS y abrir el mapa
  const handleOpenMap = async () => {
    const gpsLocation = await GeolocationService.getCurrentLocation();
    if (gpsLocation) {
      history.push('/map', { gpsLocation });
    } else {
      // Si no se puede obtener la ubicación del GPS, redirigir al mapa para seleccionar manualmente
      history.push('/map');
    }
  };

  const handleTakePhoto = async () => {
    const newPhoto = await takePhoto();
    setPhotos([...photos, newPhoto]);
  };

  const handleSubmit = () => {
    console.log({
      name,
      age,
      identification,
      condition,
      location,
      photos,
    });
    saveFormData();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar Paciente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            value={name}
            placeholder="Nombre"
            onIonChange={(e: CustomEvent) => setName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Edad</IonLabel>
          <IonInput
            value={age}
            type="number"
            placeholder="Edad"
            onIonChange={(e: CustomEvent) => setAge(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Identificación</IonLabel>
          <IonInput
            value={identification}
            placeholder="Identificación"
            onIonChange={(e: CustomEvent) => setIdentification(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Condición</IonLabel>
          <IonInput
            value={condition}
            placeholder="Condición"
            onIonChange={(e: CustomEvent) => setCondition(e.detail.value!)}
          />
        </IonItem>

        {/* Botón para gestionar la ubicación (GPS o selección manual) */}
        <IonButton expand="block" onClick={handleOpenMap}>
          Seleccionar Ubicación
        </IonButton>
        
        {location && (
          <IonItem>
            <IonLabel>Latitud: {location.latitude}</IonLabel>
            <IonLabel>Longitud: {location.longitude}</IonLabel>
          </IonItem>
        )}

        <IonButton expand="block" onClick={handleTakePhoto}>
          Tomar Foto
        </IonButton>

        {/* Mostrar las fotos tomadas */}
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonButton expand="block" onClick={handleSubmit}>
          Enviar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPatient;
