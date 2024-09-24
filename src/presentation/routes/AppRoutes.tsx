import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import Tab1 from "../pages/Tab1";
import Tab2 from "../pages/Tab2";
import Tab3 from "../pages/Tab3";
import Login from "../pages/Login";
import RegisterPatient from "../pages/RegisterPatient";
import { AuthService } from "../../application/services/AuthService";
import MapPage from '../pages/MapPage';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const AppRoutes: React.FC = () => (
  <>
    {/* Rutas Públicas */}
    <Route path="/login" component={Login} exact={true} />

    {/* Ruta para registrar un paciente */}
    <PrivateRoute
      path="/register-patient"
      component={RegisterPatient}
      exact={true}
    />

    {/* Rutas Privadas */}
    <PrivateRoute path="/tab1" component={Tab1} exact={true} />
    <PrivateRoute path="/tab2" component={Tab2} exact={true} />
    <PrivateRoute path="/tab3" component={Tab3} exact={true} />
    
{/* Ruta pública para el mapa (puedes cambiarla a privada si es necesario) */}
<Route path="/map" component={MapPage} exact={true} />

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
