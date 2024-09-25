import React from 'react'; 
import { IonApp, IonRouterOutlet, setupIonicReact, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AppRoutes from './presentation/routes/AppRoutes';
import { Route } from 'react-router-dom';
import Ping from './presentation/pages/Ping';
import HeaderMenu from './presentation/components/HeaderMenu';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
  <IonReactRouter>
    <HeaderMenu />
    <IonRouterOutlet id="main-content">
      <AppRoutes />
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
);

export default App;
