// app/products/detail/[id]/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Minus, Plus } from 'lucide-react';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
// Remove hardcoded import
// import { PRODUCTS } from '@/lib/product-data';

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [productImages, setProductImages] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { addToCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  // Update images when color changes
  useEffect(() => {
    if (product && selectedColor) {
      const colorImages = product.images?.[selectedColor];
      if (colorImages && colorImages.length > 0) {
        // Create array with primary image first, then gallery images (up to 3 total)
        const images = [
          product.primaryImage,           // Index 0: Main image
          ...colorImages.slice(0, 3)      // Index 1,2,3: Gallery images (max 3)
        ];
        setProductImages(images);
        // Set selected image to primary image (index 0) for main display
        setSelectedImage(0);
      } else {
        // Fallback to just primary image
        setProductImages([product.primaryImage].filter(Boolean));
        setSelectedImage(0);
      }
    }
  }, [product, selectedColor]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      console.log('Fetching product details for ID:', productId);
      
      // Use direct ID lookup instead of search
      const response = await fetch(`/api/products?id=${productId}`);
      const data = await response.json();
      console.log('Direct ID API Response:', data);
      
      if (data.success && data.products.length > 0) {
        const foundProduct = data.products[0];
        console.log('Found product:', foundProduct);
        setProduct(foundProduct);
        
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
          const colorImages = foundProduct.images?.[foundProduct.colors[0]];
          if (colorImages && colorImages.length > 0) {
            const images = [
              foundProduct.primaryImage,
              ...colorImages.slice(0, 3)
            ];
            setProductImages(images);
            setSelectedImage(0);
          } else {
            setProductImages([foundProduct.primaryImage].filter(Boolean));
            setSelectedImage(0);
          }
        } else {
          setProductImages([foundProduct.primaryImage].filter(Boolean));
          setSelectedImage(0);
        }
      } else {
        console.log('Product not found with direct ID lookup');
        setProduct(null);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      _id: product._id || product.id,
      id: product.id || product._id,
      name: product.name,
      price: product.price,
      image: product.primaryImage || product.image,
    }, quantity, selectedColor);
  };

  const getColorCode = (colorName) => {
    const colors = {
      Azure: '#007FFF',
      Celeste: '#B2FFFF',
      Charcoal: '#36454F',
      Coffee: '#6F4E37',
      Coral: '#FF7F50',
      Fern: '#4F7942',
      Innocent: '#F5F5DC',
      'Sand Castle': '#D8C59F',
      Pink: '#FFC0CB',
      Blue: '#4169E1',
      Green: '#228B22',
      White: '#FFFFFF',
      Black: '#000000',
      Natural: '#A67B5B',
      Walnut: '#5C4033',
      Bamboo: '#906F5D',
      'Natural Wood': '#8B5A2B',
      Terracotta: '#E2725B',
      Multi: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
    };
    return colors[colorName] || '#CCCCCC';
  };

  // Get text color based on background color (for better contrast)
  const getTextColorForBackground = (bgColor) => {
    // For light colors, return dark text; for dark colors, return light text
    const lightColors = ['#B2FFFF', '#F5F5DC', '#D8C59F', '#EFDECD', '#FFC0CB', '#FFFFFF', '#FFFDD0'];
    if (lightColors.includes(bgColor)) {
      return '#131212'; // dark text for light backgrounds
    }
    return '#FFFFFF'; // white text for dark backgrounds
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <MobileNav />
        <div className="lg:ml-[280px] flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-[#fbb710] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <MobileNav />
        <div className="lg:ml-[280px] flex items-center justify-center min-h-screen">
          <div className="text-center px-4">
            <h1 className="text-xl font-heading font-semibold text-[#131212] mb-2">
              Product not found
            </h1>
            <p className="text-sm text-[#6b6b6b] mb-4">
              The product you are looking for does not exist.
            </p>
            <Link
              href="/products"
              className="inline-block px-4 py-2 bg-[#fbb710] text-white text-sm hover:bg-[#52dd28ff] transition-colors"
            >
              Browse Products
            </Link>
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

        {/* Breadcrumb - Mobile Optimized */}
        <div className="px-3 sm:px-4 lg:px-8 py-3 text-[10px] sm:text-xs font-medium tracking-wide text-[#6b6b6b] flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#131212] transition-colors">
            HOME
          </Link>
          <span>&gt;</span>
          <Link href="/products" className="hover:text-[#131212] transition-colors">
            SHOP
          </Link>
          <span>&gt;</span>
          <Link href={`/products#${product.category}`} className="hover:text-[#131212] transition-colors capitalize">
            {product.category}
          </Link>
          <span>&gt;</span>
          <span className="text-[#131212] truncate max-w-[120px] sm:max-w-none">{product.name}</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-3 sm:px-4 lg:px-8 pb-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Image Gallery */}
            <div className="w-full lg:max-w-[600px]">
              <div className="w-full aspect-[4/5] overflow-hidden bg-[#f5f7fa] mb-2 sm:mb-3 lg:mb-4">
                <img
                  src={productImages[selectedImage] || product.primaryImage || product.image}
                  alt={`${product.name} - ${selectedColor} - View ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images - Exactly 3 boxes */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-3 mb-4">
                  {productImages.slice(1).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i + 1)}
                      className={`aspect-square overflow-hidden border-2 transition-colors ${
                        selectedImage === i + 1 ? 'border-[#fbb710]' : 'border-transparent hover:border-[#ebebeb]'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} - ${selectedColor} - Thumbnail ${i + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Color Image Grid */}
              {product.images && Object.keys(product.images).length > 0 && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">More Images by Color</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {Object.entries(product.images).map(([color, images]) => (
                      <div key={color} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: getColorCode(color) }}
                          />
                          <span className="text-xs font-medium text-gray-700">{color}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {images.slice(0, 4).map((img, idx) => (
                            <div 
                              key={idx}
                              className="aspect-square overflow-hidden rounded border border-gray-200 hover:border-[#fbb710] transition-colors cursor-pointer"
                              onClick={() => {
                                // Switch to this color and show its images
                                setSelectedColor(color);
                                const colorImages = product.images[color];
                                if (colorImages && colorImages.length > 0) {
                                  const imagesToShow = [
                                    product.primaryImage,
                                    ...colorImages.slice(0, 3)
                                  ];
                                  setProductImages(imagesToShow);
                                  setSelectedImage(0);
                                }
                              }}
                            >
                              <img 
                                src={img} 
                                alt={`${product.name} - ${color} - ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        {images.length > 4 && (
                          <span className="text-xs text-gray-500">
                            +{images.length - 4} more
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 max-w-[500px] pt-2 lg:pt-4">
              {/* Price bar */}
              <div className="w-8 sm:w-10 lg:w-12 h-[2px] sm:h-[3px] bg-[#fbb710] mb-3 sm:mb-4" />
              
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#131212] mb-2 lg:mb-3">
                {product.name}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#fbb710] mb-1">
                {formatPrice(product.price)}
              </p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-xs sm:text-sm text-[#6b6b6b] line-through mb-2">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
              
              {/* Rating */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        i < Math.floor(product.rating || 4.5) 
                          ? 'fill-[#fbb710] text-[#fbb710]' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-1 sm:ml-2 text-[10px] sm:text-sm text-[#6b6b6b]">
                    ({product.reviews || 0} reviews)
                  </span>
                </div>
                <button className="text-[10px] sm:text-sm text-[#6b6b6b] hover:text-[#fbb710] underline">
                  Write A Review
                </button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                <span 
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" 
                  style={{ backgroundColor: product.inStock ? '#22c55e' : '#ef4444' }}
                />
                <span className="text-xs sm:text-sm text-[#6b6b6b]">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed mb-6 sm:mb-8">
                {product.description}
              </p>

              {/* Color Selection - Checkboxes */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-medium text-[#131212] mb-2 sm:mb-3">
                    Colors:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {product.colors.map((color) => (
                      <label 
                        key={color}
                        className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                          selectedColor === color 
                            ? 'border-[#fbb710] bg-[#fffbeb]' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="color-selection"
                          checked={selectedColor === color}
                          onChange={() => setSelectedColor(color)}
                          className="w-4 h-4 text-[#fbb710] focus:ring-[#fbb710] border-gray-300"
                        />
                        <div 
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: getColorCode(color) }}
                          title={color}
                        />
                        <span className="text-xs sm:text-sm text-[#131212] truncate">
                          {color}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty Selector */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <span className="text-xs sm:text-sm font-medium text-[#131212]">Qty</span>
                <div className="flex items-center border border-[#ebebeb]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 sm:p-2 hover:bg-[#f5f7fa] transition-colors"
                    disabled={!product.inStock}
                  >
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-[#6b6b6b]" />
                  </button>
                  <span className="w-8 sm:w-12 text-center text-xs sm:text-sm font-medium text-[#131212]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 sm:p-2 hover:bg-[#f5f7fa] transition-colors"
                    disabled={!product.inStock}
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-[#6b6b6b]" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full h-10 sm:h-12 lg:h-14 bg-[#fbb710] text-white text-xs sm:text-sm lg:text-base font-semibold hover:bg-[#52dd28ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#52dd28ff] flex items-center justify-center gap-1 sm:gap-2"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {product.inStock ? 'Add to cart' : 'Out of Stock'}
              </button>

              {/* Product Meta */}
              <div className="border-t border-[#ebebeb] pt-4 sm:pt-5 lg:pt-6 mt-4 sm:mt-5 lg:mt-6">
                <div className="grid grid-cols-2 gap-2 sm:gap-4 text-[10px] sm:text-sm">
                  <div>
                    <span className="font-medium text-[#131212]">Category:</span>
                    <span className="text-[#6b6b6b] ml-1 sm:ml-2 capitalize">{product.category}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#131212]">Brand:</span>
                    <span className="text-[#6b6b6b] ml-1 sm:ml-2 uppercase">{product.brand}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <ScrollToTop visible={showScrollTop} />
      </div>
    </div>
  );
}