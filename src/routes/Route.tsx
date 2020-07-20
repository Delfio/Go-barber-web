import React from 'react';
import { RouteProps as ReactDomRouteProps, Route as ReactDomRoute, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/Auth';
// import { Container } from './styles';

interface RouteProps extends ReactDomRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

/**
 * Tabela verdade - condição and 'Autenticado' 'Rota privada'
 * true / true = ok
 * true / false = redirecionar
 * false / true = redirecionar
 * false / false = ok
 */

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => (isPrivate === !!user ? (
        <Component />
      ) : (
        <Redirect to={{
          pathname: isPrivate ? '/' : '/dashboard',
          state: {
            from: location,
          },
        }}
        />
      ))}
    />
  );
};

export default Route;
