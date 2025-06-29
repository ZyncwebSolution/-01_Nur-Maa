import * as React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { ArrowRight, ShoppingCart, Leaf, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard: React.FC<{ product: Product; onQuickPurchase?: (product: Product) => void }> = ({ 
  product, 
  onQuickPurchase 
}) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = React.useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };
  
  const handleQuickPurchase = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickPurchase?.(product);
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="h-full flex flex-col bg-[#EBEBD3] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-2 border-[#121769]/10 hover:border-[#121769]/30"
        whileHover={{ y: -8 }}
        style={{
          background: isHovered 
            ? 'linear-gradient(145deg, #EBEBD3, #ffffff)' 
            : '#EBEBD3'
        }}
      >
        {/* Layered image composition */}
        <div className="relative aspect-square bg-white overflow-hidden">
          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between z-30">
            {product.featured && (
              <span className="bg-[#FE49AF] text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                Featured
              </span>
            )}
            <span className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${
              product.category === "skincare" 
                ? "bg-[#121769]/10 text-[#121769]" 
                : "bg-[#67246A]/10 text-[#67246A]"
            }`}>
              {product.category === "skincare" ? (
                <>
                  <Leaf className="h-3 w-3" />
                  Skincare
                </>
              ) : (
                <>
                  <Utensils className="h-3 w-3" />
                  Food
                </>
              )}
            </span>
          </div>

          {/* Main product image container */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {/* Background image (emerges from behind the main image) */}
            <AnimatePresence>
              {isHovered && product.bgImage && (
                <motion.div
                  className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0, scale: 0.9, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 1,
                    scale: 1.15,
                    x: 80,
                    y: -40,
                    transition: { 
                      duration: 0.6, 
                      ease: [0.22, 1, 0.36, 1],
                      scale: { duration: 0.8 }
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.9,
                    x: 0, 
                    y: 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  <img
                    src={product.bgImage}
                    alt="background"
                    className="object-contain"
                    style={{ 
                      width: '40%', 
                      height: '40%',
                      filter: 'drop-shadow(0 4px 8px rgba(18, 23, 105, 0.2))'
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main product image */}
            <motion.div 
              className="relative z-10 w-full h-full flex items-center justify-center"
              animate={{
                y: isHovered ? -10 : [0, -15, 0],
                scale: isHovered ? 1.05 : 1
              }}
              transition={{
                y: { duration: 0.3 },
                scale: { duration: 0.3 },
                default: isHovered ? {} : {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-3/4 h-3/4 object-contain"
                style={{
                  filter: 'drop-shadow(0 8px 16px rgba(18, 23, 105, 0.3))',
                  transition: 'all 0.3s ease'
                }}
              />
            </motion.div>

            {/* Foreground image (emerges from behind the main image) */}
            <AnimatePresence>
              {isHovered && product.fgImage && (
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0, scale: 0.9, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 1,
                    scale: 1.15,
                    x: -80,
                    y: 40,
                    transition: { 
                      duration: 0.6, 
                      ease: [0.22, 1, 0.36, 1],
                      scale: { duration: 0.8 }
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.9,
                    x: 0, 
                    y: 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  <img
                    src={product.fgImage}
                    alt="foreground"
                    className="object-contain"
                    style={{ 
                      width: '40%', 
                      height: '40%',
                      filter: 'drop-shadow(0 4px 8px rgba(103, 36, 106, 0.2))'
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Gradient overlay */}
          <motion.div 
            className="absolute inset-0 z-5"
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, rgba(254, 73, 175, 0.05) 0%, rgba(103, 36, 106, 0.05) 100%)'
                : 'none'
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Product info */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-[#121769] mb-2 uppercase tracking-wider">
              {product.name}
            </h3>
            <p className="text-sm text-[#67246A]/90 line-clamp-2 italic">
              {product.description}
            </p>
          </div>
          
          {/* Price and actions */}
          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-[#121769]">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
              <motion.button
                onClick={handleAddToCart}
                className="p-2 bg-[#121769]/10 rounded-full hover:bg-[#121769]/20 transition-colors"
                whileHover={{ scale: 1.05, backgroundColor: '#121769/20' }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="h-5 w-5 text-[#121769]" />
              </motion.button>
            </div>
            
            <motion.button
              onClick={handleQuickPurchase}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#121769] to-[#67246A] text-[#EBEBD3] py-3 px-4 rounded-lg text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all"
              whileHover={{ 
                scale: 1.02,
                background: 'linear-gradient(to right, #121769, #FE49AF)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Buy Now
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;