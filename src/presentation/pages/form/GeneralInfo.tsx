import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import FormItemInput from './FormItemInput';
import FormItemSelect from './FormItemSelect';
import { FormProps } from './types';

const GeneralInfo: React.FC<FormProps> = ({ formData, handleInputChange, navigateToNext }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Información General</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <FormItemInput label="Nombre Completo" name="fullName" value={formData.fullName} handleInputChange={handleInputChange} />
      <FormItemInput label="Número de Identificación" name="idNumber" value={formData.idNumber} handleInputChange={handleInputChange} />
      <FormItemInput label="Edad" name="age" value={formData.age} type="number" handleInputChange={handleInputChange} />
      <FormItemSelect
        label="Género"
        name="gender"
        value={formData.gender}
        options={[
          { value: "Male", label: "Masculino" },
          { value: "Female", label: "Femenino" },
          { value: "Other", label: "Otro" },
        ]}
        handleInputChange={handleInputChange}
      />
      <IonButton expand="block" onClick={navigateToNext}>
        Siguiente
      </IonButton>
    </IonContent>
  </IonPage>
);

export default GeneralInfo;
