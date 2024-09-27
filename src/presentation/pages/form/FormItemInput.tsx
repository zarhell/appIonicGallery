import React from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';
import { TextFieldTypes } from '@ionic/core'

interface FormItemInputProps {
  label: string;
  name: string;
  value: string;
  type?: TextFieldTypes;
  handleInputChange: (e: any) => void;
}

const FormItemInput: React.FC<FormItemInputProps> = ({ label, name, value, type = "text", handleInputChange }) => (
  <IonItem>
    <IonLabel position="floating">{label}</IonLabel>
    <IonInput name={name} type={type} value={value} onIonChange={handleInputChange} />
  </IonItem>
);

export default FormItemInput;
