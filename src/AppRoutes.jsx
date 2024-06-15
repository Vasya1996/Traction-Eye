import React from 'react'
import { Router, useRouter } from './components/Router';
import routes from './routes';

const AppRoutes = () => {
    const { currentPath } = useRouter();
  
    return (
      <div>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path} component={Component} currentPath={currentPath} />
        ))}
      </div>
    );
};
  
  const Route = ({ path, component: Component, currentPath }) => {
    const isMatch = currentPath === path? true :false;
  
    return isMatch ? <Component /> : null;
  };
  
  export default AppRoutes;