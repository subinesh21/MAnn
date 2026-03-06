'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { CATEGORIES, getProductsByCategory } from '@/lib/product-data';

export default function CategoryGrid() {
  const [categoryPrices, setCategoryPrices] = useState({});
  const gridRef = useRef(null);

  useEffect(() => {
    // Calculate minimum price for each category
    const prices = {};
    CATEGORIES.forEach(category => {
      const products = getProductsByCategory(category.id);
      if (products && products.length > 0) {
        const minPrice = Math.min(...products.map(p => p.price));
        prices[category.id] = minPrice;
      } else {
        prices[category.id] = 199; // Default price
      }
    });
    setCategoryPrices(prices);
  }, []);

  // MANUAL GRID CONFIGURATION - Edit this array to control each grid item
  const gridItems = [
    {
      id: 'drinkware',
      name: 'Drinkware',
      customName: 'Coffee & Tea',
      price: 199,
      image: '/images/category-drinkware.png',
      imageFit: 'cover',
      imagePosition: 'center',
      gridSpan: 'normal',
      textPosition: 'top-left',
      textColor: 'white',
      overlay: 'dark',
      overlayOpacity: 0.3,
      padding: 'p-3 sm:p-6',
      count: 12,
    },
    {
      id: 'tableware',
      name: 'Tableware',
      customName: 'Dining Essentials',
      price: 249,
      image: '/images/category-tableware.png',
      imageFit: 'cover',
      imagePosition: 'center',
      gridSpan: 'normal',
      textPosition: 'top-left',
      textColor: 'white',
      overlay: 'dark',
      overlayOpacity: 0.4,
      padding: 'p-3 sm:p-6',
      count: 18,
    },
    {
      id: 'storage',
      name: 'Storage',
      customName: 'Kitchen Storage',
      price: 179,
      image: '/images/category-storage.png',
      imageFit: 'cover',
      imagePosition: 'center',
      gridSpan: 'wide',
      textPosition: 'top-left',
      textColor: 'white',
      overlay: 'dark',
      overlayOpacity: 0.3,
      padding: 'p-3 sm:p-6',
      count: 12,
    },
    {
      id: 'kitchenware',
      name: 'Kitchenware',
      customName: 'Kitchen Tools',
      price: 299,
      image: '/images/catagory-kitchentools.png',
      imageFit: 'cover',
      imagePosition: 'center',
      gridSpan: 'wide',
      textPosition: 'top-left',
      textColor: 'white',
      overlay: 'dark',
      overlayOpacity: 0.35,
      padding: 'p-3 sm:p-6',
      count: 15,
    },
    {
      id: 'gardenware',
      name: 'Gardenware',
      customName: 'Indo-Gardenware',
      price: 159,
      image: '/images/catagory-indo-gardenware.png',
      imageFit: 'cover',
      imagePosition: 'center',
      gridSpan: 'normal',
      textPosition: 'top-left',
      textColor: 'white',
      overlay: 'dark',
      overlayOpacity: 0.25,
      padding: 'p-3 sm:p-6',
      count: 10,
    },
    {
      id: 'outdoor',
      name: 'Outdoor',
      customName: 'Outdoor Living',
      price: 349,
      image: '/images/catagory-out-gardenware.png',
      imageFit: 'cover',
      imageZoom: 1.2,
      imagePosition: 'center',
      gridSpan: 'normal',
      textPosition: 'top-left',
      textColor: 'white',
      overlay: 'dark',
      overlayOpacity: 0.4,
      padding: 'p-3 sm:p-6',
      count: 6,
    },
  ];

  // Grid span mapping - Different behavior for mobile vs desktop
  const spanMap = {
    tall: 'sm:row-span-2',
    wide: 'sm:col-span-2',
    normal: ''
  };

  // Helper function to get image style based on configuration
  const getImageStyle = (item) => {
    if (item.imageFit === 'cover') {
      return { objectFit: 'cover', objectPosition: item.imagePosition };
    } else if (item.imageFit === 'contain') {
      return { objectFit: 'contain', objectPosition: item.imagePosition };
    } else if (item.imageFit === 'zoom') {
      return {
        objectFit: 'cover',
        objectPosition: item.imagePosition,
        transform: `scale(${item.imageZoom})`,
      };
    }
    return { objectFit: 'cover', objectPosition: 'center' };
  };

  // Helper function to get overlay style
  const getOverlayStyle = (item) => {
    if (item.overlay === 'dark') {
      return `bg-black/${Math.round(item.overlayOpacity * 100)}`;
    } else if (item.overlay === 'light') {
      return `bg-white/${Math.round(item.overlayOpacity * 100)}`;
    }
    return '';
  };

  // Helper function to get text position classes
  const getTextPosition = (position) => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'top-right':
        return 'top-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      default:
        return 'top-0 left-0';
    }
  };

  return (
    <section className="bg-background w-full flex flex-col min-h-[calc(100vh-56px)] lg:min-h-screen">
      {/* Main Grid - uses flex-1 to fill parent vertically, grid rows stretch automatically */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-0 flex-1 w-full"
        style={{ gridAutoRows: '1fr' }}
      >
        {gridItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`group relative block overflow-hidden cursor-pointer 
              ${spanMap[item.gridSpan]}`}
          >
            <Link href={`/products#${item.id}`} className="block h-full">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.customName || item.name} - eco-friendly products by Thulira`}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                  style={getImageStyle(item)}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  onError={(e) => {
                    e.target.src = '/images/product-chai-cups.jpg';
                    e.target.style.objectFit = 'cover';
                  }}
                />

                {/* Custom overlay */}
                <div className={`absolute inset-0 ${getOverlayStyle(item)} transition-colors duration-300`} />

                {/* Additional hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>

              {/* Text overlay with responsive sizing */}
              <div className={`absolute ${getTextPosition(item.textPosition)} ${item.padding}`}>
                {/* Green accent bar - smaller on mobile */}
                <div className="w-6 sm:w-8 md:w-10 h-[2px] sm:h-[2px] md:h-[3px] bg-[#52dd28ff] mb-1 sm:mb-1 md:mb-3" />

                {/* Price - smaller on mobile */}
                <p className="text-[10px] sm:text-xs md:text-sm text-white font-medium mb-1">
                  From ₹{item.price}
                </p>

                {/* Mobile version - visible only on mobile */}
                <h6 className="text-sm font-semibold text-white leading-tight block lg:hidden" style={{ fontFamily: 'var(--font-cinzel), serif', letterSpacing: '1.5px' }}>
                  {item.customName || item.name}
                </h6>

                {/* Desktop version - visible only on desktop */}
                <h3 className="text-lg font-semibold text-white leading-tight hidden lg:block" style={{ fontFamily: 'var(--font-cinzel), serif', letterSpacing: '2px' }}>
                  {item.customName || item.name}
                </h3>
                {/* Product count - smaller on mobile */}
                <p className="text-[8px] sm:text-[10px] md:text-xs text-white/80 mt-0.5 sm:mt-1">
                  {item.count} Products
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}