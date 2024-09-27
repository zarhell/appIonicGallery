import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import FormItemInput from './FormItemInput';
import FormItemSelect from './FormItemSelect';
import { FormProps } from './types';

const MedicalProcedures: React.FC<FormProps> = ({ formData, handleInputChange, navigateToPrev, handleSubmit }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Procedimientos Médicos</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <FormItemInput label="Número de Ambulancia" name="ambulanceNumber" value={formData.ambulanceNumber} handleInputChange={handleInputChange} />
      <FormItemSelect
        label="Tipo de Ambulancia"
        name="ambulanceType"
        value={formData.ambulanceType}
        options={[
          { value: "Basic", label: "Básica" },
          { value: "Medicalized", label: "Medicalizada" },
          { value: "Neonatal", label: "Neonatal" },
          { value: "Psychiatric", label: "Psiquiátrica" },
        ]}
        handleInputChange={handleInputChange}
      />
      <IonButton expand="block" onClick={navigateToPrev}>
        Atrás
      </IonButton>
      <IonButton expand="block" onClick={handleSubmit}>
        Finalizar Registro
      </IonButton>
    </IonContent>
  </IonPage>
);

export default MedicalProcedures;
