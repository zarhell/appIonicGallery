import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { LocalStorageService } from '../../application/services/LocalStorageService';
import { useHistory } from 'react-router-dom';

const PatientDataForm: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const history = useHistory();

  useEffect(() => {
    const loadFormData = async () => {
      const savedData = await LocalStorageService.getData('patientForm');
      if (savedData) {
        setName(savedData.name || '');
        setAge(savedData.age || '');
      }
    };
    loadFormData();
  }, []);

  const handleNext = async () => {
    const formData = { name, age };
    await LocalStorageService.saveData('patientForm', formData);
    history.push('/photo-registration');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Datos del Paciente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput value={name} onIonChange={(e: any) => setName(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Edad</IonLabel>
          <IonInput type="number" value={age} onIonChange={(e: any) => setAge(e.detail.value!)} />
        </IonItem>
        <IonButton expand="block" onClick={handleNext}>Siguiente</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PatientDataForm;
