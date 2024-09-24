import React from 'react';
import {
  IonPage, IonContent, IonInput, IonItem, IonLabel, IonButton, IonSelect, IonSelectOption
} from '@ionic/react';

const MedicalProcedures: React.FC<{
  formData: any;
  handleInputChange: (e: any) => void;
  navigateToNext: () => void;
  navigateToPrev: () => void;
}> = ({ formData, handleInputChange, navigateToNext, navigateToPrev }) => {
  return (
    <IonPage>
      <IonContent>
        <h2>Procedimientos Médicos</h2>
        <IonItem>
          <IonLabel position="floating">Número de Ambulancia</IonLabel>
          <IonInput
            name="ambulanceNumber"
            type="text"
            value={formData.ambulanceNumber}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Tipo de Ambulancia</IonLabel>
          <IonSelect
            name="ambulanceType"
            value={formData.ambulanceType}
            onIonChange={handleInputChange}
          >
            <IonSelectOption value="Basic">Básica</IonSelectOption>
            <IonSelectOption value="Medicalized">Medicalizada</IonSelectOption>
            <IonSelectOption value="Neonatal">Neonatal</IonSelectOption>
            <IonSelectOption value="Psychiatric">Psiquiátrica</IonSelectOption>
            <IonSelectOption value="Others">Otras</IonSelectOption>
          </IonSelect>
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

export default MedicalProcedures;
