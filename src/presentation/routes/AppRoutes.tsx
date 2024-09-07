import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Tab1 from '../pages/Tab1';

const AppRoutes: React.FC = () => (
  <>
    <Route path="/tab1" component={Tab1} exact={true} />
    <Redirect exact from="/" to="/tab1" />
  </>
);

export default AppRoutes;
