import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { OmnistonProvider } from "@ston-fi/omniston-sdk-react";
import { type FC, useEffect, useMemo } from 'react';

import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';

const OMNISTON_API_URL = "wss://omni-ws.ston.fi";

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === 'debug';
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <OmnistonProvider apiUrl={OMNISTON_API_URL}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
          <SDKProvider acceptCustomStyles debug={debug}>
            <App/>
          </SDKProvider>
      </TonConnectUIProvider>
    </OmnistonProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner/>
  </ErrorBoundary>
);
