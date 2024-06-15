import Connect from './pages/Connect';
import Home from './pages/Home';
import Authorization from './pages/Authorization';
import ProfilesList from './pages/ProfilesList';
import ProfilesManage from './pages/ProfilesManage';
import NFTDetails from './pages/NFTDetails';
import NFTList from './pages/NFTDetails';


const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/connect',
    component: Connect,
  },
  {
    path: '/profiles-manage',
    component: ProfilesManage,
  },
  {
    path: '/profiles',
    component: ProfilesList,
  },
  {
    path: '/auth',
    component: Authorization,
  },
  {
    path: '/nft-list',
    component: NFTList,
  },
  {
    path: '/nft',
    component: NFTDetails,
  },
];

export default routes;
