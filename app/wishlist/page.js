'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
    const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleAddToCart = (item) => {
        addToCart({
            _id: item._id,
            id: item.id || item._id,
            name: item.name,
            price: item.price,
            image: item.image,
        }, 1, item.colors?.[0] || null);
    };

    return (
        <div className="min-h-screen bg-white">
            <Sidebar />
            <MobileNav />

            <div className="lg:ml-[280px] flex flex-col min-h-screen">
                <div className="h-14 lg:hidden"></div>

                <div className="flex-1 px-4 sm:px-8 lg:px-12 py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                            <h1 className="text-2xl sm:text-3xl font-bold text-[#131212]" style={{ fontFamily: 'var(--font-cinzel), serif', letterSpacing: '1.5px' }}>
                                My Wishlist
                            </h1>
                            <span className="text-sm text-[#6b6b6b]">({wishlistItems.length} items)</span>
                        </div>
                        {wishlistItems.length > 0 && (
                            <button
                                onClick={clearWishlist}
                                className="text-xs sm:text-sm text-[#6b6b6b] hover:text-red-500 transition-colors underline"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {wishlistItems.length === 0 ? (
                        <div className="text-center py-16">
                            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                            <h2 className="text-lg font-medium text-[#131212] mb-2">Your wishlist is empty</h2>
                            <p className="text-sm text-[#6b6b6b] mb-6">Add items you love to your wishlist. Review them anytime and easily move them to cart.</p>
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#fbb710] text-white text-sm font-semibold hover:bg-[#52dd28ff] transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {wishlistItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex bg-white border border-[#ebebeb] rounded-lg overflow-hidden"
                                >
                                    {/* Image */}
                                    <Link href={`/detail/${item._id}`} className="flex-shrink-0 w-28 sm:w-36 lg:w-44">
                                        <div className="h-full bg-[#f5f7fa] overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.src = '/images/product-chai-cups.jpg'; }}
                                            />
                                        </div>
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
                                        <div>
                                            <Link href={`/detail/${item._id}`}>
                                                <h3 className="text-sm sm:text-base font-medium text-[#131212] line-clamp-2 mb-1 hover:text-[#fbb710] transition-colors" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[#fbb710] font-semibold text-sm sm:text-base">
                                                    {formatPrice(item.price)}
                                                </span>
                                                {item.originalPrice && (
                                                    <span className="text-[10px] sm:text-xs text-[#6b6b6b] line-through">
                                                        {formatPrice(item.originalPrice)}
                                                    </span>
                                                )}
                                            </div>
                                            {/* Color dots */}
                                            {item.colors && item.colors.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {item.colors.slice(0, 5).map((color, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-3 h-3 rounded-full border border-gray-200"
                                                            style={{ backgroundColor: color.toLowerCase() }}
                                                            title={color}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fbb710] text-white text-xs sm:text-sm font-medium hover:bg-[#52dd28ff] transition-colors rounded"
                                            >
                                                <ShoppingCart className="w-3.5 h-3.5" />
                                                Add to Cart
                                            </button>
                                            <button
                                                onClick={() => removeFromWishlist(item._id)}
                                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Remove from wishlist"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Footer />
                <ScrollToTop visible={showScrollTop} />
            </div>
        </div>
    );
}
