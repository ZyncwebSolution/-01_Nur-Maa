
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
            Add some products to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary mt-6 animate-scale-in-out hover:animate-none"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16 lotus-bg">
      <div className="nurmaa-container">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Customer Information Form */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Your Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
              <div>
                <label htmlFor="name" className="block font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block font-medium mb-2">
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Your full address"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block font-medium mb-2">
                  Additional Notes (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Any special instructions or requests?"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isSubmitting ? (
                  <>
                    <svg 
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
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
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 text-nurmaa-purple">Order Summary</h2>
              
              <div className="divide-y">
                {items.map(item => (
                  <div key={item.product.id} className="py-4 flex items-center group transition-all hover:bg-gray-50 rounded-lg px-2">
                    <div className="w-16 h-16 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <div className="flex justify-between mt-1 text-sm text-gray-600">
                        <span>{item.quantity} × ${item.product.price.toFixed(2)}</span>
                        <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-dashed border-gray-200 mt-6 pt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-nurmaa-purple">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-nurmaa-purple bg-opacity-10 rounded-xl p-5 border border-nurmaa-purple/20">
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-nurmaa-purple/20">
                  <svg 
                    className="h-5 w-5 text-nurmaa-purple" 
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
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-nurmaa-dark">Order Information</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    After placing your order, a confirmation email will be sent to Nurmaa's team at 
                    <span className="font-medium text-nurmaa-purple"> deepacse51@gmail.com</span>. 
                    They will contact you to confirm delivery details.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 bg-white p-3 rounded-lg border border-dashed border-nurmaa-purple/20">
                <p className="text-sm text-gray-600 italic">
                  "Thank you for choosing Nurmaa's natural products. We appreciate your support for our handcrafted items."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
