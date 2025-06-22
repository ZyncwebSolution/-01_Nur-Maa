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
    name: 'Handcrafted Nutritious Granola',
    category: 'food',
    description: 'Boost your morning routine with our handmade granola—a tasty, healthy mix of roasted nuts, seeds, and whole grains for sustained energy.',
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
    name: 'Sprouted Ragi Powder – Wholesome & Nutritious',
    category: 'food',
    description: 'Naturally rich in calcium and fiber, our sprouted ragi powder is made from 100% whole grains to support digestion and bone health.',
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
    name: 'Natural Lip Scrub with Honey & Sugar',
    category: 'skincare',
    description: 'Exfoliate and nourish your lips with this 100% natural lip scrub made from honey, cane sugar, and essential oils for soft, smooth lips.',
    price: 18.99,
    image: bottle1,
    rating: 4.6,
    featured: true,
    tags: ['vegan', 'bestseller'],
    bgImage: bg3,
    fgImage: bg3
  },
  {
    id: '4',
    name: 'Natural Herbal Eye Shadow',
    category: 'skincare',
    description: 'SGentle, plant-based eye shadow made with herbal pigments for bold, skin-safe color.',
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#EBEBD3] mb-4 featured-header">
              Top Natural Picks for Skin, Hair & Wellness
            </h2>
            <p className="text-lg text-[#ffffff] max-w-2xl mx-auto featured-subheader">
              Browse our bestselling natural skincare and wellness products—crafted with organic, clean ingredients for a healthier lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
                viewType="grid"
                onQuickPurchase={onQuickPurchase}
              />
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default FeaturedProducts;