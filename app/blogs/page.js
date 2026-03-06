// app/blogs/page.js
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowRight, Search, Tag, ChevronRight } from 'lucide-react';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/sections/Footer';

import { blogPosts, categories } from '@/lib/blogData';

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState(6);

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <MobileNav />

      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        <div className="h-14 lg:hidden"></div>

        <div className="flex-1 w-full flex flex-col">
        <div className="relative bg-gradient-to-r from-[#52dd28ff]/10 to-[#52dd28ff]/5 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#131212] mb-4">
                Our <span className="text-[#52dd28ff]">Blog</span>
              </h1>
              <p className="text-lg text-[#6b6b6b] mb-8">
                Discover tips, guides, and stories about sustainable living and eco-friendly products
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 pr-12 border border-[#ebebeb] rounded-lg focus:outline-none focus:border-[#52dd28ff] focus:ring-1 focus:ring-[#52dd28ff]"
                />
                <Search className="absolute right-4 top-3.5 w-5 h-5 text-[#6b6b6b]" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Categories */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${selectedCategory === category
                    ? 'bg-[#52dd28ff] text-white shadow-md'
                    : 'bg-white text-[#6b6b6b] border border-[#ebebeb] hover:border-[#52dd28ff] hover:text-[#52dd28ff]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-[#131212] mb-2">No posts found</h3>
              <p className="text-[#6b6b6b]">Try adjusting your search or filter</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#ebebeb] hover:border-[#52dd28ff]/30"
                  >
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden bg-[#f5f7fa]">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = '/images/product-chai-cups.jpg';
                        }}
                      />
                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 z-20 bg-[#52dd28ff] text-white text-xs font-medium px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-[#6b6b6b] mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-[#131212] mb-3 line-clamp-2 group-hover:text-[#52dd28ff] transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-[#6b6b6b] text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Author and Read More */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#f5f7fa] rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-[#6b6b6b]" />
                          </div>
                          <span className="text-sm text-[#6b6b6b]">{post.author}</span>
                        </div>

                        <Link
                          href={`/blogs/${post.slug}`}
                          className="flex items-center gap-1 text-sm font-medium text-[#52dd28ff] hover:gap-2 transition-all"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#ebebeb]">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-[#6b6b6b] bg-[#f5f7fa] px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Load More Button */}
              {visiblePosts < filteredPosts.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setVisiblePosts(prev => prev + 3)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#52dd28ff] text-[#52dd28ff] font-medium rounded-lg hover:bg-[#52dd28ff] hover:text-white transition-all duration-300"
                  >
                    Load More Articles
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}