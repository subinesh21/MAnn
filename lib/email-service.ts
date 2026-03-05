// Email Service for Invoice Delivery
import nodemailer from 'nodemailer';
import { INVOICE_CONFIG } from './payment-config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

export class EmailService {
  private static transporter: nodemailer.Transporter;

  static initializeTransporter() {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
        port: parseInt(process.env.EMAIL_PORT || '465'),
        secure: true,
        auth: {
          user: process.env.EMAIL_USER || 'support@thulira.com',
          pass: process.env.EMAIL_PASS
        }
      });
    }
    return this.transporter;
  }

  static async sendInvoiceEmail(
    customerEmail: string,
    customerName: string,
    orderId: string,
    invoicePdf: Blob,
    orderTotal: number
  ): Promise<boolean> {
    try {
      const transporter = this.initializeTransporter();

      // Convert Blob to Buffer
      const arrayBuffer = await invoicePdf.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const mailOptions: EmailOptions = {
        to: customerEmail,
        subject: `Invoice for Order #${orderId} - Thulira Sustainable Products`,
        html: this.generateInvoiceEmailTemplate(customerName, orderId, orderTotal),
        attachments: [
          {
            filename: `Invoice_${orderId}.pdf`,
            content: buffer,
            contentType: 'application/pdf'
          }
        ]
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Invoice email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Error sending invoice email:', error);
      return false;
    }
  }

  static generateInvoiceEmailTemplate(
    customerName: string,
    orderId: string,
    orderTotal: number
  ): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Order Confirmation - Thulira</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2d5a3d 0%, #4a7c59 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Your Order!</h1>
            <p style="color: #e8f5e8; margin: 10px 0 0 0; font-size: 16px;">Your sustainable journey continues</p>
        </div>

        <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0;">
            <h2 style="color: #2d5a3d; margin-top: 0;">Hello ${customerName},</h2>
            
            <p>Great news! Your order has been confirmed and we're preparing your sustainable products for delivery.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #2d5a3d;">Order Summary</h3>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Total Amount:</strong> ₹${orderTotal.toFixed(2)}</p>
                <p><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">Confirmed</span></p>
            </div>

            <div style="margin: 30px 0;">
                <h3 style="color: #2d5a3d;">What's Next?</h3>
                <ul style="padding-left: 20px;">
                    <li>Your invoice is attached to this email</li>
                    <li>We'll process your order within 24 hours</li>
                    <li>You'll receive shipping updates via email</li>
                    <li>Expected delivery: 2-7 business days (depending on your location)</li>
                </ul>
            </div>

            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #2d5a3d;">📦 Sustainable Packaging</h3>
                <p>Your products will be packed using eco-friendly materials as part of our commitment to sustainability.</p>
            </div>

            <p>If you have any questions about your order, please don't hesitate to contact us:</p>
            <p><strong>Email:</strong> ${INVOICE_CONFIG.COMPANY_EMAIL}<br>
            <strong>Phone:</strong> ${INVOICE_CONFIG.COMPANY_PHONE}</p>

            <div style="text-align: center; margin: 30px 0;">
                <a href="https://thulira.com/orders/${orderId}" 
                   style="background-color: #2d5a3d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Track Your Order
                </a>
            </div>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
                Thank you for choosing Thulira!<br>
                Making sustainable choices, one product at a time.
            </p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">
                © ${new Date().getFullYear()} Thulira Sustainable Products. All rights reserved.
            </p>
        </div>
    </body>
    </html>
    `;
  }

  static async sendOrderConfirmation(
    customerEmail: string,
    customerName: string,
    orderId: string,
    orderItems: any[],
    orderTotal: number
  ): Promise<boolean> {
    try {
      const transporter = this.initializeTransporter();

      const mailOptions: EmailOptions = {
        to: customerEmail,
        subject: `Order Confirmation #${orderId} - Thulira Sustainable Products`,
        html: this.generateOrderConfirmationTemplate(customerName, orderId, orderItems, orderTotal)
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Order confirmation email sent:', result.messageId);
      return true;
    } catch (error) {
      console.error('Error sending order confirmation:', error);
      return false;
    }
  }

  static generateOrderConfirmationTemplate(
    customerName: string,
    orderId: string,
    orderItems: any[],
    orderTotal: number
  ): string {
    const itemsList = orderItems.map(item => 
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toFixed(2)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    ).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Order Confirmation - Thulira</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2d5a3d 0%, #4a7c59 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Order Confirmed!</h1>
        </div>

        <div style="background-color: #ffffff; padding: 30px;">
            <h2>Hello ${customerName},</h2>
            <p>Thank you for your order! Here are the details:</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Order #${orderId}</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #2d5a3d; color: white;">
                            <th style="padding: 10px; text-align: left;">Item</th>
                            <th style="padding: 10px; text-align: center;">Qty</th>
                            <th style="padding: 10px; text-align: right;">Price</th>
                            <th style="padding: 10px; text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsList}
                        <tr>
                            <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                            <td style="padding: 10px; text-align: right; font-weight: bold;">₹${orderTotal.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p>We'll send you another email with your invoice shortly.</p>
        </div>
    </body>
    </html>
    `;
  }
}