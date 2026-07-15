import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { NodeProvider } from './contexts/node-context';
import { ThemeProvider } from './providers/theme-provider';
import { I18nProvider } from './i18n';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <ThemeProvider>
        <NodeProvider>
          <App />
        </NodeProvider>
      </ThemeProvider>
    </I18nProvider>
  </React.StrictMode>,
);