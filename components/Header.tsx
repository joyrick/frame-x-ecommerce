import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useCurrency } from '../hooks/useCurrency';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { state } = useCart();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const { currency, setCurrency, rates } = useCurrency();
  const { language, setLanguage, t } = useLanguage();
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const currencyButtonRef = useRef<HTMLButtonElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const [languageDropdownPosition, setLanguageDropdownPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
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
      <div className="bg-brand-dark/80 backdrop-blur-lg text-gray-400 relative z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-8 text-xs font-medium">
            {/* Left links */}
            <nav className="hidden md:flex items-center space-x-6 tracking-wider uppercase">
              <a href="https://www.humornedarceky.sk/o-nas" className="hover:text-white transition-colors">{t('header.about')}</a>
              <a href="https://www.humornedarceky.sk/ochrana-osobnych-udajov3" className="flex items-center gap-1 hover:text-white transition-colors">
                <span>{t('header.terms')}</span>
                <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.humornedarceky.sk/kontakty" className="hover:text-white transition-colors">{t('header.contact')}</a>
              <a href="https://www.humornedarceky.sk/velkoobchodny-predaj" className="hover:text-white transition-colors">{t('header.wholesale')}</a>
            </nav>

            {/* Right items */}
            <div className="flex items-center space-x-6 ml-auto">
              {/* Language Switcher */}
              <div className="relative z-[100]" ref={languageDropdownRef}>
                <button 
                  ref={languageButtonRef}
                  onClick={() => {
                    if (languageButtonRef.current) {
                      const rect = languageButtonRef.current.getBoundingClientRect();
                      setLanguageDropdownPosition({
                        top: rect.bottom + 8,
                        right: window.innerWidth - rect.right
                      });
                    }
                    setIsLanguageDropdownOpen(prev => !prev);
                  }}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2h-.57l-2.05 6.14c-.1.3-.35.5-.65.5s-.55-.2-.65-.5L5.57 6H5a1 1 0 110-2h3V3a1 1 0 011-1zm0 2v1h1V4H7z" clipRule="evenodd" />
                    <path d="M11.62 7.12L13 11h1l1.38-3.88c.16-.44.62-.72 1.12-.62.5.1.8.56.7 1.06L15.38 14h-1.76L12 10.12 10.38 14H8.62l-1.82-6.44c-.1-.5.2-.96.7-1.06.5-.1.96.18 1.12.62z" />
                  </svg>
                  <span className="font-semibold tracking-wider uppercase">{language}</span>
                  <svg className={`h-3 w-3 transform transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <ul 
                  className={`fixed w-24 bg-gray-950 border border-gray-800 rounded-md shadow-lg py-1 z-[999] origin-top-right transition-all duration-200 ease-out ${isLanguageDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                  style={{
                    top: `${languageDropdownPosition.top}px`,
                    right: `${languageDropdownPosition.right}px`
                  }}
                >
                  <li>
                    <button
                      onClick={() => {
                        setLanguage('sk');
                        setIsLanguageDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-900 hover:text-white transition-colors flex items-center gap-2"
                    >
                      🇸🇰 SK
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setIsLanguageDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-900 hover:text-white transition-colors flex items-center gap-2"
                    >
                      🇬🇧 EN
                    </button>
                  </li>
                </ul>
              </div>
              
              {/* Currency Switcher */}
              <div className="relative z-[100]" ref={currencyDropdownRef}>
                <button 
                  ref={currencyButtonRef}
                  onClick={() => {
                    if (currencyButtonRef.current) {
                      const rect = currencyButtonRef.current.getBoundingClientRect();
                      setDropdownPosition({
                        top: rect.bottom + 8,
                        right: window.innerWidth - rect.right
                      });
                    }
                    setIsCurrencyDropdownOpen(prev => !prev);
                  }}
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
                 <ul 
                  className={`fixed w-24 bg-gray-950 border border-gray-800 rounded-md shadow-lg py-1 z-[999] origin-top-right transition-all duration-200 ease-out ${isCurrencyDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                  style={{
                    top: `${dropdownPosition.top}px`,
                    right: `${dropdownPosition.right}px`
                  }}
                 >
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
              {/* Login link hidden as requested */}
              <a href="#" className="hidden flex items-center gap-2 hover:text-white transition-colors">
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
      <div className="bg-brand-dark/80 backdrop-blur-lg relative z-10">
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