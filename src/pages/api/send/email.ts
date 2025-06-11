// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import emailjs from '@emailjs/nodejs';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
}

const TEMPLATE_ID = 'template_cpoou7s';
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID; // Remove NEXT_PUBLIC_ prefix
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY; // Remove NEXT_PUBLIC_ prefix

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { formData, cartItems, totalAmount } = req.body;

    const orderSummary = cartItems
      .map((item: CartItem) => 
        `${item.name} - Quantity: ${item.quantity} - Price: ₹${item.price} = ₹${item.price * item.quantity}`
      )
      .join('\n');

    const templateParams = {
      to_name: formData.name,
      from_name: 'Nur-Maa Store',
      to_email: formData.email,
      reply_to: formData.email, // Add this for reply-to functionality
      phone: formData.phone,
      address: formData.address,
      message: formData.message || 'No additional notes',
      order_summary: orderSummary,
      total_amount: `₹${totalAmount.toFixed(2)}`,
      order_id: `ORDER-${Date.now()}`,
      order_date: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'short'
      })
    };

    if (!SERVICE_ID || !PUBLIC_KEY) {
      throw new Error('EmailJS configuration is missing');
    }

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      {
        publicKey: PUBLIC_KEY,
        // Optionally add privateKey if you have one
        // privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Order confirmation email sent successfully'
    });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send order confirmation email'
    });
  }
}