import type { ComponentType, JSX } from "react";

import { IndexPage } from "@/pages/IndexPage/IndexPage";
import { ConnectPage } from "@/pages/ConnectPage/ConnectPage";
import ProfilesListPage from "../pages/ProfilesListPage/ProfilesListPage";

interface Route {
	path: string;
	Component: ComponentType;
	title?: string;
	icon?: JSX.Element;
}

export const routes: Route[] = [
	{ path: "/", Component: IndexPage },
	{ path: "/connect", Component: ConnectPage },
	{ path: "/profiles", Component: ProfilesListPage }
];
