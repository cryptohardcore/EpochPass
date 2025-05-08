import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { WalletProvider, AppKitProvider } from './contexts/WalletContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppKitProvider>
      <BrowserRouter>
        <WalletProvider>
          <App />
        </WalletProvider>
      </BrowserRouter>
    </AppKitProvider>
  </StrictMode>
);