import React from 'react';
import {
  IonPage, IonContent, IonInput, IonItem, IonLabel, IonButton, IonSelect, IonSelectOption, IonDatetime
} from '@ionic/react';

const TransferDetails: React.FC<{
  formData: any;
  handleInputChange: (e: any) => void;
  navigateToNext: () => void;
  navigateToPrev: () => void;
}> = ({ formData, handleInputChange, navigateToNext, navigateToPrev }) => {
  return (
    <IonPage>
      <IonContent>
        <h2>Detalles del Traslado</h2>
        <IonItem>
          <IonLabel position="floating">Fecha del Traslado</IonLabel>
          <IonDatetime
            presentation="date"
            value={formData.transferDate}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Lugar de Origen</IonLabel>
          <IonInput
            name="originPlace"
            type="text"
            value={formData.originPlace}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Lugar de Destino</IonLabel>
          <IonInput
            name="destinationPlace"
            type="text"
            value={formData.destinationPlace}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Razón del Traslado</IonLabel>
          <IonSelect
            name="transferReason"
            value={formData.transferReason}
            onIonChange={handleInputChange}
          >
            <IonSelectOption value="Emergency">Emergencia</IonSelectOption>
            <IonSelectOption value="Specialized Consultation">Consulta Especializada</IonSelectOption>
            <IonSelectOption value="Referral">Remisión</IonSelectOption>
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

export default TransferDetails;
