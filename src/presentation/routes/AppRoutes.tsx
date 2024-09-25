import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import RegisterPatient from '../pages/RegisterPatient';
import RegisteredPatients from '../pages/RegisteredPatients';
import MainPage from '../pages/MainPage';
import Login from '../pages/Login';
import MapPage from '../pages/MapPage';
import { AuthService } from '../../application/services/AuthService';
import { LocalPhotoRepository } from '../../infrastructure/api/LocalPhotoRepository';

const AppRoutes: React.FC = () => (
  <>
    {/* Default route: Redirect to login if not authenticated */}
    <Route path="/" exact render={() => <Redirect to="/login" />} />

    {/* Login Route */}
    <Route path="/login" exact component={Login} />

    {/* Main Page */}
    <Route
      path="/main"
      render={(props) =>
        AuthService.isLoggedIn() ? <MainPage /> : <Redirect to="/login" />
      }
      exact
    />

    {/* Registrar Paciente */}
    <Route
      path="/register-patient"
      render={(props) =>
        AuthService.isLoggedIn() ? (
          <RegisterPatient {...props} photoRepository={new LocalPhotoRepository()} />
        ) : (
          <Redirect to="/login" />
        )
      }
      exact
    />

    {/* Pacientes Registrados */}
    <Route
      path="/registered-patients"
      component={AuthService.isLoggedIn() ? RegisteredPatients : MainPage}
      exact
    />

    {/* Map Page */}
    <Route path="/map" component={MapPage} exact />
    <Route path="/" exact render={() => <Redirect to="/login" />} />
  </>
);

export default AppRoutes;
