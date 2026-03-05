'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Sidebar from '@/components/sections/Sidebar';
import Footer from '@/components/sections/Footer';
import MobileNav from '@/components/MobileNav';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CATEGORY_INFO } from '@/lib/product-data';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load products from MongoDB
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products?isActive=true');
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          toast.error('Failed to load products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Error loading products');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Group products by category
  const groupedProducts = {};
  if (!loading && products.length > 0) {
    products.forEach(product => {
      if (!groupedProducts[product.category]) {
        groupedProducts[product.category] = [];
      }
      groupedProducts[product.category].push(product);
    });
  }

  const categoryOrder = ['drinkware', 'tableware', 'storage', 'kitchenware', 'homeware', 'bakeware', 'gardenware', 'gifting'];

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <MobileNav />
        <div className="lg:ml-[280px] flex flex-col min-h-screen">
          <div className="h-14 lg:hidden"></div>
          <div className="flex-1 container mx-auto px-3 sm:px-6 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 w-64 mb-8"></div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-48 sm:h-64 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <MobileNav />
      
      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        <div className="h-14 lg:hidden"></div>
        
        <div className="flex-1 container mx-auto px-3 sm:px-6 py-8">
          {/* Products by Category */}
          <div className="space-y-12">
            {categoryOrder.map(categoryId => {
              const categoryProducts = groupedProducts[categoryId] || [];
              const categoryData = CATEGORY_INFO[categoryId];
              
              if (categoryProducts.length === 0) return null;
              
              return (
                <section key={categoryId} id={categoryId} className="scroll-mt-24">
                  {/* Category Header - Mobile Optimized */}
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#131212]">
                        {categoryData?.name || categoryId}
                      </h2>
                      <div className="flex-1 h-px bg-[#ebebeb]"></div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#6b6b6b]">
                      {categoryData?.description || `${categoryProducts.length} products`}
                    </p>
                  </div>
                  
                  {/* Products Grid - Using ProductCard component */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {categoryProducts.map((product, index) => (
                      <motion.div
                        key={product._id || product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <ProductCard
                          product={product}
                          categoryImage={categoryData?.image}
                        />
                      </motion.div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* No Products Message */}
          {Object.keys(groupedProducts).length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-base sm:text-lg font-medium text-[#131212] mb-2">No products found</h3>
              <p className="text-xs sm:text-sm text-[#6b6b6b]">Check back later for new arrivals</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}