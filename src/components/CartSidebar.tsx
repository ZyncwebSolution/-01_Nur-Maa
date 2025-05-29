
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';

const CartSidebar: React.FC = () => {
  const { items, totalItems, totalPrice, isCartOpen, toggleCart } = useCart();
  
  if (!isCartOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={toggleCart}
      />
      
      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl flex flex-col z-10">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg">Your Cart ({totalItems})</h2>
          <button onClick={toggleCart} className="p-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              <h3 className="mt-4 text-gray-500 font-medium">Your cart is empty</h3>
              <p className="mt-2 text-gray-400 text-sm">
                Add some products to your cart to see them here.
              </p>
              <button
                onClick={toggleCart} 
                className="mt-4 btn-primary py-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="btn-primary w-full flex items-center justify-center"
              onClick={toggleCart}
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={toggleCart}
              className="w-full text-center mt-4 text-nurmaa-green hover:text-nurmaa-dark transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
