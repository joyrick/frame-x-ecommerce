
import React from 'react';
import { useCart } from '../hooks/useCart';
import { CartItem } from './CartItem';
import { useCurrency } from '../hooks/useCurrency';
import { useLanguage } from '../context/LanguageContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state } = useCart();
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // If cart has only one type of product, use quantity parameter
    if (state.items.length === 1) {
      const item = state.items[0];
      const quantity = item.quantity;
      
      // Different payment links for different products
      const paymentLinks: { [key: string]: string } = {
        'ferrari-dxfe-001': 'https://buy.stripe.com/test_bJe14n1H832055s8Vp87K00',
        'lamborghini-dxle-001': 'https://buy.stripe.com/test_bJe14n1H832055s8Vp87K00', // Replace with actual Lamborghini link
        'porsche-dxpe-001': 'https://buy.stripe.com/test_bJe14n1H832055s8Vp87K00' // Replace with actual Porsche link
      };
      
      const baseUrl = paymentLinks[item.id] || paymentLinks['ferrari-dxfe-001'];
      const clientReferenceId = `${item.id}_qty${quantity}_${Date.now()}`;
      const checkoutUrl = `${baseUrl}?quantity=${quantity}&client_reference_id=${clientReferenceId}`;
      
      window.open(checkoutUrl, '_blank');
    } else {
      // For multiple products, create a summary in client_reference_id
      const orderSummary = state.items.map(item => `${item.id.split('-')[0]}_${item.quantity}`).join('_');
      const totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      const clientReferenceId = `multi_${orderSummary}_${Date.now()}`;
      
      // Use Ferrari link as default for mixed carts (you might want to create a "mixed" payment link)
      const checkoutUrl = `https://buy.stripe.com/test_bJe14n1H832055s8Vp87K00?quantity=${totalQuantity}&client_reference_id=${clientReferenceId}`;
      
      window.open(checkoutUrl, '_blank');
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-dark/90 backdrop-blur-lg shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 id="cart-heading" className="text-2xl font-bold">{t('cart.title')}</h2>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white" aria-label="Close cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <p className="text-gray-400 text-center mt-8">{t('cart.empty')}</p>
            ) : (
              <div className="space-y-6">
                {state.items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {state.items.length > 0 && (
            <div className="p-6 border-t border-gray-800 bg-brand-dark/80">
              <div className="flex justify-between items-center mb-4 text-lg">
                <span className="font-semibold text-gray-300">{t('cart.subtotal')}</span>
                <span className="font-bold text-white">{formatPrice(subtotal)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-ferrari-red text-white font-bold text-lg uppercase py-4 rounded-md transition-colors duration-200 hover:bg-red-700 flex items-center justify-center"
              >
                {t('cart.checkout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};