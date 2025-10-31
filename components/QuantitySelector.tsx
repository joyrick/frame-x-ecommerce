
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity }) => {
  const { t } = useLanguage();
  const decrement = () => setQuantity(Math.max(1, quantity - 1));
  const increment = () => setQuantity(quantity + 1);

  return (
    <div className="flex items-center border border-gray-700 rounded-md">
      <button
        onClick={decrement}
        className="px-4 py-3 text-gray-400 hover:text-white transition-colors duration-200"
        aria-label={t('product.decrease')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </button>
      <span className="px-4 py-3 text-lg font-semibold w-16 text-center">{quantity}</span>
      <button
        onClick={increment}
        className="px-4 py-3 text-gray-400 hover:text-white transition-colors duration-200"
        aria-label={t('product.increase')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};
