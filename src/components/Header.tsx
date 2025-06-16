import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import logo from '@/assets/images/logonurmaa.png';

const Header: React.FC = () => {
  const { totalItems, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
    { label: 'Products', path: '/products' },
  { label: 'Testimonials', path: '/testimonials' },
    { label: 'Cart', path: '/cart' },
    { label: 'Contact', path: '/contact' },
    
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#ffffff]/90 backdrop-blur shadow-md py-3' : 'bg-[#ffffff] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="Nurmaa Logo" 
            className="h-12 object-contain transition-transform duration-300 hover:scale-110" 
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`relative font-medium text-lg transition-colors duration-300 ${
                location.pathname === path ? 'text-[#67246a] font-bold' : 'text-[#121769] hover:text-[#FE49AF]'
              } group`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {label}
              <span 
                className={`absolute left-0 -bottom-1 h-[2px] bg-[#FE49AF] transition-all duration-300 ${
                  location.pathname === path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          ))}

          <button
            onClick={toggleCart}
            className="relative group ml-4"
            aria-label="Open cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-[#121769] group-hover:text-[#FE49AF] transition-transform duration-300 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FE49AF] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleCart} 
            className="relative mr-4 group"
            aria-label="Open cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-[#121769] group-hover:text-[#FE49AF] transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FE49AF] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="text-[#121769] hover:text-[#FE49AF] transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#EBEBD3] shadow-lg animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex flex-col space-y-5">
              {navLinks.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`text-lg font-medium py-2 transition-colors ${
                    location.pathname === path 
                      ? 'text-[#67246a] font-bold border-l-4 border-[#FE49AF] pl-3' 
                      : 'text-[#121769] hover:text-[#FE49AF] pl-4'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;