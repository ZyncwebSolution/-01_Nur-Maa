import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';
import { X, ShoppingCart, Pyramid } from 'lucide-react';

const CartSidebar: React.FC = () => {
  const { items, totalItems, totalPrice, isCartOpen, toggleCart } = useCart();
  
  if (!isCartOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#121769] bg-opacity-70 transition-opacity"
        onClick={toggleCart}
      />
      
      {/* Cart Panel */}
      <div 
        className="fixed right-0 top-0 h-full w-full sm:w-96 flex flex-col z-10"
        style={{ backgroundColor: '#EBEBD3' }}
      >
        {/* Header with gradient border */}
        <div className="relative p-4 border-b border-[#67246A30] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Pyramid className="h-5 w-5 text-[#67246A]" />
            <h2 className="font-semibold text-lg text-[#121769]">
              Your Cart ({totalItems})
            </h2>
          </div>
          <button 
            onClick={toggleCart} 
            className="p-1 rounded-full hover:bg-[#67246A10]"
          >
            <X className="h-5 w-5 text-[#67246A]" />
          </button>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#121769] via-[#67246A] to-[#FE49AF]"></div>
        </div>
        
        {/* Cart Content */}
        <div className="flex-grow overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#12176910] mb-4">
                <ShoppingCart className="h-8 w-8 text-[#67246A]" />
              </div>
              <h3 className="text-[#121769] font-medium">Your cart is empty</h3>
              <p className="mt-1 text-[#67246A] text-sm">
                Add some products to see them here.
              </p>
              <Link
  to="/products"
  onClick={toggleCart} 
  className="mt-4 px-4 py-2 text-sm font-medium rounded-md transition-colors"
  style={{
    background: 'linear-gradient(to right, #121769, #67246A)',
    color: '#EBEBD3'
  }}
>
  Continue Shopping
</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 border-t border-[#67246A30]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#121769]">Subtotal</span>
              <span className="font-semibold text-[#67246A]">₹{totalPrice.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="block w-full px-4 py-2 text-center font-medium rounded-md transition-colors mb-2"
              onClick={toggleCart}
              style={{
                background: 'linear-gradient(to right, #121769, #67246A)',
                color: '#EBEBD3'
              }}
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={toggleCart}
              className="w-full text-center text-sm text-[#67246A] hover:text-[#121769] transition-colors"
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