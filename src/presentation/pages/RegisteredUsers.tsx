import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import { LocalStorageService } from '../../application/services/LocalStorageService';

const RegisteredUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadRegisteredUsers();
  }, []);

  const loadRegisteredUsers = async () => {
    const savedUsers = await LocalStorageService.getData('registeredUsers');
    if (savedUsers) {
      setUsers(savedUsers);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuarios Registrados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {users.map((user, index) => (
            <IonItem key={index}>
              <IonLabel>
                {user.name} - {user.age} años
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RegisteredUsers;
