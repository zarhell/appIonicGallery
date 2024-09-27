import React from 'react';
import { IonPage, IonContent, IonButton, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const MainPage: React.FC = () => {
  const history = useHistory();

  const handleNavigate = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Opciones de la Aplicación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => handleNavigate('/register-patient')}>
          Registrar Paciente
        </IonButton>
        <IonButton expand="block" onClick={() => handleNavigate('/registered-patients')}>
          Gestionar Pacientes Registrados
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
