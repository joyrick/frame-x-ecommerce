import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useCurrency } from '../hooks/useCurrency';
import { useLanguage } from '../context/LanguageContext';

interface MockStripeCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const MockStripeCheckout: React.FC<MockStripeCheckoutProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const { state } = useCart();
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.21; // 21% VAT
  const total = subtotal + tax;

  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/28',
    cvc: '123',
    name: 'John Doe',
    address: '123 Main Street',
    city: 'New York',
    zip: '10001',
    country: 'US'
  });

  useEffect(() => {
    if (isOpen) {
      setCurrentStep('checkout');
      setIsProcessing(false);
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setCurrentStep('processing');

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setCurrentStep('success');
    
    // Auto-close and trigger success after showing success state
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#635bff] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{t('stripe.title')}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
            disabled={isProcessing}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {currentStep === 'checkout' && (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Payment Form */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{t('stripe.paymentDetails')}</h3>
                  
                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('stripe.email')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  {/* Card Number */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('stripe.cardNumber')}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                        placeholder="1234 1234 1234 1234"
                        maxLength={19}
                      />
                      <div className="absolute right-3 top-3 flex space-x-1">
                        <div className="w-6 h-4 bg-blue-600 rounded-sm"></div>
                        <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* Expiry and CVC */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('stripe.expiryDate')}
                      </label>
                      <input
                        type="text"
                        value={formData.expiry}
                        onChange={(e) => handleInputChange('expiry', e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('stripe.cvc')}
                      </label>
                      <input
                        type="text"
                        value={formData.cvc}
                        onChange={(e) => handleInputChange('cvc', e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('stripe.cardholderName')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-900">{t('stripe.billingAddress')}</h4>
                    
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                      placeholder={t('stripe.address')}
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                        placeholder={t('stripe.city')}
                        required
                      />
                      <input
                        type="text"
                        value={formData.zip}
                        onChange={(e) => handleInputChange('zip', e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                        placeholder={t('stripe.zip')}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('stripe.orderSummary')}</h3>
                
                <div className="space-y-3">
                  {state.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-gray-500">{item.edition}</div>
                        <div className="text-gray-500">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-gray-900 font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('cart.subtotal')}</span>
                    <span className="text-gray-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('stripe.tax')}</span>
                    <span className="text-gray-900">{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-gray-900">{t('stripe.total')}</span>
                      <span className="text-gray-900">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-6 bg-[#635bff] text-white py-3 px-4 rounded-md font-medium hover:bg-[#5a52f5] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t('stripe.pay')} {formatPrice(total)}
                </button>

                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <span>{t('stripe.secured')}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    {t('stripe.encrypted')}
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {currentStep === 'processing' && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 border-4 border-[#635bff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('stripe.processing')}</h3>
            <p className="text-gray-600">{t('stripe.doNotClose')}</p>
          </div>
        )}

        {currentStep === 'success' && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('stripe.success')}</h3>
            <p className="text-gray-600">{t('stripe.confirmed')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
