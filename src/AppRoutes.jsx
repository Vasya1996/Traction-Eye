import routes from "./routes";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, component, exact }) => (
        <Route key={path} exact={exact} path={path} element={component} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
