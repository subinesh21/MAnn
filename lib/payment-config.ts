// Payment Gateway Configuration
export const PAYMENT_CONFIG = {
  // Razorpay (India - Primary for UPI, Cards, Wallets)
  RAZORPAY: {
    KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    CURRENCY: 'INR',
    ENABLED: true
  },
  
  // Stripe (International Cards)
  STRIPE: {
    PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    CURRENCY: 'USD',
    ENABLED: true
  }
};

// Supported Payment Methods
export const PAYMENT_METHODS = {
  UPI: [
    { id: 'googlepay', name: 'Google Pay', icon: 'gpay' },
    { id: 'phonepe', name: 'PhonePe', icon: 'phonepe' },
    { id: 'paytm', name: 'Paytm', icon: 'paytm' }
  ],
  CARDS: [
    { id: 'credit_card', name: 'Credit Card', icon: 'credit-card' },
    { id: 'debit_card', name: 'Debit Card', icon: 'debit-card' }
  ],
  WALLET: [
    { id: 'paytm_wallet', name: 'Paytm Wallet', icon: 'paytm' },
    { id: 'phonepe_wallet', name: 'PhonePe Wallet', icon: 'phonepe' },
    { id: 'amazonpay', name: 'Amazon Pay', icon: 'amazon' }
  ],
  NETBANKING: [
    { id: 'sbi', name: 'State Bank of India', icon: 'sbi' },
    { id: 'hdfc', name: 'HDFC Bank', icon: 'hdfc' },
    { id: 'icici', name: 'ICICI Bank', icon: 'icici' },
    { id: 'axis', name: 'Axis Bank', icon: 'axis' }
  ]
};

// GST Configuration
export const GST_CONFIG = {
  RATE: 0.18, // 18% GST
  APPLICABLE_CATEGORIES: [
    'drinkware', 'tableware', 'storage', 'kitchenware', 
    'homeware', 'bakeware', 'gardenware', 'gifting'
  ]
};

// Shipping Configuration
export const SHIPPING_CONFIG = {
  FREE_SHIPPING_THRESHOLD: 500, // Free shipping for orders above ₹500
  BASE_DELIVERY_COST: 50, // Base delivery charge
  PINCODE_ZONES: {
    'metro': { cost: 0, days: '1-2' },     // Major cities
    'tier1': { cost: 20, days: '2-3' },    // Tier 1 cities
    'tier2': { cost: 40, days: '3-5' },    // Tier 2 cities
    'tier3': { cost: 60, days: '5-7' },    // Tier 3 cities
    'remote': { cost: 100, days: '7-10' }  // Remote areas
  }
};

// Invoice Configuration
export const INVOICE_CONFIG = {
  COMPANY_NAME: 'Thulira Sustainable Products',
  COMPANY_ADDRESS: '123 Green Street, Eco City, EC 123456',
  COMPANY_EMAIL: 'support@thulira.com',
  COMPANY_PHONE: '+91 98765 43210',
  GST_NUMBER: 'GSTIN1234567890',
  PAN_NUMBER: 'PAN1234567890'
};