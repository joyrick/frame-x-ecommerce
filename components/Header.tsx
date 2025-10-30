import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useCurrency } from '../hooks/useCurrency';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { state } = useCart();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const { currency, setCurrency, rates } = useCurrency();
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20">
      {/* Top Info Bar */}
      <div className="bg-brand-dark/80 backdrop-blur-lg text-gray-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-8 text-xs font-medium">
            {/* Left links */}
            <nav className="hidden md:flex items-center space-x-6 tracking-wider uppercase">
              <a href="#" className="hover:text-white transition-colors">O nás</a>
              <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
                <span>Obchodné podmienky</span>
                <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">Kontakty</a>
              <a href="#" className="hover:text-white transition-colors">Veľkoobchodný predaj</a>
            </nav>

            {/* Right items */}
            <div className="flex items-center space-x-6 ml-auto">
              <div className="relative" ref={currencyDropdownRef}>
                <button 
                  onClick={() => setIsCurrencyDropdownOpen(prev => !prev)}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 4C5.58 4 2 4.89 2 6s3.58 2 8 2 8-.89 8-2-3.58-2-8-2z" />
                      <path d="M10 8c-4.42 0-8 .89-8 2s3.58 2 8 2 8-.89 8-2-3.58-2-8-2zm0 4c-4.42 0-8 .89-8 2s3.58 2 8 2 8-.89 8-2-3.58-2-8-2z" />
                  </svg>
                  <span className="font-semibold tracking-wider">{currency}</span>
                  <svg className={`h-3 w-3 transform transition-transform duration-200 ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                 <ul className={`absolute right-0 mt-2 w-24 bg-gray-950 border border-gray-800 rounded-md shadow-lg py-1 z-30 origin-top-right transition-all duration-200 ease-out ${isCurrencyDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    {Object.keys(rates).map((curr) => (
                      <li key={curr}>
                        <button
                          onClick={() => {
                            setCurrency(curr as keyof typeof rates);
                            setIsCurrencyDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
                        >
                          {curr}
                        </button>
                      </li>
                    ))}
                  </ul>
              </div>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="tracking-wide">Prihlásenie</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-brand-dark/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <svg className="w-8 h-8 text-ferrari-red" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20V6H4V4ZM4 8H20V16H4V8ZM6 10V14H18V10H6ZM4 18H20V20H4V18Z" fill="currentColor"/>
              </svg>
              <span className="text-2xl font-bold tracking-wider">FRAME X</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Open cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-ferrari-red text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};