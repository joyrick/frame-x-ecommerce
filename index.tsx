import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </CurrencyProvider>
  </React.StrictMode>
);