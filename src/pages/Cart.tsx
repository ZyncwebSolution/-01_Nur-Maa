import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen" style={{ backgroundColor: '#EBEBD3' }}>
        <div className="nurmaa-container">
          <div className="text-center py-16 px-4 rounded-xl" style={{ backgroundColor: 'rgba(254, 73, 175, 0.1)' }}>
            <div className="flex justify-center">
              <svg 
                className="h-20 w-20"
                fill="none"
                viewBox="0 0 24 24"
                style={{ color: '#67246A' }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold" style={{ color: '#121769' }}>Your cart is empty</h2>
            <p className="mt-4 text-lg" style={{ color: '#67246A' }}>
              Add some products to your cart to see them here.
            </p>
            <Link
              to="/products"
              className="inline-block mt-6 px-6 py-3 rounded-lg font-medium transition-all duration-300"
              style={{ 
                backgroundColor: '#FE49AF',
                color: '#EBEBD3',
                boxShadow: '0 4px 6px rgba(254, 73, 175, 0.3)'
              }}
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16 min-h-screen" style={{ backgroundColor: '#EBEBD3' }}>
      <div className="nurmaa-container">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#121769' }}>Your Cart</h1>
          <span 
            className="ml-3 px-3 py-1 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: '#FE49AF',
              color: '#EBEBD3'
            }}
          >
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div 
              className="rounded-xl p-6"
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 2px 10px rgba(103, 36, 106, 0.1)'
              }}
            >
              <div className="space-y-6">
                {items.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div 
              className="rounded-xl p-6 sticky top-24"
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 2px 10px rgba(103, 36, 106, 0.1)'
              }}
            >
              <h2 className="text-xl font-bold mb-6 pb-2 border-b" style={{ 
                color: '#121769',
                borderColor: '#EBEBD3'
              }}>
                Order Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span style={{ color: '#67246A' }}>Subtotal</span>
                  <span style={{ color: '#121769', fontWeight: '500' }}>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#67246A' }}>Shipping</span>
                  <span style={{ color: '#121769', fontWeight: '500' }}>Free</span>
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between text-lg">
                  <span style={{ color: '#121769', fontWeight: '600' }}>Total</span>
                  <span style={{ color: '#FE49AF', fontWeight: '600' }}>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="block w-full mt-6 py-3 rounded-lg text-center font-medium transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#FE49AF',
                  color: '#EBEBD3',
                  boxShadow: '0 4px 6px rgba(254, 73, 175, 0.3)'
                }}
              >
                Proceed to Checkout
              </Link>
              
              <Link
                to="/products"
                className="block w-full mt-4 py-3 rounded-lg text-center font-medium transition-all duration-300 border"
                style={{ 
                  color: '#67246A',
                  borderColor: '#67246A',
                  backgroundColor: 'transparent'
                }}
              >
                Continue Shopping
              </Link>
            </div>
            
            {/* Shipping Info */}
            <div 
              className="rounded-xl p-5 mt-6"
              style={{ 
                backgroundColor: 'rgba(254, 73, 175, 0.1)',
                border: '1px solid rgba(254, 73, 175, 0.2)'
              }}
            >
              <h3 className="font-semibold flex items-center" style={{ color: '#121769' }}>
                <svg 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  style={{ color: '#FE49AF' }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                  />
                </svg>
                Shipping Information
              </h3>
              <p className="mt-2 text-sm" style={{ color: '#67246A' }}>
                All orders are processed within 1-2 business days. Free shipping on all orders.
              </p>
            </div>

            {/* Payment Info */}
            {/* <div 
              className="rounded-xl p-5 mt-4"
              style={{ 
                backgroundColor: 'rgba(18, 23, 105, 0.05)',
                border: '1px solid rgba(18, 23, 105, 0.1)'
              }}
            >
              <h3 className="font-semibold flex items-center" style={{ color: '#121769' }}>
                <svg 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  style={{ color: '#121769' }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                  />
                </svg>
                Secure Payment
              </h3>
              <p className="mt-2 text-sm" style={{ color: '#67246A' }}>
                We accept all major credit cards and PayPal. Your payment information is processed securely.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;