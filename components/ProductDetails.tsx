
import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { QuantitySelector } from './QuantitySelector';
import { AddToCartButton } from './AddToCartButton';
import { useCart } from '../hooks/useCart';
import { ProductGallery } from './ProductGallery';
import { useCurrency } from '../hooks/useCurrency';

interface ProductDetailsProps {
  product: Product;
  products: Product[];
  onEditionChange: (id: string) => void;
  onAddToCart: () => void;
  galleryImages: string[];
  activeImageUrl: string;
  onGalleryImageClick: (imageUrl: string) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  products, 
  onEditionChange, 
  onAddToCart,
  galleryImages,
  activeImageUrl,
  onGalleryImageClick
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useCart();
  const { formatPrice } = useCurrency();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
    onAddToCart();
    setQuantity(1); // Reset quantity after adding
  };
  
  const handleSelectEdition = (id: string) => {
    onEditionChange(id);
    setIsDropdownOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="flex flex-col space-y-6 max-w-lg">
      <div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">{product.name}</h1>
        <p className="text-lg font-semibold text-ferrari-red mt-1 tracking-widest">{product.edition}</p>
      </div>
      <p className="text-gray-300 leading-relaxed">{product.description}</p>
      
      <div>
        <label htmlFor="edition-select-button" className="block text-sm font-medium text-gray-400 mb-2">Select Edition</label>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            id="edition-select-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative w-full bg-black/25 border border-gray-800 rounded-md py-3 px-4 text-white text-left focus:outline-none focus:ring-2 focus:ring-ferrari-red focus:border-ferrari-red transition-colors"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <span className="block truncate">{product.edition.replace('DOLLAR X ', '')}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
          
          <ul
            className={`absolute z-10 mt-1 w-full bg-gray-950 border border-gray-800 shadow-lg rounded-md max-h-60 overflow-auto focus:outline-none transform origin-top transition-all duration-200 ease-out ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            role="listbox"
            aria-hidden={!isDropdownOpen}
          >
            {products.map((p) => (
              <li
                key={p.id}
                role="option"
                aria-selected={p.id === product.id}
                onClick={() => handleSelectEdition(p.id)}
                className="cursor-pointer select-none relative py-3 pl-4 pr-9 text-white hover:bg-gray-900 transition-colors"
              >
                <span className={`block truncate ${p.id === product.id ? 'font-semibold' : 'font-normal'}`}>{p.edition.replace('DOLLAR X ', '')}</span>
                {p.id === product.id && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-ferrari-red">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ProductGallery 
        images={galleryImages} 
        onImageClick={onGalleryImageClick} 
        activeImageUrl={activeImageUrl}
      />

      <div className="text-4xl font-bold text-white tracking-wide">
        {formatPrice(product.price * quantity)}
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        <AddToCartButton onClick={handleAddToCart} />
      </div>
    </div>
  );
};