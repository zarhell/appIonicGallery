import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel, IonInput, IonItem } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { LocalPatientRepository } from '../../infrastructure/api/LocalPatientRepository';
import { Patient } from '../../domain/entities/Patient';

const RegisterPatient: React.FC = () => {
  const [formData, setFormData] = useState<Patient>({
    id: '', 
    fullName: '', 
    idNumber: '', 
    age: '', 
    gender: '', 
    location: null, 
    photos: []
  });
  const patientRepository = new LocalPatientRepository();
  const history = useHistory();
  const locationState = useLocation<{ photos?: string[], location?: { latitude: number, longitude: number } }>();

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
    const savedData = await patientRepository.getAll();
    if (savedData) {
      setFormData(savedData[0] || formData); // Load the first patient's data or use the initial state
    }
  };

  const handleSubmit = async () => {
    formData.id = new Date().toISOString(); // Assign a unique ID for the patient
    await patientRepository.save(formData);
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
          onClick={() => history.push('/photo-registration', { patientId: formData.id })}
        >
          Registrar Fotos
        </IonButton>
        <IonButton 
          expand="block" 
          onClick={() => history.push('/map', { patientId: formData.id })}
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
