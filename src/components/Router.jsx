import React, { useState, useEffect, createContext, useContext } from "react";

// Create a context to share the router state and functions
const RouterContext = createContext();

// Router component
const Router = ({ children }) => {
  const [history, setHistory] = useState(["/"]);
  const [currentPath, setCurrentPath] = useState("/");
  const [routeData, setRouteData] = useState({});

  useEffect(() => {
    const handlePopState = () => {
      navigateBack();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (path, data = {}) => {
    setHistory((prevHistory) => [...prevHistory, path]);
    setCurrentPath(path);
    setRouteData(data);
  };

  const navigateBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentPath(newHistory[newHistory.length - 1]);
    }
  };

  const replaceRoute = (path, data = {}) => {
    const newHistory = [...history.slice(0, -1), path];
    setHistory(newHistory);
    setCurrentPath(path);
    setRouteData(data);
  };

  const value = { currentPath, routeData, navigate, navigateBack, replaceRoute };

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

// useRouter hook to access the router functions
const useRouter = () => {
  return useContext(RouterContext);
};

export { Router, useRouter };
