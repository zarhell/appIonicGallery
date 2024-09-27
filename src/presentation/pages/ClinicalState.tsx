import React from 'react';
import {
  IonPage, IonContent, IonInput, IonItem, IonLabel, IonButton
} from '@ionic/react';

const ClinicalState: React.FC<{
  formData: any;
  handleInputChange: (e: any) => void;
  navigateToNext: () => void;
  navigateToPrev: () => void;
}> = ({ formData, handleInputChange, navigateToNext, navigateToPrev }) => {
  return (
    <IonPage>
      <IonContent>
        <h2>Estado Clínico</h2>
        <IonItem>
          <IonLabel position="floating">Frecuencia Cardíaca</IonLabel>
          <IonInput
            name="heartRate"
            type="number"
            value={formData.heartRate}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Presión Arterial</IonLabel>
          <IonInput
            name="bloodPressure"
            type="text"
            value={formData.bloodPressure}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Temperatura</IonLabel>
          <IonInput
            name="temperature"
            type="number"
            value={formData.temperature}
            onIonChange={handleInputChange}
          />
        </IonItem>

        <IonButton expand="block" onClick={navigateToPrev}>
          Atrás
        </IonButton>
        <IonButton expand="block" onClick={navigateToNext}>
          Siguiente
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ClinicalState;
