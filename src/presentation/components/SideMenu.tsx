import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const SideMenu: React.FC = () => {
  const history = useHistory();

  const handleMenuItemClick = (path: string) => {
    history.push(path);
  };

  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menú</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem button onClick={() => handleMenuItemClick('/register-patient')}>
            <IonLabel>Registrar Paciente</IonLabel>
          </IonItem>
          <IonItem button onClick={() => handleMenuItemClick('/registered-users')}>
            <IonLabel>Usuarios Registrados</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
