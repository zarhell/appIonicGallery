import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import FormItemInput from './FormItemInput';
import { FormProps } from './types';

const ClinicalState: React.FC<FormProps> = ({ formData, handleInputChange, navigateToNext, navigateToPrev }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Estado Clínico</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <FormItemInput label="Frecuencia Cardíaca" name="heartRate" value={formData.heartRate} type="number" handleInputChange={handleInputChange} />
      <FormItemInput label="Presión Arterial" name="bloodPressure" value={formData.bloodPressure} handleInputChange={handleInputChange} />
      <FormItemInput label="Temperatura" name="temperature" value={formData.temperature} type="number" handleInputChange={handleInputChange} />
      <IonButton expand="block" onClick={navigateToPrev}>
        Atrás
      </IonButton>
      <IonButton expand="block" onClick={navigateToNext}>
        Siguiente
      </IonButton>
    </IonContent>
  </IonPage>
);

export default ClinicalState;
