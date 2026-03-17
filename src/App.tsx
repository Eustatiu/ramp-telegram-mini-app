import { useEffect, useRef } from 'react';
import { useLaunchParams, miniApp } from '@telegram-apps/sdk-react';
import { useTelegramNavigation } from './hooks/useTelegramNavigation';
import { parseStartParam, type StartConfig } from './lib/start-param';
import { generateCustomerId } from './lib/customer-id';
import './styles/telegram.css';

const API_URL = import.meta.env.VITE_API_URL;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const ASSET_BASE_URL = import.meta.env.VITE_ASSET_BASE_URL;

function useTelegramContext(): { locale: string; startConfig: StartConfig } {
  try {
    const lp = useLaunchParams();
    const initData = lp.initData as Record<string, any> | undefined;
    const locale = initData?.user?.languageCode || 'en';
    const startConfig = parseStartParam(lp.startParam as string | undefined);
    return { locale, startConfig };
  } catch {
    return { locale: 'en', startConfig: {} };
  }
}

function closeMiniApp(): void {
  try {
    miniApp.close();
  } catch { /* graceful fallback when not in telegram context */ }
}

export function App() {
  const formRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const customerIdRef = useRef(generateCustomerId());
  const { locale, startConfig } = useTelegramContext();

  useTelegramNavigation();

  useEffect(() => {
    if (!formRef.current || mountedRef.current) return;
    if (typeof NowRampForm === 'undefined') return;

    NowRampForm.mount(formRef.current, {
      projectId: PROJECT_ID,
      apiUrl: API_URL,
      assetBaseUrl: ASSET_BASE_URL,
      customerId: customerIdRef.current,
      flowType: startConfig.flowType ?? 'buy',
      defaultFiatAmount: '250',
      defaultCryptoCurrency: startConfig.crypto,
      defaultNetwork: startConfig.network,
      locale,
      theme: 'dark',
      borderRadius: '10px',
      showFlowToggle: true,
      showThemeToggle: false,
      doneButtonText: 'Close',
      onDone: closeMiniApp,
      onComplete: closeMiniApp,
    });

    mountedRef.current = true;
  }, []);

  return (
    <div className="tg-mini-app">
      <div id="nowramp-form" ref={formRef} />
    </div>
  );
}
