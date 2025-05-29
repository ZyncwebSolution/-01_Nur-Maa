
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 nurmaa-container">
        <div className="text-center py-12">
          <svg 
            className="mx-auto h-16 w-16 text-gray-400"
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
          <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-4 text-gray-600">
            Add some products to your cart to see them here.
          </p>
          <Link
            to="/products"
            className="btn-primary mt-6 inline-block"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="nurmaa-container">
        <h1 className="text-3xl font-bold mb-8">Your Cart ({totalItems} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-6">
                {items.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="btn-primary w-full mt-6 animate-pulse-gentle hover:animate-none"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                to="/products"
                className="btn-outlined w-full mt-4 hover:bg-nurmaa-mint/50 transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
            
            <div className="bg-nurmaa-mint bg-opacity-40 rounded-xl p-5 mt-6">
              <h3 className="font-medium flex items-center text-nurmaa-dark">
                <svg 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                Shipping Information
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                All orders are processed within 1-2 business days. Free shipping on all orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
