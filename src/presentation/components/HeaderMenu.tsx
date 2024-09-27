import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonMenu } from '@ionic/react';
import { menuOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const HeaderMenu: React.FC = () => {
  const history = useHistory();

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestión de Pacientes</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={menuOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonMenu contentId="main-content">
        <IonButtons>
          <IonButton onClick={() => navigateTo('/register-patient')}>
            Registrar Paciente
          </IonButton>
          <IonButton onClick={() => navigateTo('/registered-patients')}>
            Pacientes Registrados
          </IonButton>
        </IonButtons>
      </IonMenu>
    </>
  );
};

export default HeaderMenu;
