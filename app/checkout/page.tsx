'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ShoppingBag, CreditCard, MapPin, Phone, User, 
  CheckCircle, ShoppingCart, AlertCircle, Loader, Truck, 
  Percent, Mail, Smartphone, Wallet, Building
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { toast } from 'react-toastify';
import { DeliveryCalculator } from '@/lib/delivery-calculator';
import { GSTCalculator } from '@/lib/gst-calculator';
import { PAYMENT_METHODS } from '@/lib/payment-config';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
  // State management
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('razorpay');
  const [paymentTab, setPaymentTab] = useState<'upi' | 'card' | 'wallet' | 'netbanking'>('upi');
  
  // Shipping info state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState<any>({});

  // Calculate pricing
  const itemsTotal = cartTotal;
  const deliveryCost = deliveryInfo ? deliveryInfo.finalCost : 0;
  const gstCalculation = GSTCalculator.calculateWithDelivery(
    cartItems.map(item => ({
      id: String(item.id),
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      category: (item as any).category || 'homeware'
    })),
    deliveryCost
  );
  const totalAmount = gstCalculation.grandTotal;

  // Effects
  useEffect(() => {
    if (!isAuthenticated && !loadingProfile) {
      toast.warning('Please login to checkout');
      router.push('/account');
    }
  }, [isAuthenticated, loadingProfile, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/user/profile?userId=${user.id}`);
          const data = await response.json();
          if (data.user) {
            setShippingInfo({
              fullName: data.user.fullName || '',
              address: data.user.address || '',
              city: data.user.city || '',
              state: data.user.state || '',
              zipCode: data.user.zipCode || '',
              country: data.user.country || 'India',
              phone: data.user.phone || '',
              email: data.user.email || ''
            });
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoadingProfile(false);
        }
      } else {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const validateForm = () => {
    const newErrors: any = {};
    
    if (!shippingInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode.trim()) {
      newErrors.zipCode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(shippingInfo.zipCode)) {
      newErrors.zipCode = 'Invalid pincode (must be 6 digits)';
    }
    if (!shippingInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(shippingInfo.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }
    if (!shippingInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!pincode) {
      newErrors.pincode = 'Please enter pincode for delivery calculation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
    
    if (value.length === 6) {
      try {
        const info = DeliveryCalculator.calculateDeliveryCost(value, itemsTotal);
        setDeliveryInfo(info);
        setErrors(prev => ({ ...prev, pincode: undefined }));
      } catch (error) {
        setDeliveryInfo(null);
      }
    } else {
      setDeliveryInfo(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    if (!deliveryInfo) {
      toast.error('Please enter valid pincode for delivery calculation');
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Initialize Razorpay payment
      const response = await fetch('/api/payment/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          customerInfo: shippingInfo,
          pincode,
          paymentMethod: selectedPaymentMethod
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to initiate payment');
      }

      // Open Razorpay payment modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Thulira Sustainable Products',
        description: `Order #${data.orderId}`,
        order_id: data.orderId,
        handler: async (response: any) => {
          // Payment successful
          await handlePaymentSuccess(response, data.orderData);
        },
        prefill: {
          name: shippingInfo.fullName,
          email: shippingInfo.email,
          contact: shippingInfo.phone
        },
        theme: {
          color: '#2d5a3d'
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
      setIsPlacingOrder(false);
    }
  };

  const handlePaymentSuccess = async (razorpayResponse: any, orderData: any) => {
    try {
      // Verify payment signature
      const verifyResponse = await fetch('/api/payment/razorpay', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: razorpayResponse.razorpay_order_id,
          razorpay_payment_id: razorpayResponse.razorpay_payment_id,
          razorpay_signature: razorpayResponse.razorpay_signature
        })
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.success) {
        // Clear cart and show success
        clearCart();
        
        // Redirect to success page
        router.push(`/orders/success?orderId=${orderData.orderId}&invoiceNumber=${verifyData.invoiceNumber}`);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error: any) {
      console.error('Payment verification error:', error);
      toast.error('Payment verification failed. Please contact support.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f9fdfa]">
      <MobileNav />
      <Sidebar />
      
      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <Link href="/cart" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-3xl font-bold text-[#131212]">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Shipping Information */}
              <div className="bg-white rounded-xl border border-[#ebebeb] p-6">
                <h2 className="text-xl font-semibold text-[#131212] mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2 text-green-600" />
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#131212] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${
                        errors.fullName ? 'border-red-500' : 'border-[#ebebeb]'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#131212] mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${
                        errors.email ? 'border-red-500' : 'border-[#ebebeb]'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#131212] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${
                        errors.phone ? 'border-red-500' : 'border-[#ebebeb]'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                      placeholder="9876543210"
                      maxLength={10}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#131212] mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${
                        errors.zipCode ? 'border-red-500' : 'border-[#ebebeb]'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                      placeholder="123456"
                      maxLength={6}
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#131212] mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${
                        errors.address ? 'border-red-500' : 'border-[#ebebeb]'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                      placeholder="House No., Street, Area"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#131212] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${
                        errors.city ? 'border-red-500' : 'border-[#ebebeb]'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                      placeholder="Mumbai"
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#131212] mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${
                        errors.state ? 'border-red-500' : 'border-[#ebebeb]'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                      placeholder="Maharashtra"
                    />
                    {errors.state && (
                      <p className="mt-1 text-xs text-red-500">{errors.state}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-white rounded-xl border border-[#ebebeb] p-6">
                <h2 className="text-xl font-semibold text-[#131212] mb-6 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-green-600" />
                  Delivery Details
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#131212] mb-1">
                    Enter Pincode for Delivery Calculation *
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={handlePincodeChange}
                    className={`w-full max-w-xs px-4 py-2 border ${
                      errors.pincode ? 'border-red-500' : 'border-[#ebebeb]'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="Enter 6-digit pincode"
                    maxLength={6}
                  />
                  {errors.pincode && (
                    <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>
                  )}
                </div>

                {deliveryInfo && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          Delivery Available
                        </p>
                        <p className="text-sm text-green-600 mt-1">
                          Estimated Delivery: {deliveryInfo.deliveryDays} business days
                        </p>
                        <p className="text-sm text-green-600 mt-1">
                          Delivery Charges: {deliveryInfo.isFree ? 'FREE' : `₹${deliveryInfo.finalCost}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white rounded-xl border border-[#ebebeb] p-6">
                <h2 className="text-xl font-semibold text-[#131212] mb-6 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                  Payment Method
                </h2>

                {/* Payment Tabs */}
                <div className="flex space-x-2 mb-6 overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setPaymentTab('upi')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      paymentTab === 'upi'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 inline mr-2" />
                    UPI
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('card')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      paymentTab === 'card'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Cards
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('wallet')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      paymentTab === 'wallet'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Wallet className="w-4 h-4 inline mr-2" />
                    Wallets
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('netbanking')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      paymentTab === 'netbanking'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Building className="w-4 h-4 inline mr-2" />
                    Net Banking
                  </button>
                </div>

                {/* Payment Methods Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {paymentTab === 'upi' && PAYMENT_METHODS.UPI.map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="font-medium text-sm">{method.name}</div>
                      </div>
                    </label>
                  ))}

                  {paymentTab === 'card' && PAYMENT_METHODS.CARDS.map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="font-medium text-sm">{method.name}</div>
                      </div>
                    </label>
                  ))}

                  {paymentTab === 'wallet' && PAYMENT_METHODS.WALLET.map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="font-medium text-sm">{method.name}</div>
                      </div>
                    </label>
                  ))}

                  {paymentTab === 'netbanking' && PAYMENT_METHODS.NETBANKING.map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="font-medium text-sm">{method.name}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-[#ebebeb] p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-[#131212] mb-6 flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2 text-green-600" />
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#131212] truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t border-[#ebebeb] pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{itemsTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium">
                      {deliveryInfo ? (deliveryInfo.isFree ? 'FREE' : `₹${deliveryInfo.finalCost}`) : '-'}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">₹{gstCalculation.totalGST.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-[#ebebeb] pt-3 mt-3">
                    <div className="flex justify-between text-base font-semibold">
                      <span>Total Amount</span>
                      <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPlacingOrder || !deliveryInfo}
                  className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-all ${
                    isPlacingOrder || !deliveryInfo
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isPlacingOrder ? (
                    <div className="flex items-center justify-center">
                      <Loader className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </div>
                  ) : (
                    `Pay ₹${totalAmount.toFixed(2)}`
                  )}
                </button>

                {!deliveryInfo && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Please enter pincode to calculate delivery
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
      {showScrollTop && <ScrollToTop />}
    </div>
  );
}