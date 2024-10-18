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
import { type FC, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { postEvent } from "@telegram-apps/sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider, useTonAddress } from '@tonconnect/ui-react';


import { routes } from "@/navigation/routes.tsx";
import { SocialCap, AssetsOff } from "./icons";
const queryClient = new QueryClient();

const TEST_ADDRESSES = ["UQAINHiKgQMi0BQ-Y4C5AMFiZm_2dgvf-KPxdWJImKWArNwM", "UQBghyYO1PSqiHO70FNCE5NpU94rTE3pfxjGpzB2aD6fWVCO", "UQAiuSciIC6VfkKODF9xsrogE44Okn13XGvdzXq1uCoOH40Z"];

export const App: FC = () => {
	const miniApp = useMiniApp();
	const themeParams = useThemeParams();
	const viewport = useViewport();
	const userFriendlyAddress = useTonAddress();

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
		<TonConnectUIProvider>
			<QueryClientProvider client={queryClient}>
				<Router location={location} navigator={reactNavigator}>
					<Routes>
						{routes.map((route) => (
							<Route key={route.path} {...route} />
						))}
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
					{location?.pathname !== "/connect" && TEST_ADDRESSES.includes(userFriendlyAddress) && (
						<BottomNavigation
							value={value}
							onChange={handleNavigationChange}
							showLabels
							style={{ position: "fixed", bottom: 0, width: "100%", zIndex: 1000, height: 85 }}
						>
							<BottomNavigationAction icon={<AssetsOff isActive={value === 0}/>} />
							<BottomNavigationAction icon={<SocialCap isActive={value === 1}/>} />
						</BottomNavigation>	
					)}
				</Router>
			</QueryClientProvider>
		</TonConnectUIProvider>
	);
};
