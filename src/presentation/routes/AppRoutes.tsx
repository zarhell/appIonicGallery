import React from 'react';
import { Route } from 'react-router-dom';
import RegisterPatient from '../pages/RegisterPatient';
import MapPage from '../pages/MapPage';

const AppRoutes: React.FC = () => (
  <>
    {/* Rutas Públicas */}
    {/* <Route path="/login" component={Login} exact={true} /> */}

    {/* Rutas Principales */}
    <Route path="/" exact={true} component={RegisterPatient} />
    <Route path="/register-patient" component={RegisterPatient} exact={true} />
    <Route path="/map" component={MapPage} exact={true} />

    {/* Redirección por defecto */}
    <Route path="/" exact={true} component={RegisterPatient} />
  </>
);

export default AppRoutes;
