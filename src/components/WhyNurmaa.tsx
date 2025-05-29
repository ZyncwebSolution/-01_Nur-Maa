import React from 'react';
import { motion } from 'framer-motion';

const WhyNurmaa: React.FC = () => {
  const features = [
    {
      icon: '🧼',
      title: 'Handmade',
      description: 'Each product is carefully crafted by hand with attention to detail and quality.',
    },
    {
      icon: '🍃',
      title: 'Natural',
      description: 'We use only natural, organic ingredients sourced from trusted suppliers.',
    },
    {
      icon: '💚',
      title: 'Ethical',
      description: 'Our sustainable practices ensure minimal environmental impact.',
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Doodle background pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern 
            id="doodle-pattern" 
            x="0" 
            y="0" 
            width="100" 
            height="100" 
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(15)"
          >
            <path 
              d="M20,20 Q30,10 40,20 T60,20 T80,20" 
              fill="none" 
              stroke="#3a7a68" 
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="3" fill="#3a7a68" />
            <path 
              d="M10,80 Q20,70 30,80 T50,80 T70,80" 
              fill="none" 
              stroke="#3a7a68" 
              strokeWidth="2"
            />
            <rect x="80" y="80" width="10" height="10" fill="#3a7a68" opacity="0.5" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#doodle-pattern)" />
        </svg>
      </div>

      <div className="nurmaa-container relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-nurmaa-green to-nurmaa-dark">
            Why Choose Nurmaa?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our commitment to quality, sustainability, and natural ingredients sets us apart.
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-opacity-10 border-nurmaa-green relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-nurmaa-mint bg-opacity-5 -z-10"></div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-sm text-4xl mx-auto"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 bg-white rounded-2xl p-8 md:p-12 relative overflow-hidden border border-nurmaa-green border-opacity-20 shadow-sm"
        >
          <div className="absolute inset-0 bg-nurmaa-green bg-opacity-5 -z-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-nurmaa-green to-nurmaa-dark">
                Our Promise to You
              </h3>
              <p className="text-gray-700 mb-6">
                We believe in transparency and quality. Each Nurmaa product is made with carefully selected ingredients, 
                free from harmful chemicals, and packaged with the environment in mind.
              </p>
              <ul className="space-y-3">
                {['No artificial preservatives', 'Cruelty-free', 'Eco-friendly packaging'].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-nurmaa-green mr-3 flex-shrink-0" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div 
              className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000" 
                alt="Natural ingredients" 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nurmaa-dark to-transparent opacity-30"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyNurmaa;