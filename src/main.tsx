import {
  init,
  miniApp,
  viewport,
  backButton,
} from '@telegram-apps/sdk-react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

function initializeTelegramSDK(): void {
  init();
  miniApp.mount();
  backButton.mount();
  viewport.mount().catch(Function.prototype as () => void);
  miniApp.ready();
  viewport.expand();
}

try {
  initializeTelegramSDK();
} catch (error) {
  console.warn('[telegram] sdk initialization failed — running outside telegram context', error);
}

const container = document.getElementById('root');
if (!container) throw new Error('root element not found');

ReactDOM.createRoot(container).render(<App />);
