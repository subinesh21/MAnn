'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Mail, Facebook, Twitter, Instagram, FileText, User, Heart, Search, ChevronDown, MoreHorizontal } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Shop', href: '/shop' },
  { name: 'Cart', href: '/cart' },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreContentRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMobileMenuOpen]);

  // Determine account link based on authentication and role
  const getAccountLink = () => {
    if (!isAuthenticated) {
      return '/login';
    }
    return user?.role === 'admin' ? '/admin' : '/account';
  };

  // Don't render sidebar on mobile at all
  if (isMobile) {
    return (
      <>
        {/* Mobile Nav */}
        <div className="mobile-nav fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="amado-navbar-brand">
            <a href="/" className="text-2xl font-bold text-[#52dd28ff]">
              <span className="text-[#52dd28ff]">Thulira</span>
            </a>
          </div>
          <button
            className="amado-navbar-toggler flex flex-col gap-1 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="w-6 h-0.5 bg-[#52dd28ff]"></span>
            <span className="w-6 h-0.5 bg-[#52dd28ff]"></span>
            <span className="w-6 h-0.5 bg-[#52dd28ff]"></span>
          </button>
        </div>

        {/* Mobile Menu Overlay - This would be your separate mobile nav component */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </>
    );
  }

  // Desktop sidebar - full render
  return (
    <>
      <header style={{
        width: '280px',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#fff',
        borderRight: '1px solid #ebebeb',
        boxShadow: 'none',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0px 40px 20px 40px',
        overflow: 'hidden',
        height: '100vh'
      }}>

        {/* Top Section: Logo */}
        <div style={{ flexShrink: 0 }}>
          <a href="/" style={{ display: 'block' }}>
            <img
              src="/logo.png"
              alt="Thulira - Sustainable Living"
              style={{
                maxWidth: '100%',
                height: '160px',
                display: 'block'
              }}
            />
          </a>
        </div>

        {/* Top spacer - helps center nav vertically */}
        <div style={{ flex: 1 }} />

        {/* Navigation Section (does not shrink) */}
        <div style={{ flexShrink: 0 }}>
          <nav style={{ marginLeft: '28px', paddingTop: '10px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {navItems.map((item) => (
                <li key={item.name} style={{ marginBottom: 'clamp(10px, 2.5vh, 30px)' }}>
                  <a
                    href={item.href}
                    style={{
                      fontFamily: 'var(--font-cinzel), serif',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      color: pathname === item.href ? '#52dd28ff' : '#131212',
                      letterSpacing: '2px',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                      position: 'relative',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#52dd28ff';
                    }}
                    onMouseLeave={(e) => {
                      if (pathname !== item.href) {
                        e.currentTarget.style.color = '#131212';
                      }
                    }}
                  >
                    {item.name === 'Cart' ? `${item.name} (${cartCount})` : item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Flexible spacer - absorbs More dropdown expansion */}
        <div style={{ flex: 1 }} />

        {/* Bottom Section: Search + More + Account + Social (always pinned to bottom) */}
        <div style={{ flexShrink: 0 }}>

          {/* Search Section */}
          <div style={{ marginLeft: '16px', marginBottom: '4px', minHeight: '44px' }}>
            {!isSearchActive ? (
              <div
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px 0' }}
                onClick={() => setIsSearchActive(true)}
              >
                <Search style={{ width: '20px', height: '20px', marginRight: '16px', color: '#6b6b6b' }} />
                <span className="search-text-hover" style={{ fontSize: '14px', fontWeight: 500, color: '#131212', transition: 'color 0.3s ease' }}>Search</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                    setIsSearchActive(false);
                    setSearchQuery('');
                  }
                }}
              >
                <input
                  type="search"
                  placeholder="Type your keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    border: '1px solid #ebebeb',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#52dd28ff';
                    e.currentTarget.style.boxShadow = '0 0 0 1px #52dd28ff';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#ebebeb';
                    e.currentTarget.style.boxShadow = 'none';
                    if (!searchQuery.trim()) {
                      setIsSearchActive(false);
                    }
                  }}
                />
              </form>
            )}
          </div>

          {/* More Dropdown (opens upward, pushes search up) */}
          <div style={{ marginLeft: '16px', marginBottom: '8px', display: 'flex', flexDirection: 'column-reverse' }}>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="more-dropdown-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 0',
                transition: 'color 0.3s ease'
              }}
            >
              <MoreHorizontal style={{ width: '20px', height: '20px', marginRight: '16px', color: '#6b6b6b', transition: 'color 0.3s ease' }} />
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#131212', transition: 'color 0.3s ease' }}>More</span>
              <ChevronDown
                style={{
                  width: '16px',
                  height: '16px',
                  marginLeft: 'auto',
                  color: '#6b6b6b',
                  transition: 'transform 0.3s ease, color 0.3s ease',
                  transform: isMoreOpen ? 'rotate(0deg)' : 'rotate(180deg)'
                }}
              />
            </button>

            {/* Dropdown Content (appears above the button, pushes search up) */}
            <div
              ref={moreContentRef}
              style={{
                overflow: 'hidden',
                transition: 'max-height 0.3s ease, opacity 0.3s ease',
                maxHeight: isMoreOpen ? '120px' : '0px',
                opacity: isMoreOpen ? 1 : 0,
                paddingLeft: '12px'
              }}
            >
              <a
                href="/blogs"
                className="more-dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 0',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                <FileText style={{ width: '18px', height: '18px', marginRight: '14px', color: '#6b6b6b', transition: 'color 0.3s ease' }} />
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#131212', transition: 'color 0.3s ease' }}>Blogs</span>
              </a>
              <a
                href="/wishlist"
                className="more-dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 0',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                <Heart style={{ width: '18px', height: '18px', marginRight: '14px', color: '#6b6b6b', transition: 'color 0.3s ease' }} />
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#131212', transition: 'color 0.3s ease' }}>Wishlist</span>
              </a>
            </div>
          </div>

          {/* Account Section */}
          <div style={{ paddingTop: '16px', paddingBottom: '16px', marginLeft: '16px', borderTop: '1px solid #ebebeb' }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href={getAccountLink()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#52dd28ff',
                    textDecoration: 'none'
                  }}
                >
                  <i className="fa fa-user" style={{ marginRight: '16px', color: '#52dd28ff' }}></i>
                  Hi, {user?.name?.split(' ')[0]}
                  {user?.role === 'admin' && (
                    <span style={{ marginLeft: '8px', fontSize: '10px', color: '#52dd28ff', padding: '2px 6px', borderRadius: '999px' }}>Admin</span>
                  )}
                </a>
                <button
                  className="logout-btn"
                  onClick={logout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    color: '#353232ff',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ff0000';
                    const icon = e.currentTarget.querySelector('i');
                    if (icon) icon.style.color = '#ff0000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#353232ff';
                    const icon = e.currentTarget.querySelector('i');
                    if (icon) icon.style.color = '';
                  }}
                >
                  <i className="fa fa-sign-out" style={{ marginRight: '16px', transition: 'color 0.3s ease' }}></i>
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/account"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  color: '#52dd28ff',
                  textDecoration: 'none'
                }}
              >
                <User style={{ width: '18px', height: '18px', marginRight: '12px', color: '#52dd28ff' }} />
                Account
              </a>
            )}
          </div>
          {/* Social Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
            <a href="mailto:subinesh.b2c@gmail.com" className="social-btn social-mail" aria-label="Email">
              <Mail style={{ width: '22px', height: '22px' }} />
            </a>
            <a href="https://facebook.com/#" target="_blank" rel="noopener noreferrer" className="social-btn social-facebook" aria-label="Facebook">
              <Facebook style={{ width: '22px', height: '22px' }} />
            </a>
            <a href="https://wa.me/919087352282" target="_blank" rel="noopener noreferrer" className="social-btn social-whatsapp" aria-label="WhatsApp">
              <FaWhatsapp style={{ width: '22px', height: '22px' }} />
            </a>
            <a href="https://www.instagram.com/ur_friend_i_am/" target="_blank" rel="noopener noreferrer" className="social-btn social-instagram" aria-label="Instagram">
              <Instagram style={{ width: '22px', height: '22px' }} />
            </a>
          </div>
        </div>

      </header>

      <style jsx>{`
        .social-btn { color: #6b6b6b; transition: color 0.3s ease; }
        .social-mail:hover { color: #ea4335 !important; }
        .social-facebook:hover { color: #1877f2 !important; }
        .social-whatsapp:hover { color: #25D366 !important; }
        .social-instagram:hover { color: #e1306c !important; }
        
        .search-text-hover:hover { color: #52dd28ff !important; }

        .more-dropdown-btn:hover span,
        .more-dropdown-btn:hover svg { color: #52dd28ff !important; }

        .more-dropdown-item:hover span,
        .more-dropdown-item:hover svg { color: #52dd28ff !important; }

        .mobile-nav {
          display: flex;
        }
        
        @media (min-width: 992px) {
          .mobile-nav {
            display: none;
          }
        }

        a:hover, button:hover:not(.logout-btn) {
          color: #52dd28ff !important;
        }
        
        button:hover:not(.logout-btn) i {
          color: #52dd28ff !important;
        }

        .logout-btn:hover {
          color: #ff0000 !important;
        }
        
        .logout-btn:hover i {
          color: #ff0000 !important;
        }
        
        a:hover i {
          color: #52dd28ff !important;
        }
        
        a:hover span {
          color: #52dd28ff !important;
        }
        
        .fa, .fa-user, .fa-sign-out {
          transition: color 0.3s ease;
        }
      `}</style>
    </>
  );
}