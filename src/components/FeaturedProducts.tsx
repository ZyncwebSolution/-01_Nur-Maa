import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Product } from '@/lib/types';
import { motion, useInView } from 'framer-motion';
import { FaLeaf, FaStar, FaFire } from 'react-icons/fa';
import product3 from '@/assets/images/product3.png';
import product2 from '@/assets/images/product2.png';

import bg3 from '@/assets/images/bg3.png';
import bottle1 from '@/assets/images/—Pngtree—blue perfume glass bottle elegant_20856067.png';
import fg3 from '@/assets/images/fg3.png';

// Mock featured products
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Lavender Face Cream',
    category: 'skincare',
    description: 'A soothing face cream made with organic lavender essential oil and shea butter.',
    price: 24.99,
    image: product3 ,
     rating: 4.8,
    featured: true,
    tags: ['bestseller', 'organic']
  },
  {
    id: '2',
    name: 'Organic Honey',
    category: 'food',
    description: 'Pure, unfiltered honey sourced from local wildflowers and herbs.',
    price: 12.99,
    image: product2,
    rating: 5.0,
    featured: true,
    tags: ['new', 'limited']
  },
  {
    id: '3',
    name: 'Rosemary Hair Oil',
    category: 'skincare',
    description: 'Nourishing hair oil with rosemary and coconut oil for healthy, shiny hair.',
    price: 18.99,
    image: bottle1 ,
    rating: 4.6,
    featured: true,
    tags: ['vegan', 'bestseller']
  }
];

interface FeaturedProductsProps {
  onQuickPurchase?: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onQuickPurchase }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    floatReverse: {
      y: [0, 15, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }
    }
  };

  return (
    <motion.section 
      ref={ref}
      className="relative py-20 overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-nurmaa-green/10 blur-xl"
          variants={floatingVariants}
          animate="float"
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-nurmaa-purple/10 blur-xl"
          variants={floatingVariants}
          animate="floatReverse"
        />
      </div>

      <div className="nurmaa-container relative z-10">
        {/* Animated header */}
        <motion.div 
          className="text-center mb-16"
          variants={titleVariants}
        >
          <div className="inline-flex items-center mb-4">
            <motion.span 
              className="text-nurmaa-green mr-3"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <FaLeaf size={24} />
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nurmaa-green to-nurmaa-purple"
              whileHover={{ scale: 1.02 }}
            >
              Our Featured Products
            </motion.h2>
            <motion.span 
              className="text-nurmaa-purple ml-3"
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <FaStar size={24} />
            </motion.span>
          </div>
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            variants={titleVariants}
          >
            Discover our handpicked selection of bestselling products, each crafted with care and natural ingredients.
          </motion.p>
        </motion.div>
        
        {/* Product grid with staggered animations */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              custom={index}
            >
               
              <ProductCard 
                product={product} 
                
                onQuickPurchase={onQuickPurchase}
              />
            </motion.div>
          ))}
        </motion.div>

        
        
        {/* Animated CTA button */}
        <motion.div 
          className="text-center mt-16"
          variants={titleVariants}
        >
          <Link 
            to="/products" 
            className="relative inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-nurmaa-green to-nurmaa-purple text-white font-semibold overflow-hidden group"
          >
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-nurmaa-purple to-nurmaa-green opacity-0 group-hover:opacity-100 transition-all duration-500"
            />
            <span className="relative z-10 flex items-center">
              <motion.span 
                className="mr-3"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <FaFire />
              </motion.span>
              View All Products
              <motion.span 
                className="ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-5 w-6 h-6 rounded-full bg-nurmaa-amber/30 hidden md:block"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-5 w-8 h-8 rounded-full bg-nurmaa-purple/30 hidden md:block"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </motion.section>
  );
};

export default FeaturedProducts;