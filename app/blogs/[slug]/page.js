// app/blogs/[slug]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Tag, Share2, BookOpen } from 'lucide-react';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/sections/Footer';
import { getBlogBySlug, getRelatedPosts } from '@/lib/blogData';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const slug = params?.slug;
    if (slug) {
      const foundPost = getBlogBySlug(slug);
      setPost(foundPost);
      if (foundPost) {
        setRelatedPosts(getRelatedPosts(slug, 3));
      }
    }
  }, [params]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Render markdown-like content with basic formatting
  const renderContent = (content) => {
    if (!content) return null;
    
    const lines = content.trim().split('\n');
    const elements = [];
    let listItems = [];
    let inList = false;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} style={{
            listStyle: 'none',
            padding: 0,
            margin: '16px 0'
          }}>
            {listItems.map((item, i) => (
              <li key={i} style={{
                padding: '8px 0 8px 24px',
                position: 'relative',
                fontSize: '17px',
                lineHeight: 1.8,
                color: '#3a3a3a'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#52dd28ff',
                  fontWeight: 700
                }}>•</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineText(item) }} />
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
      inList = false;
    };

    const formatInlineText = (text) => {
      return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em style="color: #555; font-style: italic;">$1</em>')
        .replace(/`(.+?)`/g, '<code style="background: #f5f7fa; padding: 2px 6px; border-radius: 4px; font-size: 15px;">$1</code>');
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      if (!trimmed) {
        flushList();
        return;
      }

      // Horizontal rule
      if (trimmed === '---') {
        flushList();
        elements.push(
          <hr key={`hr-${index}`} style={{
            border: 'none',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #ebebeb, transparent)',
            margin: '40px 0'
          }} />
        );
        return;
      }

      // H2
      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={`h2-${index}`} style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#131212',
            marginTop: '40px',
            marginBottom: '16px',
            lineHeight: 1.3
          }}>
            {trimmed.slice(3)}
          </h2>
        );
        return;
      }

      // H3
      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={`h3-${index}`} style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#131212',
            marginTop: '28px',
            marginBottom: '12px',
            lineHeight: 1.4
          }}>
            {trimmed.slice(4)}
          </h3>
        );
        return;
      }

      // Numbered list
      if (/^\d+\.\s/.test(trimmed)) {
        flushList();
        const text = trimmed.replace(/^\d+\.\s/, '');
        elements.push(
          <div key={`ol-${index}`} style={{
            padding: '8px 0 8px 28px',
            position: 'relative',
            fontSize: '17px',
            lineHeight: 1.8,
            color: '#3a3a3a'
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#52dd28ff',
              fontWeight: 700,
              fontSize: '17px'
            }}>{trimmed.match(/^\d+/)[0]}.</span>
            <span dangerouslySetInnerHTML={{ __html: formatInlineText(text) }} />
          </div>
        );
        return;
      }

      // Bullet list
      if (trimmed.startsWith('- ')) {
        inList = true;
        listItems.push(trimmed.slice(2));
        return;
      }

      // Regular paragraph
      flushList();
      elements.push(
        <p key={`p-${index}`} style={{
          fontSize: '17px',
          lineHeight: 1.9,
          color: '#3a3a3a',
          marginBottom: '16px'
        }}
          dangerouslySetInnerHTML={{ __html: formatInlineText(trimmed) }}
        />
      );
    });

    flushList();
    return elements;
  };

  // Not found state
  if (params?.slug && !post) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <MobileNav />
        <div className="lg:ml-[280px] flex flex-col min-h-screen">
          <div className="h-14 lg:hidden"></div>
          <div className="flex-1 w-full flex flex-col" style={{
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: '40px 20px',
            textAlign: 'center'
          }}>
            <BookOpen style={{ width: 64, height: 64, color: '#ebebeb', marginBottom: 24 }} />
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#131212', marginBottom: 12 }}>
              Blog Post Not Found
            </h1>
            <p style={{ fontSize: '16px', color: '#6b6b6b', marginBottom: 32 }}>
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blogs" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#52dd28ff',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}>
              <ArrowLeft style={{ width: 16, height: 16 }} />
              Back to Blog
            </Link>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <MobileNav />

      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        <div className="h-14 lg:hidden"></div>

        <div className="flex-1 w-full flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* Hero Image */}
          <div style={{
            position: 'relative',
            height: 'clamp(300px, 45vh, 480px)',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)',
              zIndex: 1
            }} />
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.src = '/images/product-chai-cups.jpg';
              }}
            />

            {/* Hero Content Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 'clamp(24px, 5vw, 48px)',
              zIndex: 2
            }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Category Badge */}
                <span style={{
                  display: 'inline-block',
                  backgroundColor: '#52dd28ff',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '5px 14px',
                  borderRadius: '20px',
                  marginBottom: '16px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  {post.category}
                </span>

                {/* Title */}
                <h1 style={{
                  fontSize: 'clamp(24px, 4vw, 40px)',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.2,
                  marginBottom: '16px',
                  maxWidth: '800px'
                }}>
                  {post.title}
                </h1>

                {/* Meta */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '20px',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User style={{ width: 16, height: 16 }} />
                    <span>{post.author}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar style={{ width: 16, height: 16 }} />
                    <span>{post.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock style={{ width: 16, height: 16 }} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            padding: 'clamp(32px, 5vw, 56px) clamp(20px, 5vw, 40px)'
          }}
        >
          {/* Back + Share Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '36px',
            paddingBottom: '20px',
            borderBottom: '1px solid #ebebeb'
          }}>
            <Link href="/blogs" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#6b6b6b',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#52dd28ff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b6b6b'}
            >
              <ArrowLeft style={{ width: 16, height: 16 }} />
              Back to Blog
            </Link>

            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px',
                fontWeight: 500,
                color: copied ? '#52dd28ff' : '#6b6b6b',
                background: 'none',
                border: '1px solid #ebebeb',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#52dd28ff';
                e.currentTarget.style.color = '#52dd28ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#ebebeb';
                e.currentTarget.style.color = copied ? '#52dd28ff' : '#6b6b6b';
              }}
            >
              <Share2 style={{ width: 16, height: 16 }} />
              {copied ? 'Link Copied!' : 'Share'}
            </button>
          </div>

          {/* Article Body */}
          <article style={{ fontFamily: 'inherit' }}>
            {renderContent(post.content)}
          </article>

          {/* Tags */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid #ebebeb'
          }}>
            <Tag style={{ width: 16, height: 16, color: '#6b6b6b', marginTop: '4px' }} />
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '13px',
                  color: '#6b6b6b',
                  backgroundColor: '#f5f7fa',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#52dd28ff';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f7fa';
                  e.currentTarget.style.color = '#6b6b6b';
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div style={{
            backgroundColor: '#fafbfc',
            padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 40px)'
          }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#131212',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                Related Articles
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6b6b6b',
                textAlign: 'center',
                marginBottom: '40px'
              }}>
                Continue reading about similar topics
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '28px'
              }}>
                {relatedPosts.map((related, index) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/blogs/${related.slug}`} style={{ textDecoration: 'none' }}>
                      <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid #ebebeb',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                          e.currentTarget.style.borderColor = 'rgba(82, 221, 40, 0.3)';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.borderColor = '#ebebeb';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#f5f7fa' }}>
                          <img
                            src={related.image}
                            alt={related.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.5s ease'
                            }}
                            onError={(e) => {
                              e.target.src = '/images/product-chai-cups.jpg';
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          />
                        </div>
                        <div style={{ padding: '20px' }}>
                          <span style={{
                            display: 'inline-block',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#52dd28ff',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '8px'
                          }}>
                            {related.category}
                          </span>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#131212',
                            lineHeight: 1.4,
                            marginBottom: '8px'
                          }}>
                            {related.title}
                          </h3>
                          <p style={{
                            fontSize: '14px',
                            color: '#6b6b6b',
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {related.excerpt}
                          </p>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '16px',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#52dd28ff'
                          }}>
                            Read Article
                            <ArrowRight style={{ width: 14, height: 14 }} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
