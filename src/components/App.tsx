import { useIntegration } from "@telegram-apps/react-router-integration";
import {
	bindMiniAppCSSVars,
	bindThemeParamsCSSVars,
	bindViewportCSSVars,
	initNavigator,
	useInitData,
	useMiniApp,
	useThemeParams,
	useViewport,
} from "@telegram-apps/sdk-react";
import { type FC, useEffect, useMemo } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { postEvent } from "@telegram-apps/sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from '@tonconnect/ui-react';


import { routes } from "@/navigation/routes.tsx";
const queryClient = new QueryClient();

export const App: FC = () => {
	const miniApp = useMiniApp();
	const themeParams = useThemeParams();
	const viewport = useViewport();
  const initDataRaw = useInitData();
  console.log(initDataRaw);
	useEffect(() => {
		return bindMiniAppCSSVars(miniApp, themeParams);
	}, [miniApp, themeParams]);

	useEffect(() => {
		return bindThemeParamsCSSVars(themeParams);
	}, [themeParams]);

  useEffect(() => {
		return viewport && bindViewportCSSVars(viewport);
	}, [viewport]);
  
    postEvent('web_app_expand');
    postEvent('web_app_setup_swipe_behavior', {allow_vertical_swipe: false});
 
  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);
  

  useEffect(() => {
    switch (true) {
        case location.pathname === '/connect':
            miniApp.setHeaderColor('#000000');
            miniApp.setBgColor('#000000');
            break;
        case location.pathname === '/':
            miniApp.setHeaderColor('#1F2937');
            miniApp.setBgColor('#f9fafb');
            break;
        case location.pathname === '/profiles':
            miniApp.setHeaderColor('#f9fafb');
            miniApp.setBgColor('#f9fafb');
            break;
        case location.pathname === '/nfts':
        case location.pathname.startsWith('/nft/'):
            miniApp.setHeaderColor('#f9fafb');
            miniApp.setBgColor('#f9fafb');
            break;
    }
}, [location, miniApp]);


	// Don't forget to attach the navigator to allow it to control the BackButton state as well
	// as browser history.
	useEffect(() => {
		navigator.attach();
		return () => navigator.detach();
	}, [navigator]);

	return (
		<TonConnectUIProvider>
			<QueryClientProvider client={queryClient}>
				<Router location={location} navigator={reactNavigator}>
					<Routes>
						{routes.map((route) => (
							<Route key={route.path} {...route} />
						))}
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Router>
			</QueryClientProvider>
		</TonConnectUIProvider>
	);
};
