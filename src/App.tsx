import React from 'react'; 
import { IonApp, IonRouterOutlet, setupIonicReact, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import SideMenu from './presentation/components/SideMenu';
import AppRoutes from './presentation/routes/AppRoutes';
import { Route } from 'react-router-dom';
import Ping from './presentation/pages/Ping'; // Ruta corregida
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>  
      <IonSplitPane contentId="main-content">
        <SideMenu />
        <IonRouterOutlet id="main-content">
          <AppRoutes />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
