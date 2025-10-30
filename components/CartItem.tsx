
import React from 'react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../hooks/useCart';
import { useCurrency } from '../hooks/useCurrency';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { dispatch } = useCart();
  const { formatPrice } = useCurrency();

  const handleQuantityChange = (newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: newQuantity } });
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } });
  };

  return (
    <div className="flex items-start space-x-4">
      <img src={item.imageUrl} alt={item.name} className="w-24 h-32 object-cover rounded-md" />
      <div className="flex-grow">
        <h3 className="font-bold text-white">{item.edition.replace('DOLLAR X ', '')}</h3>
        <p className="text-sm text-gray-400">{formatPrice(item.price)}</p>
        <div className="flex items-center mt-2">
          <div className="flex items-center border border-gray-700 rounded-md text-sm">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 py-1" aria-live="polite">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold text-white">{formatPrice(item.price * item.quantity)}</p>
        <button onClick={handleRemove} className="text-xs text-gray-500 hover:text-ferrari-red mt-2 transition-colors">
          Remove
        </button>
      </div>
    </div>
  );
};