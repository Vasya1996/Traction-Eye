import { useIntegration } from "@telegram-apps/react-router-integration";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
	bindMiniAppCSSVars,
	bindThemeParamsCSSVars,
	bindViewportCSSVars,
	initNavigator,
	useMiniApp,
	useThemeParams,
	useViewport,
} from "@telegram-apps/sdk-react";
import React, { type FC, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { postEvent } from "@telegram-apps/sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { Toaster } from 'react-hot-toast';
import { routes } from "@/navigation/routes.tsx";
import { SocialCap, AssetsOff } from "./icons";
import { useLocalStorageSubscription } from "@/hooks";
import { LocalStorageKeys } from "@/constants/localStorage";
const queryClient = new QueryClient();



export const App: FC = () => {
	const miniApp = useMiniApp();
	const themeParams = useThemeParams();
	const viewport = useViewport();
	const scrollValue = useLocalStorageSubscription(LocalStorageKeys.scroll);

	const isScrollBlocked = scrollValue?.toLowerCase() === "true" ? true : false;

	useEffect(() => {
		return bindMiniAppCSSVars(miniApp, themeParams);
	}, [miniApp, themeParams]);

	useEffect(() => {
		return bindThemeParamsCSSVars(themeParams);
	}, [themeParams]);

  useEffect(() => {
		return viewport && bindViewportCSSVars(viewport);
	}, [viewport]);

	// useEffect(() => {
	// 	document.body.style.overflow = 'hidden'; // Disable body scroll
	// 	return () => {
	// 		document.body.style.overflow = ''; // Reset on cleanup
	// 	};
	// }, []);
  
    postEvent('web_app_expand');
    postEvent('web_app_setup_swipe_behavior', {allow_vertical_swipe: false});
 
  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);
  
  useEffect(() => {
    switch (true) {
        case location.pathname === '/connect':
			postEvent('web_app_setup_back_button', { is_visible: false });
            miniApp.setHeaderColor('#000000');
            miniApp.setBgColor('#000000');
            break;
        case location.pathname === '/':
			postEvent('web_app_setup_back_button', { is_visible: false });
            miniApp.setHeaderColor('#1F2937');
            miniApp.setBgColor('#f9fafb');
            break;
        case location.pathname === '/profiles':
			postEvent('web_app_setup_back_button', { is_visible: true });
            miniApp.setHeaderColor('#f9fafb');
            miniApp.setBgColor('#f9fafb');
            break;
        case location.pathname === '/nfts':
        case location.pathname.startsWith('/nft'):
			postEvent('web_app_setup_back_button', { is_visible: true });
            miniApp.setHeaderColor('#f9fafb');
            miniApp.setBgColor('#f9fafb');
            break;
		case location.pathname.startsWith('/asset'):
			postEvent('web_app_setup_back_button', { is_visible: true });
			miniApp.setHeaderColor('#1F2937');
			miniApp.setBgColor('#f9fafb');
			break;
		case location.pathname === '/premium':
			postEvent('web_app_setup_back_button', { is_visible: true });
			miniApp.setHeaderColor('#000000');
			miniApp.setBgColor('#000000');
			break;
    }
}, [location, miniApp]);


	// Don't forget to attach the navigator to allow it to control the BackButton state as well
	// as browser history.
	useEffect(() => {
		navigator.attach();
		return () => navigator.detach();
	}, [navigator]);

	const [value, setValue] = useState(0);
		// Bottom Navigation Handlers
		const handleNavigationChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
			event.preventDefault();
			setValue(newValue);
			if (newValue === 0) {
				navigator.push("/");
			} else if (newValue === 1) {
				navigator.push("/referral");
			}
		};

	return (
		<div className="max-h-screen" style={{overflow: isScrollBlocked ? "hidden" : "auto" }}>
			<TonConnectUIProvider>
				<QueryClientProvider client={queryClient}>
					<Toaster position="top-right" reverseOrder={false} />
					<Router location={location} navigator={reactNavigator}>
						<Routes>
							{routes.map((route) => (
								<Route key={route.path} {...route} />
							))}
							<Route path="*" element={<Navigate to="/" />} />
						</Routes>
						{location?.pathname !== "/connect" && (
							<BottomNavigation
								value={value}
								onChange={handleNavigationChange}
								showLabels
								className="fixed bottom-0 w-full z-50 pb-safe"
								style={{ height: 90}}
							>
								<BottomNavigationAction icon={<AssetsOff isActive={value === 0}/>} />
								<BottomNavigationAction icon={<SocialCap isActive={value === 1}/>} />
							</BottomNavigation>	
						)}
					</Router>
				</QueryClientProvider>
			</TonConnectUIProvider>
		</div>
	);
};
