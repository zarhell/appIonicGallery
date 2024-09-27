import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/react';
import { LocalStorageService } from '../../application/services/LocalStorageService';

const RegisteredPatients: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const savedPatients = await LocalStorageService.getData('patients');
      setPatients(savedPatients || []);
    };
    fetchPatients();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/main" /> {/* Back button to main page */}
          </IonButtons>
          <IonTitle>Pacientes Registrados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {patients.map((patient, index) => (
            <IonItem key={index}>
              <IonLabel>
                {patient.name} - {patient.age} años
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RegisteredPatients;
