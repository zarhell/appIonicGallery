import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonTitle, IonToolbar, IonHeader, IonItem, IonLabel, IonImg, IonGrid, IonRow, IonCol, IonButtons, IonBackButton } from '@ionic/react';
import { LocalPhotoRepository } from '../../infrastructure/api/LocalPhotoRepository';
import { Photo } from '../../domain/entities/Photo';
import { LocalStorageService } from '../../application/services/LocalStorageService';
import { takePhoto } from '../../application/services/PhotoService';
import { useHistory, useLocation } from 'react-router-dom';
import { ReverseGeocodeService } from '../../application/services/ReverseGeocodeService';

interface RegisterPatientProps {
  photoRepository: LocalPhotoRepository;
}

interface LocationState {
  selectedLocation?: {
    latitude: number;
    longitude: number;
  };
}

const RegisterPatient: React.FC<RegisterPatientProps> = ({ photoRepository }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [address, setAddress] = useState<string | null>(null);

  const history = useHistory();
  const locationState = useLocation<LocationState>();
  useEffect(() => {
    const loadFormData = async () => {
      const savedData = await LocalStorageService.getData('patientForm');
      if (savedData) {
        setName(savedData.name || '');
        setAge(savedData.age || '');
        setPhotos(savedData.photos || []);
        setLocation(savedData.location || null);
      }
      if (locationState.state?.selectedLocation) {
        const { latitude, longitude } = locationState.state.selectedLocation;
        setLatitude(latitude);
        setLongitude(longitude);
      }
    };
    loadFormData();
  }, [locationState]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (latitude && longitude) {
        const reverseGeocodeService = new ReverseGeocodeService();
        const foundAddress = await reverseGeocodeService.getAddressFromCoordinates(latitude, longitude);
        setAddress(foundAddress);
      }
    };
    fetchAddress();
  }, [latitude, longitude]);

  const handleTakePhoto = async () => {
    try {
      const newPhoto = await takePhoto();
      const savedPhoto = await photoRepository.save(newPhoto);
      setPhotos([...photos, savedPhoto]);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };
  

  const handleSubmit = async () => {
    const formData = {
      name,
      age,
      photos,
      location: { latitude, longitude }
    };
    await LocalStorageService.saveData('patientForm', formData);
    alert('Paciente guardado exitosamente');
  };
  const handleOpenMap = () => {
    history.push('/map'); // Redirigir a la página MapPage
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/main" />
          </IonButtons>
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

        <IonButton expand="block" onClick={handleTakePhoto}>
          Tomar Foto
        </IonButton>

        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        
        <IonButton expand="block" onClick={handleOpenMap}>
          Seleccionar Ubicación en el Mapa
        </IonButton>
        
        {address && (
          <IonItem>
            <IonLabel>Dirección: {address}</IonLabel>
          </IonItem>
        )}
        


        <IonButton expand="block" onClick={handleSubmit}>
          Enviar
        </IonButton>
        
      </IonContent>
    </IonPage>
  );
};

export default RegisterPatient;
