import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice } = useCart();
  
  // Replace the empty cart section with this responsive version
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#EBEBD3] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-16">
          <div className="bg-[#FE49AF]/10 rounded-xl p-6 sm:p-8 md:p-12 text-center max-w-2xl mx-auto">
            <div className="flex justify-center">
              <svg 
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-[#67246A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </div>
            <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-[#121769]">
              Your cart is empty
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#67246A]">
              Add some products to your cart to see them here.
            </p>
            <Link
              to="/products"
              className="inline-block mt-6 sm:mt-8 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium text-[#EBEBD3] bg-[#FE49AF] shadow-[0_4px_6px_rgba(254,73,175,0.3)] hover:shadow-[0_6px_12px_rgba(254,73,175,0.4)] transition-all duration-300 text-sm sm:text-base"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Replace the main cart section with this responsive version
  return (
    <div className="min-h-screen bg-[#EBEBD3]">
      {/* Add navbar spacing with responsive padding */}
      <div className="pt-24 sm:pt-24 lg:pt-28"> {/* This pushes content below navbar */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto pb-12 sm:pb-16">
            {/* Cart Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 md:mb-10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121769]">
                Your Cart
              </h1>
              <span className="mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium bg-[#FE49AF] text-[#EBEBD3]">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Cart Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Cart Items Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0_2px_10px_rgba(103,36,106,0.1)]">
                  <div className="space-y-4 sm:space-y-6">
                    {items.map(item => (
                      <CartItem key={item.product.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary Section */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Summary Card */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0_2px_10px_rgba(103,36,106,0.1)]">
                    <h2 className="text-lg sm:text-xl font-bold text-[#121769] pb-4 border-b border-[#EBEBD3]">
                      Order Summary
                    </h2>
                    
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-[#67246A]">Subtotal</span>
                        <span className="text-[#121769] font-medium">₹{totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-[#67246A]">Shipping</span>
                        <span className="text-[#121769] font-medium">Free</span>
                      </div>
                      <div className="pt-3 mt-3 border-t border-[#EBEBD3]">
                        <div className="flex justify-between text-base sm:text-lg font-semibold">
                          <span className="text-[#121769]">Total</span>
                          <span className="text-[#FE49AF]">₹{totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-3">
                      <Link
                        to="/checkout"
                        className="block w-full py-3 sm:py-4 rounded-lg text-center font-medium text-[#EBEBD3] bg-[#FE49AF] shadow-[0_4px_6px_rgba(254,73,175,0.3)] hover:shadow-[0_6px_12px_rgba(254,73,175,0.4)] transition-all duration-300"
                      >
                        Proceed to Checkout
                      </Link>
                      <Link
                        to="/products"
                        className="block w-full py-3 sm:py-4 rounded-lg text-center font-medium text-[#67246A] border border-[#67246A] hover:bg-[#67246A]/5 transition-all duration-300"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>

                  {/* Shipping Info Card */}
                  <div className="bg-[#FE49AF]/10 border border-[#FE49AF]/20 rounded-xl p-4 sm:p-5">
                    <h3 className="flex items-center font-semibold text-[#121769]">
                      <svg className="h-5 w-5 mr-2 text-[#FE49AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                      />
                      </svg>
                      Shipping Information
                    </h3>
                    <p className="mt-2 text-sm text-[#67246A]">
                      All orders are processed within 1-2 business days. Free shipping on all orders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;