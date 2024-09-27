import React from "react";
import { Route, Redirect } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Login from "../pages/Login";
import MapPage from "../pages/MapPage";
import { AuthService } from "../../application/services/AuthService";
import RegisteredPatients from "../pages/RegisteredPatients";
import PatientDataForm from "../pages/PatientDataForm";

const AppRoutes: React.FC = () => (
  <>
    <Route path="/" exact render={() => <Redirect to="/login" />} />
    <Route path="/login" exact component={Login} />
    <Route
      path="/main"
      render={() =>
        AuthService.isLoggedIn() ? <MainPage /> : <Redirect to="/login" />
      }
      exact
    />
    <Route
      path="/register-patient"
      component={AuthService.isLoggedIn() ? PatientDataForm : Login}
      exact
    />
    <Route path="/registered-patients" exact component={RegisteredPatients} />
    <Route path="/map" exact component={MapPage} />
  </>
);

export default AppRoutes;
