import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectDB from '@/lib/db';
import '@/models/Product';
import { DeliveryCalculator } from '@/lib/delivery-calculator';
import { GSTCalculator } from '@/lib/gst-calculator';
import { InvoiceGenerator } from '@/lib/invoice-generator';
import { EmailService } from '@/lib/email-service';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export async function POST(request: NextRequest) {
  try {
    const { 
      items, 
      customerInfo, 
      pincode, 
      paymentMethod 
    } = await request.json();

    // Validate required fields
    if (!items || !customerInfo || !pincode) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Validate pincode
    const deliveryInfo = DeliveryCalculator.getDeliveryInfo(pincode);
    if (!deliveryInfo.isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid pincode' },
        { status: 400 }
      );
    }

    // Calculate delivery cost
    const itemsTotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const deliveryCost = DeliveryCalculator.calculateDeliveryCost(pincode, itemsTotal);

    // Calculate GST
    const gstCalculation = GSTCalculator.calculateWithDelivery(
      items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category
      })),
      deliveryCost.finalCost
    );

    const totalAmount = gstCalculation.grandTotal;

    // Create order in Razorpay
    const options = {
      amount: Math.round(totalAmount * 100), // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      payment_capture: 1,
      notes: {
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        items_count: items.length
      }
    };

    const order = await razorpay.orders.create(options);

    // Prepare order data for database
    const orderData = {
      orderId: order.id,
      customer: customerInfo,
      items: items.map((item: any) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        total: item.price * item.quantity
      })),
      delivery: {
        pincode,
        cost: deliveryCost.finalCost,
        days: deliveryCost.deliveryDays,
        isFree: deliveryCost.isFree
      },
      pricing: {
        subtotal: gstCalculation.subtotal,
        deliveryCharges: deliveryCost.finalCost,
        gstAmount: gstCalculation.totalGST,
        totalAmount: totalAmount
      },
      payment: {
        method: paymentMethod,
        status: 'pending',
        razorpayOrderId: order.id
      },
      status: 'pending',
      createdAt: new Date()
    };

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      orderData
    });

  } catch (error: any) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to initiate payment',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// Verify payment webhook
export async function PUT(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    // Verify payment signature
    const crypto = require('crypto');
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();
    
    // Here you would typically update your order collection
    // For now, we'll simulate the process
    
    // Generate invoice
    const invoiceNumber = InvoiceGenerator.generateInvoiceNumber();
    const orderDate = InvoiceGenerator.formatDate(new Date());

    // In a real scenario, you would fetch order details from database
    // For demo purposes, we're simulating the invoice generation
    const mockOrderData = {
      orderId: razorpay_order_id,
      orderDate,
      customer: {
        name: 'Customer Name',
        email: 'customer@example.com',
        phone: '9876543210',
        address: 'Customer Address',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      },
      items: [],
      subtotal: 0,
      deliveryCharges: 0,
      gstAmount: 0,
      totalAmount: 0,
      paymentMethod: 'razorpay',
      paymentId: razorpay_payment_id
    };

    // Generate PDF invoice
    const invoicePdf = await InvoiceGenerator.generateInvoicePDF(mockOrderData);

    // Send invoice email
    const emailSent = await EmailService.sendInvoiceEmail(
      mockOrderData.customer.email,
      mockOrderData.customer.name,
      invoiceNumber,
      invoicePdf,
      mockOrderData.totalAmount
    );

    if (!emailSent) {
      console.warn('Failed to send invoice email');
    }
    
    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      invoiceNumber
    });

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Payment verification failed',
        error: error.message 
      },
      { status: 500 }
    );
  }
}