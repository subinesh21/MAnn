import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import OrderModel from '@/models/Order';
import { InvoiceGenerator } from '@/lib/invoice-generator';
import { EmailService } from '@/lib/email-service';

// Razorpay sends webhooks as POST requests
export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      console.error('Webhook: Missing signature header');
      return NextResponse.json(
        { success: false, message: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature using your webhook secret
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Webhook: RAZORPAY_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { success: false, message: 'Webhook not configured' },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error('Webhook: Invalid signature');
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Parse the verified payload
    const event = JSON.parse(body);
    console.log('Webhook event received:', event.event);

    await connectDB();

    // Handle different event types
    switch (event.event) {
      case 'payment.captured': {
        const payment = event.payload.payment.entity;
        const razorpayOrderId = payment.order_id;

        console.log('Webhook: Payment captured for order:', razorpayOrderId);

        // Find the order
        const order = await OrderModel.findOne({ razorpayOrderId });

        if (!order) {
          console.error('Webhook: Order not found for:', razorpayOrderId);
          // Return 200 anyway so Razorpay doesn't retry
          return NextResponse.json({ success: true, message: 'Order not found, acknowledged' });
        }

        // Only update if not already confirmed (avoid duplicate processing)
        if (order.status === 'pending') {
          order.razorpayPaymentId = payment.id;
          order.status = 'confirmed';
          order.updatedAt = new Date();
          await order.save();

          console.log('Webhook: Order confirmed:', order._id);

          // Send confirmation email
          try {
            const invoiceNumber = InvoiceGenerator.generateInvoiceNumber();
            await EmailService.sendInvoiceEmail(
              order.user.email,
              order.user.name,
              invoiceNumber,
              order.totalAmount
            );
          } catch (emailError) {
            console.error('Webhook: Email failed:', emailError);
            // Don't fail the webhook for email errors
          }
        } else {
          console.log('Webhook: Order already processed, status:', order.status);
        }

        break;
      }

      case 'payment.failed': {
        const payment = event.payload.payment.entity;
        const razorpayOrderId = payment.order_id;

        console.log('Webhook: Payment failed for order:', razorpayOrderId);

        const order = await OrderModel.findOne({ razorpayOrderId });
        if (order && order.status === 'pending') {
          order.status = 'cancelled';
          order.updatedAt = new Date();
          await order.save();
          console.log('Webhook: Order cancelled due to failed payment:', order._id);
        }

        break;
      }

      default:
        console.log('Webhook: Unhandled event type:', event.event);
    }

    // Always return 200 to acknowledge receipt (prevents Razorpay retries)
    return NextResponse.json({ success: true, message: 'Webhook processed' });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    // Return 200 even on error to prevent infinite retries
    // Log the error for debugging but acknowledge receipt
    return NextResponse.json({ success: true, message: 'Acknowledged with error' });
  }
}
