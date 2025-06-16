// FeaturedProducts.tsx
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Product } from '@/lib/types';
import { motion, useInView } from 'framer-motion';
import { FaFire } from 'react-icons/fa';
import product3 from '@/assets/images/product3.png';
import product2 from '@/assets/images/product2.png';
import bottle1 from '@/assets/images/—Pngtree—blue perfume glass bottle elegant_20856067.png';
import bg1 from '@/assets/images/fg3.png';
import bg2 from '@/assets/images/bg2.png';
import bg3 from '@/assets/images/bg3.png';
 // Import your light background image

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Lavender Face Cream',
    category: 'skincare',
    description: 'A soothing face cream made with organic lavender essential oil and shea butter.',
    price: 24.99,
    image: product3,
    rating: 4.8,
    featured: true,
    tags: ['bestseller', 'organic'],
    bgImage: bg1,
    fgImage: bg1
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
    tags: ['new', 'limited'],
    bgImage: bg2,
    fgImage: bg2
  },
  {
    id: '3',
    name: 'Rosemary Hair Oil',
    category: 'skincare',
    description: 'Nourishing hair oil with rosemary and coconut oil for healthy, shiny hair.',
    price: 18.99,
    image: bottle1,
    rating: 4.6,
    featured: true,
    tags: ['vegan', 'bestseller'],
    bgImage: bg3,
    fgImage: bg3
  }
];

const FeaturedProducts: React.FC<{ onQuickPurchase?: (product: Product) => void }> = ({ onQuickPurchase }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .featured-section-mobile-hide {
            display: none !important;
          }
        }
      `}</style>
      <motion.section 
        ref={ref}
        className="relative py-16 md:py-24 featured-section featured-section-mobile-hide"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          backgroundImage: 'url(https://i.pinimg.com/736x/89/4b/e4/894be4cc36d0e777a2c5129d6c4dd17d.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Semi-transparent overlay to ensure text readability */}
        <div 
          className="absolute inset-0 opacity-50" 
          style={{ background: 'linear-gradient(to right, #1b024b, #4a0124)' }}
        ></div>
        
<<<<<<< HEAD
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#EBEBD3] mb-4 featured-header">
              Featured Products
            </h2>
            <p className="text-lg text-[#ffffff] max-w-2xl mx-auto featured-subheader">
              Discover our premium selection of natural products
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
                onQuickPurchase={onQuickPurchase}
              />
            ))}
          </div>
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product} 
              viewType="grid"
              onQuickPurchase={onQuickPurchase}
            />
          ))}
>>>>>>> dc5a74c48e906fade16ace0c1697d8010b1c8e19
        </div>
      </motion.section>
    </>
  );
};

export default FeaturedProducts;