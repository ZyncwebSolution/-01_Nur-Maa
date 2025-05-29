import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import logo from '@/assets/images/logonurmaa.png';  // Import your logo here

const Header: React.FC = () => {
  const { totalItems, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-5' : 'bg-transparent py-8'  // Increased padding for height
      }`}
    >
      <div className="nurmaa-container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Nurmaa Logo" className="h-12 object-contain" /> {/* Logo image with height */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-nurmaa-purple transition-colors">
            Home
          </Link>
          <Link to="/products" className="font-medium hover:text-nurmaa-purple transition-colors">
            Products
          </Link>
          <Link to="/about" className="font-medium hover:text-nurmaa-purple transition-colors">
            About
          </Link>
          <Link to="/contact" className="font-medium hover:text-nurmaa-purple transition-colors">
            Contact
          </Link>
          <Link to="/cart" className="font-medium hover:text-nurmaa-purple transition-colors">
            Cart
          </Link>
          <button 
            onClick={toggleCart}
            className="relative group"
            aria-label="Open cart"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-nurmaa-dark group-hover:text-nurmaa-purple transition-colors"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-nurmaa-purple text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-cart-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleCart}
            className="relative mr-4"
            aria-label="Open cart"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-nurmaa-dark"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-nurmaa-purple text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-cart-bounce">
                {totalItems}
              </span>
            )}
          </button>
          <button 
            onClick={toggleMobileMenu}
            className="text-nurmaa-dark"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="nurmaa-container py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="font-medium py-2 hover:text-nurmaa-purple transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="font-medium py-2 hover:text-nurmaa-purple transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="font-medium py-2 hover:text-nurmaa-purple transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="font-medium py-2 hover:text-nurmaa-purple transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/cart" 
                className="font-medium py-2 hover:text-nurmaa-purple transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
