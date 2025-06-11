import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({
        title: "Invalid email address",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.phone.match(/^[0-9]{10}$/)) {
      toast({
        title: "Phone number must be 10 digits",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.address.trim()) {
      toast({
        title: "Address is required",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          cartItems: items.map(item => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price
          })),
          totalAmount: totalPrice
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit order');
      }

      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "We've sent you a confirmation email.",
      });
      navigate("/checkout/success");
      
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#EBEBD3]">
        <div className="pt-20 sm:pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto pb-12 sm:pb-16">
            <div className="text-center py-8 sm:py-12 px-4 sm:px-6 rounded-xl bg-[#FE49AF]/10">
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
                Add some products to your cart before proceeding to checkout.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="inline-block mt-6 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#FE49AF',
                  color: '#EBEBD3',
                  boxShadow: '0 4px 6px rgba(254, 73, 175, 0.3)'
                }}
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#EBEBD3]">
      <div className="pt-24 sm:pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pb-12 sm:pb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-10 text-[#121769]">
            Checkout
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="order-1 lg:order-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl p-4 sm:p-6 bg-white shadow-md">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 pb-2 border-b border-[#EBEBD3] text-[#121769]">
                    Order Summary
                  </h2>
                  
                  <div className="divide-y divide-[#EBEBD3]">
                    {items.map(item => (
                      <div 
                        key={item.product.id} 
                        className="py-4 flex items-center group transition-all hover:bg-gray-50 rounded-lg px-2"
                        style={{ backgroundColor: 'rgba(254, 73, 175, 0.05)' }}
                      >
                        <div 
                          className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border"
                          style={{ 
                            backgroundColor: 'white',
                            borderColor: '#EBEBD3'
                          }}
                        >
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="font-medium" style={{ color: '#121769' }}>{item.product.name}</h4>
                          <div className="flex justify-between mt-1 text-sm" style={{ color: '#67246A' }}>
                            <span>{item.quantity} × ₹{item.product.price.toFixed(2)}</span>
                            <span className="font-semibold">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-dashed mt-4 sm:mt-6 pt-4 sm:pt-6 space-y-3 border-[#EBEBD3]">
                    <div className="flex justify-between">
                      <span style={{ color: '#67246A' }}>Subtotal</span>
                      <span style={{ color: '#121769', fontWeight: '500' }}>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: '#67246A' }}>Shipping</span>
                      <span style={{ color: '#121769', fontWeight: '500' }}>Free</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-3 mt-3 border-t" style={{ borderColor: '#EBEBD3' }}>
                      <span style={{ color: '#121769' }}>Total</span>
                      <span style={{ color: '#FE49AF' }}>₹{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-xl p-4 sm:p-5 bg-[#FE49AF]/10 border border-[#FE49AF]/20">
                  <div className="flex">
                    <div 
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: 'rgba(254, 73, 175, 0.2)' }}
                    >
                      <svg 
                        className="h-5 w-5" 
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
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold" style={{ color: '#121769' }}>Order Information</h3>
                      <p className="mt-2 text-sm" style={{ color: '#67246A' }}>
                        After placing your order, a confirmation email will be sent to you and our team.
                      </p>
                    </div>
                  </div>
                  
                  <div 
                    className="mt-4 p-3 rounded-lg border border-dashed"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: 'rgba(254, 73, 175, 0.2)'
                    }}
                  >
                    <p className="text-sm italic" style={{ color: '#67246A' }}>
                      "Thank you for choosing our natural products. We appreciate your support for our handcrafted items."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-2 lg:order-2">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#121769]">
                Your Information
              </h2>
              <form 
                onSubmit={handleSubmit} 
                className="space-y-4 sm:space-y-6 p-4 sm:p-6 rounded-xl bg-white shadow-md"
              >
                <div>
                  <label htmlFor="name" className="block font-medium mb-2" style={{ color: '#67246A' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all"
                    style={{ 
                      borderColor: '#EBEBD3',
                      backgroundColor: '#EBEBD3',
                      color: '#121769',
                    }}
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-medium mb-2" style={{ color: '#67246A' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all"
                    style={{ 
                      borderColor: '#EBEBD3',
                      backgroundColor: '#EBEBD3',
                      color: '#121769',
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block font-medium mb-2" style={{ color: '#67246A' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all"
                    style={{ 
                      borderColor: '#EBEBD3',
                      backgroundColor: '#EBEBD3',
                      color: '#121769',
                    }}
                    placeholder="Your 10-digit phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block font-medium mb-2" style={{ color: '#67246A' }}>
                    Delivery Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all resize-none"
                    style={{ 
                      borderColor: '#EBEBD3',
                      backgroundColor: '#EBEBD3',
                      color: '#121769',
                    }}
                    placeholder="Your full address including city, state, and PIN code"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block font-medium mb-2" style={{ color: '#67246A' }}>
                    Additional Notes (optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all resize-none"
                    style={{ 
                      borderColor: '#EBEBD3',
                      backgroundColor: '#EBEBD3',
                      color: '#121769',
                    }}
                    placeholder="Any special instructions or requests?"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center"
                  style={{ 
                    backgroundColor: isSubmitting ? '#67246A' : '#FE49AF',
                    color: '#EBEBD3',
                    boxShadow: '0 4px 6px rgba(254, 73, 175, 0.3)'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg 
                        className="animate-spin -ml-1 mr-3 h-5 w-5" 
                        style={{ color: '#EBEBD3' }}
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing Order...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;