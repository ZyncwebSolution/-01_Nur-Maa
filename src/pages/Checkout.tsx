import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import WAConnect from '@wppconnect/wa-js';
import Chatbot from '@/components/Chatbot';

// WhatsApp business number
const WHATSAPP_NUMBER = '918667212177'; // Replace with your business number

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
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.phone || !formData.address) {
        throw new Error('Please fill in all required fields');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(formData.phone)) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      // Format order details for both email and WhatsApp
      const orderItems = items.map(item => 
        `${item.product.name} (₹${item.product.price.toFixed(2)} x ${item.quantity})`
      ).join('\n');

      const orderSummary = `
*New Order from ${formData.name}*
------------------
*Order ID:* NM-${Date.now()}
*Customer Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}

*Order Items:*
${orderItems}

*Total Amount:* ₹${totalPrice.toFixed(2)}

*Additional Notes:*
${formData.message || 'No additional notes'}
      `;

      // Send email via FormSubmit (like Contact page)
      const emailResponse = await fetch('https://formsubmit.co/ajax/diyweboffi@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          message: formData.message || 'No additional notes',
          order_items: orderItems,
          order_total: `₹${totalPrice.toFixed(2)}`,
          order_id: `NM-${Date.now()}`,
          subject: `Nurmaa Order: NM-${Date.now()}`,
        }),
      });

      // WhatsApp message (keep as is)
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderSummary)}`;
      
      if (emailResponse.ok) {
        clearCart();
        toast({
          title: "Order Placed Successfully!",
          description: "Check your email for order confirmation.",
        });
        window.open(whatsappUrl, '_blank');
        navigate("/checkout/success");
      } else {
        throw new Error('Failed to send order confirmation');
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#EBEBD3] flex items-center justify-center px-4">
        <div className="text-center bg-[#FE49AF]/10 p-10 rounded-2xl max-w-md">
          <svg className="mx-auto h-16 w-16 text-[#67246A]" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-[#121769] mt-4">Your cart is empty</h2>
          <p className="text-[#67246A] mt-2">Add some products before checking out.</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-6 px-6 py-3 bg-[#FE49AF] text-[#EBEBD3] rounded-xl shadow-md hover:shadow-lg"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBEBD3] px-4 pt-20 pb-12 sm:px-6 lg:px-8 sm:pt-24 lg:pt-28">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#121769] pt-10 mb-12">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-5 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold text-[#121769] mb-6">Your Information</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {['name', 'email', 'phone', 'address'].map(field => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-[#67246A] mb-2 capitalize">{field === 'phone' ? 'Phone Number' : field.replace('_', ' ')}</label>
                    {field !== 'address' ? (
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        id={field}
                        name={field}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#EBEBD3] bg-[#EBEBD3] text-[#121769] focus:border-[#FE49AF] focus:ring-2 focus:ring-[#FE49AF]/30 outline-none transition-all"
                        required
                      />
                    ) : (
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#EBEBD3] bg-[#EBEBD3] text-[#121769] focus:border-[#FE49AF] focus:ring-2 focus:ring-[#FE49AF]/30 outline-none transition-all resize-none"
                        required
                      />
                    )}
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#67246A] mb-2">Additional Notes</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#EBEBD3] bg-[#EBEBD3] text-[#121769] focus:border-[#FE49AF] focus:ring-2 focus:ring-[#FE49AF]/30 outline-none transition-all resize-none"
                    placeholder="Any special instructions?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-white font-semibold transition-all hover:shadow-lg disabled:opacity-70"
                  style={{ backgroundColor: isSubmitting ? '#67246A' : '#FE49AF' }}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold text-[#121769] mb-6">Order Summary</h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-4 bg-[#FE49AF]/5 p-3 rounded-xl">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl border-2 border-[#EBEBD3]" />
                    <div className="flex-1">
                      <h4 className="font-medium text-[#121769]">{item.product.name}</h4>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-[#67246A]">{item.quantity} × ₹{item.product.price.toFixed(2)}</span>
                        <span className="font-semibold text-[#121769]">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-[#EBEBD3] mt-6 pt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#67246A]">Subtotal</span>
                  <span className="text-[#121769] font-medium">₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#67246A]">Shipping</span>
                  <span className="text-[#121769] font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-[#EBEBD3] pt-3 mt-3">
                  <span className="text-[#121769]">Total</span>
                  <span className="text-[#FE49AF]">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FE49AF]/10 border border-[#FE49AF]/20">
              <h3 className="text-[#121769] font-semibold mb-2">Order Information</h3>
              <p className="text-sm text-[#67246A]">
                A confirmation email will be sent to 
                <span className="font-medium text-[#FE49AF]"> diyweboffi@gmail.com</span>.<br />
                We will contact you soon to confirm delivery.
              </p>
              <div className="mt-4 p-3 bg-white border border-dashed rounded-lg text-sm italic text-[#67246A]">
                "Thank you for choosing Nurmaa's natural products. We appreciate your support."
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Checkout;
