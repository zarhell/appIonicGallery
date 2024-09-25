import React from "react";
import { Route, Redirect } from "react-router-dom";

import RegisterPatient from "../pages/RegisterPatient";
import RegisteredPatients from "../pages/RegisteredPatients";
import MainPage from "../pages/MainPage";
import Login from "../pages/Login";
import MapPage from "../pages/MapPage";
import { AuthService } from "../../application/services/AuthService";
import { LocalPhotoRepository } from "../../infrastructure/api/LocalPhotoRepository";
import PatientDataForm from "../pages/PatientDataForm";
import PhotoRegistration from "../pages/PhotoRegistration";
import LocationPage from "../pages/LocationPage";

const AppRoutes: React.FC = () => (
  <>
    <Route path="/" exact render={() => <Redirect to="/login" />} />
    <Route path="/login" exact component={Login} />
    <Route
      path="/main"
      render={(props) =>
        AuthService.isLoggedIn() ? <MainPage /> : <Redirect to="/login" />
      }
      exact
    />
    <Route
      path="/register-patient"
      render={(props) =>
        AuthService.isLoggedIn() ? (
          <RegisterPatient
            {...props}
            photoRepository={new LocalPhotoRepository()}
          />
        ) : (
          <Redirect to="/login" />
        )
      }
      exact
    />
    
    <Route path="/patient-data" exact component={PatientDataForm} />
    <Route path="/photo-registration" exact component={PhotoRegistration} />
    <Route path="/location" exact component={LocationPage} />
    <Redirect from="/" to="/patient-data" exact />

    <Route
      path="/registered-patients"
      component={AuthService.isLoggedIn() ? RegisteredPatients : MainPage}
      exact
    />

    <Route path="/map" component={MapPage} exact />
    <Route path="/" exact render={() => <Redirect to="/login" />} />
  </>
);

export default AppRoutes;
