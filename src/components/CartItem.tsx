
import React from 'react';
import { useCart } from '@/context/CartContext';
import { CartItem as CartItemType } from '@/lib/types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(product.id, newQuantity);
    }
  };
  
  return (
    <div className="flex items-center py-4 border-b">
      <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h4 className="font-medium">{product.name}</h4>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:text-nurmaa-green"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="px-2 py-1 text-gray-700">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:text-nurmaa-green"
              aria-label="Increase quantity"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          <div className="text-right">
            <span className="font-semibold">₹{(product.price * quantity).toFixed(2)}</span>
            <button 
              onClick={() => removeItem(product.id)}
              className="ml-4 text-gray-400 hover:text-red-500"
              aria-label="Remove item"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
