'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Home, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/sections/Sidebar';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { useCart } from '@/context/CartContext';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const hasCleared = useRef(false);
  
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    invoiceNumber: '',
    amount: ''
  });

  useEffect(() => {
    // Only clear cart once when component mounts
    if (!hasCleared.current) {
      clearCart();
      hasCleared.current = true;
    }

    // Get order details from URL params
    const orderId = searchParams.get('orderId');
    const invoiceNumber = searchParams.get('invoiceNumber');
    
    if (orderId || invoiceNumber) {
      setOrderDetails({
        orderId: orderId || '',
        invoiceNumber: invoiceNumber || '',
        amount: searchParams.get('amount') || ''
      });
    }

  }, [clearCart, searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="flex flex-col min-h-screen">
        {/* Mobile nav spacing */}
        <div className="h-14 lg:hidden"></div>

        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-xl border border-[#ebebeb] p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>

              <h1 className="text-3xl font-bold text-[#131212] mb-4">
                Order Placed Successfully!
              </h1>
              
              {/* Order Details */}
              {(orderDetails.orderId || orderDetails.invoiceNumber) && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Order Details</h3>
                  {orderDetails.orderId && (
                    <p className="text-sm text-green-700 mb-1">
                      <strong>Order ID:</strong> {orderDetails.orderId}
                    </p>
                  )}
                  {orderDetails.invoiceNumber && (
                    <p className="text-sm text-green-700 mb-1">
                      <strong>Invoice Number:</strong> {orderDetails.invoiceNumber}
                    </p>
                  )}
                  {orderDetails.amount && (
                    <p className="text-sm text-green-700">
                      <strong>Amount Paid:</strong> ₹{orderDetails.amount}
                    </p>
                  )}
                </div>
              )}
              
              <p className="text-[#6b6b6b] mb-8">
                Thank you for your order! We've sent a confirmation email to your registered email address.
                You can track your order status in your account dashboard.
              </p>

              <div className="bg-[#f5f7fa] p-6 rounded-lg mb-8">
                <Package className="w-12 h-12 text-[#fbb710] mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-[#131212] mb-4">
                  What's Next?
                </h3>
                <div className="space-y-3 text-left max-w-md mx-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-bold">1</span>
                    </div>
                    <p className="text-sm text-[#6b6b6b]">
                      Order confirmation email will be sent shortly
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-bold">2</span>
                    </div>
                    <p className="text-sm text-[#6b6b6b]">
                      We'll process and prepare your order for shipment
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-bold">3</span>
                    </div>
                    <p className="text-sm text-[#6b6b6b]">
                      You'll receive tracking updates via email and SMS
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-sm text-[#6b6b6b]">
                  <Mail className="w-4 h-4" />
                  <span>support@thulira.com</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-[#6b6b6b]">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/account"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fbb710] text-white hover:bg-[#131212] transition-colors rounded"
                >
                  <Package className="w-5 h-5" />
                  View My Orders
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#ebebeb] text-[#131212] hover:border-[#fbb710] hover:text-[#fbb710] transition-colors rounded"
                >
                  <Home className="w-5 h-5" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

    </div>
  );
}