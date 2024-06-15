import React from 'react';
import './App.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import AppRoutes from './AppRoutes';
import { Router, useRouter } from './components/Router';
import eruda from 'eruda';
eruda.init();

const manifestFile = 'https://raw.githubusercontent.com/real-og/traction-eye-bot/master/tonconnect-manifest.json';
function App() {
  return (
   <TonConnectUIProvider manifestUrl={manifestFile} actionsConfiguration={{ twaReturnUrl:'/'}}>
      <Router>
        <AppRoutes/>
      </Router>
    </TonConnectUIProvider>
  );
}

export default App;
