'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ProductCard from '@/components/ProductCard';
import { CATEGORY_INFO } from '@/lib/product-data';

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'drinkware', name: 'Drinkware' },
  { id: 'tableware', name: 'Tableware' },
  { id: 'storage', name: 'Storage' },
  { id: 'kitchenware', name: 'Kitchenware' },
  { id: 'homeware', name: 'Homeware' },
  { id: 'bakeware', name: 'Bakeware' },
  { id: 'gardenware', name: 'Gardenware' },
  { id: 'gifting', name: 'Gifting' },
];

const colorOptions = [
  { name: 'Azure', color: '#007FFF' },
  { name: 'Celeste', color: '#B2FFFF' },
  { name: 'Charcoal', color: '#36454F' },
  { name: 'Coffee', color: '#6F4E37' },
  { name: 'Coral', color: '#b31313ff' },
  { name: 'Fern', color: '#4F7942' },
  { name: 'Sand Castle', color: '#D8C59F' },
  { name: 'Innocent', color: '#F5F5DC' },
  { name: 'Pink', color: '#FFC0CB' },
  { name: 'Blue', color: '#4169E1' },
  { name: 'Green', color: '#228B22' },
  { name: 'White', color: '#FFFFFF' },
  { name: 'Black', color: '#000000' },
  { name: 'Natural', color: '#A67B5B' },
  { name: 'Walnut', color: '#5C4033' },
  { name: 'Bamboo', color: '#906F5D' },
  { name: 'Terracotta', color: '#E2725B' },
  { name: 'Multi', color: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)' },
];

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

const PRODUCTS_PER_PAGE = 9;

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    if (products.length > 0) {
      let filtered = [...products];

      // Filter by category
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }

      // Filter by colors
      if (selectedColors.length > 0) {
        filtered = filtered.filter(p => 
          p.colors && p.colors.some(color => selectedColors.includes(color))
        );
      }

      // Filter by price
      filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

      // Filter by stock
      if (inStockOnly) {
        filtered = filtered.filter(p => p.inStock);
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }

      const total = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
      
      setFilteredProducts(filtered);
      setTotalPages(total);
      setCurrentPage(1);
    }
  }, [products, selectedCategory, selectedColors, priceRange, inStockOnly, sortBy]);

  // Paginate products
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const paginated = filteredProducts.slice(startIndex, endIndex);
      setPaginatedProducts(paginated);
    }
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedColors([]);
    setPriceRange([0, 2500]);
    setInStockOnly(false);
    setSortBy('default');
  };

  const toggleColor = (colorName) => {
    setSelectedColors(prev => 
      prev.includes(colorName) 
        ? prev.filter(c => c !== colorName)
        : [...prev, colorName]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <MobileNav />
        <div className="lg:ml-[280px] flex flex-col min-h-screen">
          <div className="h-14 lg:hidden"></div>
          <div className="flex-1 px-3 sm:px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted aspect-square w-full mb-2 sm:mb-4 rounded"></div>
                  <div className="h-3 sm:h-4 bg-muted w-3/4 mb-1 sm:mb-2 rounded"></div>
                  <div className="h-3 sm:h-4 bg-muted w-1/2 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        <div className="h-14 lg:hidden"></div>

        <div className="flex-1 px-3 sm:px-6 py-4">
          {/* Mobile filter toggle */}
          <div className="flex items-center gap-3 mb-4 lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-border text-muted-foreground text-sm hover:text-[#52dd28ff] transition-colors rounded"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-border text-sm text-muted-foreground focus:outline-none focus:border-[#52dd28ff] flex-1 bg-background rounded"
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Filters sidebar */}
            <aside className={`lg:w-56 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-background p-3 sticky top-16 lg:top-4 space-y-6 border border-border rounded-box">
                {/* Sort - desktop only */}
                <div className="hidden lg:block">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-border text-sm text-muted-foreground focus:outline-none focus:border-[#52dd28ff] bg-background rounded-box"
                  >
                    {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-[#52dd28ff] mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`px-3 py-1.5 text-xs border rounded-box transition-colors w-100 ${
                          selectedCategory === c.id
                            ? 'bg-[#52dd28ff] text-white border-[#52dd28ff]'
                            : 'bg-background text-muted-foreground border-border hover:border-[#52dd28ff] hover:text-[#52dd28ff]'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <h3 className="text-sm font-medium text-[#52dd28ff] mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="2500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-[#52dd28ff]"
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="bg-muted px-2 py-1 rounded">₹{priceRange[0]}</span>
                      <span className="text-[#52dd28ff]">—</span>
                      <span className="bg-muted px-2 py-1 rounded">₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* In Stock Only */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-[#52dd28ff] border-border rounded focus:ring-[#52dd28ff]"
                  />
                  <label htmlFor="inStock" className="text-sm text-muted-foreground">
                    In Stock Only
                  </label>
                </div>

                {/* Clear All */}
                <button
                  onClick={clearFilters}
                  className="w-full text-sm text-muted-foreground hover:text-[#52dd28ff] transition-colors py-2 border border-border hover:border-[#52dd28ff] rounded-box"
                >
                  Clear All Filters
                </button>

                {/* Close filters for mobile */}
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden w-full py-2 border border-border text-muted-foreground hover:text-[#52dd28ff] transition-colors rounded"
                >
                  Close Filters
                </button>
              </div>
            </aside>

            {/* Products grid */}
            <main className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-[#52dd28ff] text-white text-sm hover:bg-[#45b824] transition-colors rounded"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Products count */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-muted-foreground">
                      Showing {filteredProducts.length > 0 ? (currentPage - 1) * PRODUCTS_PER_PAGE + 1 : 0} - {Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length}
                    </p>
                    <p className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      Page {currentPage}/{totalPages || 1}
                    </p>
                  </div>

                  {/* Products grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-8">
                    {paginatedProducts.map((product, i) => (
                      <motion.div
                        key={product._id || product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <ProductCard
                          product={product}
                          categoryImage={CATEGORY_INFO[product.category]?.image}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4 mb-8">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 border border-border rounded disabled:opacity-30 text-muted-foreground hover:border-[#52dd28ff] hover:text-[#52dd28ff] transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`px-3 py-1 border text-sm rounded transition-colors ${
                            currentPage === p
                              ? 'bg-[#52dd28ff] text-white border-[#52dd28ff]'
                              : 'border-border text-muted-foreground hover:border-[#52dd28ff] hover:text-[#52dd28ff]'
                          }`}
                        >
                          {p}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-border rounded disabled:opacity-30 text-muted-foreground hover:border-[#52dd28ff] hover:text-[#52dd28ff] transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>

        <Footer />
      </div>

      <ScrollToTop visible={showScrollTop} />
    </div>
  );
}