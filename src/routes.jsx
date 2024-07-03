import Connect from "./pages/Connect";
import Home from "./pages/Home";
import Authorization from "./pages/Authorization";
import ProfilesList from "./pages/ProfilesList";
import ProfilesManage from "./pages/ProfilesManage";
import NFTList from "./pages/NFTList";
import NFTDetails from './pages/NFTDetails';
import AssetDetails from "./pages/AssetDetails";

const routes = [
  {
    path: "/",
    component: <Home />,
    exact: true,
  },
  {
    path: "connect",
    component: <Connect />,
  },
  {
    path: "profiles-manage",
    component: <ProfilesManage />,
  },
  {
    path: "profiles",
    component: <ProfilesList />,
  },
  {
    path: "auth",
    component: <Authorization />,
  },
  {
    path: "nft",
    component: <NFTDetails />,
  },
  {
    path: "nft-list",
    component: <NFTList />,
  },
  {
    path: "asset/:id",
    component: <AssetDetails />,
  }
];

export default routes;
