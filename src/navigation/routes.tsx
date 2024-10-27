import type { ComponentType, JSX } from "react";

import IndexPage from "../pages/IndexPage/IndexPage";
import { ConnectPage } from "../pages/ConnectPage/ConnectPage";
import ProfilesListPage from "../pages/ProfilesListPage/ProfilesListPage";
import NFTListPage  from "../pages/NFTListPage/NFTListPage";
import NFTItemPage from '../pages/NFTItemPage/NFTItemPage';
import AssetItemPage from "@/pages/AssetItemPage/AssetItemPage";
import PremiumBuyPage from '@/pages/PremiumBuyPage/PremiumBuyPage';
import { SocialScorePage } from '@/pages/SocialScorePage';

interface Route {
	path: string;
	Component: ComponentType;
	title?: string;
	icon?: JSX.Element;
}

export const routes: Route[] = [
	{ path: "/", Component: IndexPage },
	{ path: "/referral", Component: SocialScorePage },
	{ path: "/connect", Component: IndexPage },
	{ path: "/profiles", Component: ProfilesListPage },
	{ path: "/nfts", Component: NFTListPage },
	{ path: "/nft/:id", Component: NFTItemPage },
	{ path: "/asset/:id", Component: AssetItemPage },
	{ path: "/premium", Component: PremiumBuyPage }
];
