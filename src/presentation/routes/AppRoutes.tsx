import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import RegisterPatient from '../pages/RegisterPatient';
import MapPage from '../pages/MapPage';
import PrivateRoute from './PrivateRoute';
import { AuthService } from '../../application/services/AuthService';

const AppRoutes: React.FC = () => (
  <>
    {/* Rutas Públicas */}
    <Route path="/login" component={Login} exact={true} />

    {/* Rutas Privadas */}
    <PrivateRoute path="/register-patient" component={RegisterPatient} exact={true} />
    <PrivateRoute path="/map" component={MapPage} exact={true} />

    {/* Redirección por defecto */}
    <Route
      path="/"
      exact={true}
      render={() =>
        AuthService.isLoggedIn() ? <Redirect to="/register-patient" /> : <Redirect to="/login" />
      }
    />
  </>
);

export default AppRoutes;


