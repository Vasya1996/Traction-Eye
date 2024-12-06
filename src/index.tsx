import './buffer-polyfill';

import ReactDOM from 'react-dom/client';

import { Root } from '@/components/Root';
import ReactGA from "react-ga4";

ReactGA.initialize("G-F7VJLGRX7L");

// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
import './mockEnv.ts';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<Root/>);
