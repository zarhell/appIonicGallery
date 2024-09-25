import React, { useState } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonTitle, IonToolbar, IonHeader, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../../application/services/AuthService';



const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const handleLogin = () => {
    if (AuthService.login(username, password)) {
      history.push('/register-patient');
    } else {<input class="native-input sc-ion-input-md" id="ion-input-1" autocapitalize="off" autocomplete="off" autocorrect="off" name="ion-input-1" placeholder="Password" spellcheck="false" type="password"></input>
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput
          value={username}
          placeholder="Username"
          onIonChange={(e: CustomEvent) => setUsername(e.detail.value!)}
          clearInput
        />
        <IonInput
          value={password}
          type="password"
          placeholder="Password"
          onIonChange={(e: CustomEvent) => setPassword(e.detail.value!)}
          clearInput
        />
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Invalid credentials."
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
