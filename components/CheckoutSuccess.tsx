import React from 'react';

interface CheckoutSuccessProps {
  onContinueShopping: () => void;
}

export const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({ onContinueShopping }) => {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-brand-dark/80 backdrop-blur-lg rounded-lg border border-gray-800 p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-gray-400">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={onContinueShopping}
            className="w-full bg-ferrari-red text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 hover:bg-red-700"
          >
            Continue Shopping
          </button>
          
          <button
            onClick={() => window.print()}
            className="w-full border border-gray-600 text-gray-300 font-medium py-3 px-6 rounded-md transition-colors duration-200 hover:bg-gray-800 hover:text-white"
          >
            Print Receipt
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-500">
            You will receive an email confirmation shortly with your order details.
          </p>
        </div>
      </div>
    </div>
  );
};
