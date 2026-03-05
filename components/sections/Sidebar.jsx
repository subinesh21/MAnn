'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Mail, Facebook, Twitter, Instagram, FileText } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: 'products' },
  { name: 'Shop', href: '/shop' },
  { name: 'Cart', href: '/cart' },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
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
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        padding: '60px 40px 10px 40px',
        overflowY: 'auto'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '40px' }}>
          <a href="/" style={{ fontSize: '30px', fontWeight: 'bold', color: '#131212' }}>
            <span style={{ color: '#52dd28ff' }}>Thulira</span>
          </a>
          <p style={{ fontSize: '12px', color: '#6b6b6b', marginTop: '4px', marginLeft: '4px', letterSpacing: '3px' }}>
            SUSTAINABLE LIVING
          </p>
        </div>

        {/* Navigation */}
        <nav style={{ marginBottom: '30px', marginLeft: '28px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navItems.map((item) => (
              <li key={item.name} style={{ marginBottom: '30px' }}>
                <a 
                  href={item.href}
                  style={{
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: pathname === item.href ? '#52dd28ff' : '#131212',
                    letterSpacing: '1px',
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

        {/* Blogs Button */}
        <div style={{ marginBottom: '16px', marginLeft: '16px' }}>
          <a 
            href="/blogs" 
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              textAlign: 'left',
              textDecoration: 'none'
            }}
          >
            <FileText style={{ width: '20px', height: '20px', marginRight: '16px', color: '#6b6b6b' }} />
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#131212' }}>
              Blogs
            </span>
          </a>
        </div>

        {/* Search Section */}
        <div style={{ marginBottom: '24px', marginLeft: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <i className="fa fa-search" style={{ marginRight: '16px', color: '#6b6b6b' }}></i>
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#131212' }}>Search</span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Search submitted');
            }}
          >
            <input 
              type="search" 
              placeholder="Type your keyword..."
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ebebeb',
                fontSize: '14px',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#52dd28ff';
                e.currentTarget.style.boxShadow = '0 0 0 1px #52dd28ff';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#ebebeb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </form>
        </div>

        {/* Account Section */}
        <div style={{ paddingTop: '24px', paddingBottom: '24px', marginLeft: '16px', borderTop: '1px solid #ebebeb' }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  color: '#131212',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <i className="fa fa-sign-out" style={{ marginRight: '16px' }}></i>
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
              <i className="fa fa-user" style={{ marginRight: '16px', color: '#52dd28ff' }}></i>
              Account
            </a>
          )}
        </div>

        {/* Social Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          <a href="#" style={{ color: '#6b6b6b' }} aria-label="Email">
            <Mail style={{ width: '24px', height: '24px' }} />
          </a>
          <a href="#" style={{ color: '#6b6b6b' }} aria-label="Facebook">
            <Facebook style={{ width: '24px', height: '24px' }} />
          </a>
          <a href="#" style={{ color: '#6b6b6b' }} aria-label="Twitter">
            <Twitter style={{ width: '24px', height: '24px' }} />
          </a>
          <a href="#" style={{ color: '#6b6b6b' }} aria-label="Instagram">
            <Instagram style={{ width: '24px', height: '24px' }} />
          </a>
        </div>
      </header>

      <style jsx>{`
        .mobile-nav {
          display: flex;
        }
        
        @media (min-width: 992px) {
          .mobile-nav {
            display: none;
          }
        }

        a:hover, button:hover {
          color: #52dd28ff !important;
        }
        
        button:hover i {
          color: #52dd28ff !important;
        }
        
        a:hover i {
          color: #52dd28ff !important;
        }
        
        a:hover span {
          color: #52dd28ff !important;
        }
        
        .fa, .fa-search, .fa-user, .fa-sign-out {
          transition: color 0.3s ease;
        }
      `}</style>
    </>
  );
}