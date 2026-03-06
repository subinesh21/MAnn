'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import CategoryGrid from '@/components/sections/CategoryGrid';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <MobileNav />

      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        <div className="h-14 lg:hidden"></div>

        <div className="flex-1">
          <CategoryGrid />
        </div>

        <Footer />
      </div>

      <ScrollToTop visible={showScrollTop} />
    </div>
  );
}