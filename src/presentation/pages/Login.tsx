import React, { useState } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonTitle, IonToolbar, IonHeader, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../../application/services/AuthService';



const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();


  const handleLogin = async () => {
    try {
      const isLoggedIn = await AuthService.login(username, password);

      if (isLoggedIn) {
        localStorage.setItem('isAuthenticated', 'true');
        history.push('/main');
    } else {
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
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
