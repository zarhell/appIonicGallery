import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonMenu, IonList, IonItem, IonLabel } from '@ionic/react';
import { menuOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const HeaderMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const handleMenuItemClick = (path: string) => {
    history.push(path);
    setIsOpen(false);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestión de Pacientes</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(!isOpen)}>
              <IonIcon icon={menuOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {isOpen && (
        <IonMenu contentId="main-content" isOpen={isOpen}>
          <IonList>
            <IonItem button onClick={() => handleMenuItemClick('/register-patient')}>
              <IonLabel>Registrar Paciente</IonLabel>
            </IonItem>
            <IonItem button onClick={() => handleMenuItemClick('/registered-users')}>
              <IonLabel>Pacientes Registrados</IonLabel>
            </IonItem>
          </IonList>
        </IonMenu>
      )}
    </>
  );
};

export default HeaderMenu;
