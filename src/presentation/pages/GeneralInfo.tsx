import React from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';

interface GeneralInfoProps {
  formData: {
    fullName: string;
    idNumber: string;
    age: string;
    gender: string;
  };
  handleInputChange: (e: CustomEvent) => void;
  navigateToNext: () => void;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ formData, handleInputChange, navigateToNext }) => {
  return (
    <IonPage>
      <IonContent>
        <h2>Información General</h2>
        <IonItem>
          <IonLabel position="floating">Nombre Completo</IonLabel>
          <IonInput
            name="fullName"
            type="text"
            value={formData.fullName}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Número de ID</IonLabel>
          <IonInput
            name="idNumber"
            type="text"
            value={formData.idNumber}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Edad</IonLabel>
          <IonInput name="age" type="number" value={formData.age} onIonChange={handleInputChange} />
        </IonItem>
        <IonItem>
          <IonLabel>Género</IonLabel>
          <IonSelect name="gender" value={formData.gender} onIonChange={handleInputChange}>
            <IonSelectOption value="Male">Masculino</IonSelectOption>
            <IonSelectOption value="Female">Femenino</IonSelectOption>
            <IonSelectOption value="Other">Otro</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonButton expand="block" onClick={navigateToNext}>
          Siguiente
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default GeneralInfo;
