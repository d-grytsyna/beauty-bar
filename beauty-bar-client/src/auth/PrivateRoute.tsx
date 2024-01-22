import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import TokenService from "../services/token.service";

interface PrivateRouteProps extends RouteProps {
  role?: string;
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component, role, ...rest
}) => {
  const isAuthenticated = TokenService.getLocalAccessToken() !== undefined;
  const userRole = TokenService.getUserRole();
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  if (role && userRole !== role) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
