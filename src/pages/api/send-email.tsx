// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    const mailOptions = {
      from: `"Nur-Maa Store" <${process.env.GMAIL_USER}>`,
      to: formData.email,
      subject: `🛒 Your Order Confirmation - Nur-Maa Store`,
      text: `
Hello ${formData.name},

Thank you for your order!

📦 Order Summary:
${orderSummary}

Total Amount: ₹${totalPrice.toFixed(2)}

📍 Shipping Address:
${formData.address}

📞 Phone: ${formData.phone}
📝 Notes: ${formData.message || 'No additional notes'}

🗓️ Date: ${new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'short',
      })}

We’ll notify you once your order is out for delivery.

Warm regards,  
Nur-Maa Store
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Order confirmation email sent via Gmail',
    });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Email failed',
    });
  }
}
