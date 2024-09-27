import React from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';

interface FormItemSelectProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  handleInputChange: (e: any) => void;
}

const FormItemSelect: React.FC<FormItemSelectProps> = ({ label, name, value, options, handleInputChange }) => (
  <IonItem>
    <IonLabel>{label}</IonLabel>
    <IonSelect name={name} value={value} onIonChange={handleInputChange}>
      {options.map((option) => (
        <IonSelectOption key={option.value} value={option.value}>
          {option.label}
        </IonSelectOption>
      ))}
    </IonSelect>
  </IonItem>
);

export default FormItemSelect;
