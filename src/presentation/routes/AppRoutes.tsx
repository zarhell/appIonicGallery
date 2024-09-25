import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import RegisterPatient from '../pages/RegisterPatient';
import Login from '../pages/Login';
import MapPage from '../pages/MapPage';
import { AuthService } from '../../application/services/AuthService';

const AppRoutes: React.FC = () => (
  <>
    {/* Rutas Públicas */}
    <Route path="/login" component={Login} exact={true} />
    <Route path="/map" component={MapPage} exact={true} />

    {/* Ruta Privada */}
    <Route
      path="/register-patient"
      component={AuthService.isLoggedIn() ? RegisterPatient : Login}
      exact={true}
    />

    {/* Redirección por defecto */}
    <Route
      path="/"
      exact={true}
      render={() =>
        AuthService.isLoggedIn() ? (
          <Redirect to="/register-patient" />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  </>
);

export default AppRoutes;
