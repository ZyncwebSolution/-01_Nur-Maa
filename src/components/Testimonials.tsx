import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '@/lib/types';


// Mock testimonials data
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah J.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'The lavender face cream is amazing! My skin feels so nourished and the scent is calming and natural.',
    rating: 5,
    location: 'Portland, OR'
  },
  {
    id: '2',
    name: 'Michael T.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'I\'ve been using the organic honey for months now. Pure quality and tastes incredible on my morning toast!',
    rating: 5,
    location: 'Austin, TX'
  },
  {
    id: '3',
    name: 'Emma R.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'The rosemary hair oil made my hair healthier than it\'s been in years. Will definitely repurchase.',
    rating: 4,
    location: 'Seattle, WA'
  },
  {
    id: '4',
    name: 'David K.',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    text: 'As someone with sensitive skin, I appreciate the natural ingredients in all Nurmaa products.',
    rating: 5,
    location: 'Boulder, CO'
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; active: boolean }> = ({ testimonial, active }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: active ? 1 : 0.7, y: active ? 0 : 10, scale: active ? 1 : 0.95 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-white rounded-3xl p-8 flex flex-col h-full ${active ? 'shadow-xl' : 'shadow-md'}`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-nurmaa-mint to-nurmaa-green rounded-t-3xl"></div>
      
      <div className="flex items-start mb-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="relative flex-shrink-0 mr-5"
        >
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="absolute -bottom-2 -right-2 bg-nurmaa-green text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {testimonial.rating}
          </div>
        </motion.div>
        
        <div>
          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
          <p className="text-gray-500 text-sm">{testimonial.location}</p>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      
      <motion.p 
        className="text-gray-700 text-lg mb-6 relative pl-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <svg 
          className="absolute top-0 left-0 h-6 w-6 text-nurmaa-mint opacity-30"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path
            d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
            fill="currentColor"
          />
        </svg>
        {testimonial.text}
      </motion.p>
      
      <div className="mt-auto flex justify-end">
        <div className="bg-nurmaa-mint bg-opacity-10 px-4 py-2 rounded-full text-nurmaa-green text-sm font-medium">
          Verified Buyer
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left'|'right'>('right');
  
  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: string) => ({
      x: direction === 'right' ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: string) => ({
      x: direction === 'right' ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Modern background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern 
            id="modern-pattern" 
            x="0" 
            y="0" 
            width="40" 
            height="40" 
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <circle cx="20" cy="20" r="1" fill="#3a7a68" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#modern-pattern)" />
        </svg>
      </div>
      
      <div className="nurmaa-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-nurmaa-green to-nurmaa-dark">
            Loved by Customers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join thousands of happy customers experiencing the Nurmaa difference
          </p>
        </motion.div>
        
        <div className="relative max-w-6xl mx-auto h-[400px] md:h-[450px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute inset-0 px-4"
            >
              <TestimonialCard 
                testimonial={testimonials[currentIndex]} 
                active={true} 
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-12 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className="group focus:outline-none"
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <motion.div
                animate={{ 
                  width: currentIndex === index ? '24px' : '12px',
                  backgroundColor: currentIndex === index ? '#3a7a68' : '#e5e7eb'
                }}
                transition={{ duration: 0.3 }}
                className="h-3 rounded-full"
              />
              <span className="sr-only">Testimonial {index + 1}</span>
            </button>
          ))}
        </div>
        
        {/* Social proof stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: '10K+', label: 'Happy Customers' },
            { value: '4.9', label: 'Average Rating' },
            { value: '100%', label: 'Natural Ingredients' },
            { value: '1M+', label: 'Products Sold' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-100 shadow-sm"
            >
              <motion.p 
                className="text-3xl md:text-4xl font-bold text-nurmaa-green mb-2"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;