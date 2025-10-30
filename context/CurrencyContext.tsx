import React, { createContext, useState, ReactNode, useMemo } from 'react';

type Currency = 'EUR' | 'USD' | 'GBP';
type Rates = { [key in Currency]: number };
type Symbols = { [key in Currency]: string };

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  rates: Rates;
  formatPrice: (price: number) => string;
}

const rates: Rates = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
};

const symbols: Symbols = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('EUR');

  const formatPrice = useMemo(() => (price: number) => {
    const convertedPrice = price * rates[currency];
    const symbol = symbols[currency];

    // Format with symbol placement based on currency
    if (currency === 'EUR') {
      return `${convertedPrice.toFixed(2).replace('.', ',')} ${symbol}`;
    }
    return `${symbol}${convertedPrice.toFixed(2)}`;
  }, [currency]);
  
  const value = {
    currency,
    setCurrency,
    rates,
    formatPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};