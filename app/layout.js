// IMPORTANT: No 'use client' here — layout must be a Server Component to export metadata
import { Open_Sans, Poppins, Cinzel } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import IntroSlides from '@/components/IntroSlides';

// Configure Open Sans
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['400', '500', '600'],
});

// Configure Poppins
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

// Configure Cinzel (serif - matches logo font)
const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700'],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thulira.com';

// Proper Next.js App Router metadata (replaces <Head>)
export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Thulira - Sustainable Eco-Friendly Products',
    template: '%s | Thulira',
  },
  description:
    'Discover sustainable, eco-friendly products for a greener lifestyle. Shop drinkware, tableware, storage solutions, and more from our curated collection.',
  keywords: [
    'sustainable products', 'eco-friendly', 'green living', 'bamboo products',
    'reusable items', 'zero waste', 'environmentally conscious', 'thulira',
  ],
  authors: [{ name: 'Thulira' }],
  creator: 'Thulira',
  publisher: 'Thulira',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    siteName: 'Thulira',
    title: 'Thulira - Sustainable Eco-Friendly Products',
    description:
      'Discover sustainable, eco-friendly products for a greener lifestyle.',
    images: [
      {
        url: '/images/hero-slide-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Thulira Sustainable Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thulira - Sustainable Eco-Friendly Products',
    description: 'Discover sustainable, eco-friendly products for a greener lifestyle.',
    images: ['/images/hero-slide-1.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    // Add your Google Search Console verification code here when available
    // google: 'your-google-verification-code',
  },
};

// Viewport export for mobile-friendliness
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#52dd28',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${openSans.variable} ${poppins.variable} ${cinzel.variable}`}>
      <body className="bg-white">
        <AuthProvider>
          <IntroSlides />
          <CartProvider>
            <WishlistProvider>
              {children}
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}