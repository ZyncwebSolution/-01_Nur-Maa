// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

const TEMPLATE_ID = 'template_cpoou7s'; // Replace with your actual ID
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { formData, items, totalPrice } = req.body;

    const orderSummary = items
      .map((item: CartItem) =>
        `Product: ${item.product.name}
Quantity: ${item.quantity}
Price: ₹${item.product.price}
Subtotal: ₹${(item.product.price * item.quantity).toFixed(2)}`
      )
      .join('\n\n');

    const templateParams = {
      to_name: formData.name,
      from_name: 'Nur-Maa Store',
      to_email: formData.email,
      phone: formData.phone,
      address: formData.address,
      message: formData.message || 'No additional notes',
      order_summary: orderSummary,
      total_amount: `₹${totalPrice.toFixed(2)}`,
      order_id: `ORDER-${Date.now()}`,
      order_date: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'short',
      }),
    };

    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: templateParams,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      throw new Error(errorData?.error || 'Failed to send email');
    }

    const emailResult = await emailResponse.json();

    return res.status(200).json({
      success: true,
      message: 'Order confirmation email sent successfully',
      emailResponse: emailResult,
    });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Email failed',
    });
  }
}
