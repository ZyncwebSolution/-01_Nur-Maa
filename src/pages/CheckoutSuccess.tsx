
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="pt-24 pb-16 nurmaa-container">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-nurmaa-green bg-opacity-10 rounded-full mb-8">
          <svg 
            className="h-12 w-12 text-nurmaa-green" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Thank You for Your Order!</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Your order has been successfully placed. Nurmaa's team has received your order details and will be in touch with you soon.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
          <ol className="space-y-4 text-gray-600">
            <li className="flex">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-nurmaa-green text-white rounded-full mr-3 flex-shrink-0">1</span>
              <p>Nurmaa's team will review your order and contact you to confirm details.</p>
            </li>
            <li className="flex">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-nurmaa-green text-white rounded-full mr-3 flex-shrink-0">2</span>
              <p>Your handmade products will be carefully prepared just for you.</p>
            </li>
            <li className="flex">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-nurmaa-green text-white rounded-full mr-3 flex-shrink-0">3</span>
              <p>Delivery arrangements will be made based on your location and preferences.</p>
            </li>
          </ol>
        </div>
        
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <Link to="/products" className="btn-primary block md:inline-block">
            Continue Shopping
          </Link>
          <Link to="/" className="btn-outlined block md:inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
