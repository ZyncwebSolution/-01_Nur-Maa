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
    
    setIsSubmitting(true);
    
    // Create order details with formatted items for better email readability
    const orderDetails = {
      customer: formData,
      orderDate: new Date().toLocaleString(),
      items: items.map(item => ({
        product: item.product.name,
        quantity: item.quantity,
        price: item.product.price.toFixed(2),
        subtotal: (item.quantity * item.product.price).toFixed(2)
      })),
      totalPrice: totalPrice.toFixed(2)
    };
    
    try {
      // Format the email content for better readability
      const emailContent = `
        New Order from Nurmaa Website:
        
        Customer Information:
        ---------------------
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Address: ${formData.address}
        ${formData.message ? `Message: ${formData.message}` : ''}
        
        Order Details:
        -------------
        Date: ${orderDetails.orderDate}
        
        Items:
        ${items.map(item => `- ${item.product.name} (x${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}`).join('\n        ')}
        
        Total: $${totalPrice.toFixed(2)}
      `;
      
      // In a real app, you would send this to your backend or email service
      // For now, we'll just simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demonstration purposes, log the email content to console
      console.log("Email content that would be sent:", emailContent);
      console.log("Email recipient: deepacse51@gmail.com");
      
      // Clear cart after successful order
      clearCart();
      
      toast({
        title: "Order Submitted Successfully!",
        description: "Your order has been sent to deepacse51@gmail.com",
      });
      
      navigate("/checkout/success");
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // For the empty cart state, update the container padding
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
  
  // For the main checkout section, update the container structure
  return (
    <div className="min-h-screen bg-[#EBEBD3]">
      <div className="pt-20 sm:pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pb-12 sm:pb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-[#121769]">
            Checkout
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Your Information Form */}
            <div className="order-2 lg:order-1 lg:col-span-7">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold mb-6 text-[#121769]">
                    Your Information
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form Fields with Consistent Styling */}
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#67246A]">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-[#FE49AF]/20 focus:border-[#FE49AF] outline-none transition-all"
                          style={{ 
                            borderColor: '#EBEBD3',
                            backgroundColor: '#EBEBD3',
                            color: '#121769'
                          }}
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#67246A]">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-[#FE49AF]/20 focus:border-[#FE49AF] outline-none transition-all"
                          style={{ 
                            borderColor: '#EBEBD3',
                            backgroundColor: '#EBEBD3',
                            color: '#121769'
                          }}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2 text-[#67246A]">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-[#FE49AF]/20 focus:border-[#FE49AF] outline-none transition-all"
                          style={{ 
                            borderColor: '#EBEBD3',
                            backgroundColor: '#EBEBD3',
                            color: '#121769'
                          }}
                          placeholder="Your phone number"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-2 text-[#67246A]">
                          Delivery Address
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-[#FE49AF]/20 focus:border-[#FE49AF] outline-none transition-all resize-none"
                          style={{ 
                            borderColor: '#EBEBD3',
                            backgroundColor: '#EBEBD3',
                            color: '#121769'
                          }}
                          placeholder="Your full address"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2 text-[#67246A]">
                          Additional Notes (optional)
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-[#FE49AF]/20 focus:border-[#FE49AF] outline-none transition-all resize-none"
                          style={{ 
                            borderColor: '#EBEBD3',
                            backgroundColor: '#EBEBD3',
                            color: '#121769'
                          }}
                          placeholder="Any special instructions or requests?"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-medium text-white transition-all duration-300 hover:shadow-lg disabled:opacity-70"
                      style={{ 
                        backgroundColor: isSubmitting ? '#67246A' : '#FE49AF',
                        boxShadow: '0 4px 6px rgba(254, 73, 175, 0.3)'
                      }}
                    >
                      {isSubmitting ? 'Processing...' : 'Place Order'}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-1 lg:order-2 lg:col-span-5">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <h2 className="text-xl font-semibold mb-6 text-[#121769]">
                      Order Summary
                    </h2>
                    
                    <div className="space-y-4">
                      {items.map(item => (
                        <div 
                          key={item.product.id} 
                          className="flex items-center p-3 rounded-xl transition-all"
                          style={{ backgroundColor: 'rgba(254, 73, 175, 0.05)' }}
                        >
                          <div className="w-20 h-20 rounded-xl border-2 border-[#EBEBD3] overflow-hidden">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h4 className="font-medium text-[#121769]">{item.product.name}</h4>
                            <div className="flex justify-between mt-2 text-sm">
                              <span className="text-[#67246A]">
                                {item.quantity} × ₹{item.product.price.toFixed(2)}
                              </span>
                              <span className="font-semibold text-[#121769]">
                                ₹{(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total Calculation */}
                    <div className="mt-6 pt-6 border-t border-dashed border-[#EBEBD3]">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#67246A]">Subtotal</span>
                          <span className="font-medium text-[#121769]">₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#67246A]">Shipping</span>
                          <span className="font-medium text-[#121769]">Free</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold pt-3 mt-3 border-t border-[#EBEBD3]">
                          <span className="text-[#121769]">Total</span>
                          <span className="text-[#FE49AF]">₹{totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Information Box */}
                <div className="rounded-2xl p-6 bg-[#FE49AF]/10 border border-[#FE49AF]/20">
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
                        After placing your order, a confirmation email will be sent to Nurmaa's team at 
                        <span className="font-medium" style={{ color: '#FE49AF' }}> deepacse51@gmail.com</span>. 
                        They will contact you to confirm delivery details.
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
                      "Thank you for choosing Nurmaa's natural products. We appreciate your support for our handcrafted items."
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

export default Checkout;