import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonMenuButton,
  IonBackButton,
  IonButtons,
  IonLabel,
  IonInput,
  IonItem
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { LocalStorageService } from '../../application/services/LocalStorageService';
import { Photo } from '../../domain/entities/Photo'; 

interface FormData {
  fullName: string;
  idNumber: string;
  age: string;
  gender: string;
  location: { latitude: number; longitude: number } | null;
  photos: Photo[];
}

const RegisterPatient: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '', 
    idNumber: '', 
    age: '', 
    gender: '', 
    location: null, 
    photos: []
  });

  const history = useHistory();
  const locationState = useLocation<{ photos?: Photo[], location?: { latitude: number, longitude: number } }>();

  useEffect(() => {
    loadFormData();
    
    if (locationState.state?.photos) {
      setFormData((prevData) => ({
        ...prevData, 
        photos: locationState.state.photos || []
      }));
    }

    if (locationState.state?.location) {
      setFormData((prevData) => ({
        ...prevData, 
        location: locationState.state.location || null
      }));
    }
  }, [locationState]);

  const loadFormData = async () => {
    const savedData = await LocalStorageService.getData('patientForm');
    if (savedData) {
      setFormData(savedData);
    }
  };

  const handleSubmit = async () => {
    await LocalStorageService.saveData('patientForm', formData);
    console.log('Patient data submitted:', formData);
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
          <IonLabel position="floating">Nombre Completo</IonLabel>
          <IonInput 
            value={formData.fullName} 
            onIonChange={(e: CustomEvent) => setFormData({ ...formData, fullName: e.detail.value! })} 
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Número de ID</IonLabel>
          <IonInput 
            value={formData.idNumber} 
            onIonChange={(e: CustomEvent) => setFormData({ ...formData, idNumber: e.detail.value! })} 
          />
        </IonItem>
        <IonButton 
          expand="block" 
          onClick={() => history.push('/photo-registration', { patientId: 'some-id' })}
        >
          Registrar Fotos
        </IonButton>
        <IonButton 
          expand="block" 
          onClick={() => history.push('/map', { patientId: 'some-id' })}
        >
          Seleccionar Ubicación
        </IonButton>

        <IonButton expand="block" onClick={handleSubmit}>
          Enviar Registro
        </IonButton>
      </IonContent>
    </IonPage>
  );
};


export default RegisterPatient;
