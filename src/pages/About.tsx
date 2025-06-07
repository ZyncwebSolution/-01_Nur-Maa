import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const scaleVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  return (
    <div className="pt-24 pb-16" style={{ backgroundColor: '#EBEBD3' }}>
      <motion.div 
        className="py-16"
        style={{ backgroundColor: 'rgba(254, 73, 175, 0.1)' }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="nurmaa-container">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-center" 
            style={{ color: '#121769' }}
            variants={itemVariants}
          >
            Our Story
          </motion.h1>
          <motion.p 
            className="text-center mt-6 max-w-3xl mx-auto text-lg" 
            style={{ color: '#67246A' }}
            variants={itemVariants}
          >
            Nurmaa was born from a passion for natural ingredients and traditional craft.
          </motion.p>
        </div>
      </motion.div>
      
      <div className="nurmaa-container py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#121769' }}>Our Mission</h2>
            <p className="mb-4" style={{ color: '#67246A' }}>
              At Nurmaa, we are dedicated to creating handmade, natural products that nurture both your body and the environment.
              We believe in the power of nature's ingredients and traditional craftsmanship.
            </p>
            <p className="mb-4" style={{ color: '#67246A' }}>
              Each Nurmaa product is crafted with care and attention to detail, using only the finest natural ingredients
              sourced from trusted suppliers who share our commitment to sustainability and ethical practices.
            </p>
            <p style={{ color: '#67246A' }}>
              Our mission is to bring the healing power of nature into your daily routine through simple, effective,
              and beautifully crafted products that celebrate traditional knowledge and modern wellness.
            </p>
          </motion.div>
          
          <motion.div 
            className="relative h-80 md:h-auto"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div 
              className="absolute top-0 right-0 w-4/5 h-4/5 rounded-lg -z-10" 
              style={{ backgroundColor: '#FE49AF' }}
            />
            <motion.img 
              src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80" 
              alt="Handmade products" 
              className="rounded-lg shadow-lg transform translate-y-4 -translate-x-4 w-full h-full object-cover"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-24"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center" 
            style={{ color: '#121769' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Our Journey
          </motion.h2>
          
          <div className="space-y-12">
            {[
              {
                year: '2019',
                title: 'From Kitchen to Community',
                description: 'Nurmaa began as a personal project in a small home kitchen, creating natural remedies for family and friends.',
                image: 'https://images.unsplash.com/photo-1616694555130-3e5466627a3f?auto=format&fit=crop&q=80'
              },
              {
                year: '2020',
                title: 'Growing Our Collection',
                description: 'We expanded our product line to include a variety of skincare and food products, all made with locally sourced ingredients.',
                image: 'https://images.unsplash.com/photo-1562158927-5359c91e4821?auto=format&fit=crop&q=80'
              },
              {
                year: '2021',
                title: 'Embracing Sustainability',
                description: 'We committed to fully sustainable practices, from ingredient sourcing to packaging and delivery methods.',
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80'
              },
              {
                year: 'Today',
                title: 'Sharing Our Passion',
                description: 'We continue to grow while staying true to our roots, creating products that honor traditional techniques and natural ingredients.',
                image: 'https://images.unsplash.com/photo-1599933310642-8f07bdea325a?auto=format&fit=crop&q=80'
              }
            ].map((step, index) => (
              <motion.div 
                key={index} 
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="w-full md:w-1/2">
                  <motion.div 
                    className="bg-white p-2 rounded-lg shadow-md"
                    whileHover="hover"
                    variants={scaleVariants}
                  >
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-64 object-cover rounded"
                    />
                  </motion.div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <motion.div 
                    className="inline-block text-white px-4 py-1 rounded mb-2"
                    style={{ backgroundColor: '#FE49AF' }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {step.year}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#121769' }}>{step.title}</h3>
                  <p style={{ color: '#67246A' }}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-24 rounded-2xl p-8 md:p-12"
          style={{ backgroundColor: 'rgba(254, 73, 175, 0.1)' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-4" 
              style={{ color: '#121769' }}
              whileHover={{ scale: 1.02 }}
            >
              Meet the Founder
            </motion.h2>
            <motion.div 
              className="w-24 h-1 mx-auto mb-4"
              style={{ backgroundColor: '#67246A' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <motion.img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
                alt="Founder" 
                className="rounded-full w-48 h-48 mx-auto object-cover border-4 border-white shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
                viewport={{ once: true }}
              />
            </div>
            
            <div className="md:col-span-2">
              <motion.div 
                className="text-xl italic mb-6"
                style={{ color: '#67246A' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                "I started Nurmaa with a simple belief: that the purest ingredients, combined with traditional knowledge
                and careful craftsmanship, can create products that truly nurture our bodies and souls."
              </motion.div>
              <p className="mb-4" style={{ color: '#67246A' }}>
                With a background in herbal medicine and a lifelong passion for natural living, our founder has dedicated
                years to perfecting recipes that harness the power of nature while respecting traditional techniques.
              </p>
              <p style={{ color: '#67246A' }}>
                Every Nurmaa product reflects this dedication to quality, sustainability, and the belief that what we put
                on our bodies and into our bodies should be as pure and natural as possible.
              </p>
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="font-semibold" style={{ color: '#121769' }}>Maya Johnson</div>
                <div style={{ color: '#FE49AF' }}>Founder & Formulator</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-24 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold mb-6" 
            style={{ color: '#121769' }}
            variants={itemVariants}
          >
            Our Values
          </motion.h2>
          <motion.div 
            className="w-24 h-1 mx-auto mb-12"
            style={{ backgroundColor: '#67246A' }}
            variants={itemVariants}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌱',
                title: 'Sustainability',
                description: 'We prioritize eco-friendly practices in every step of our production process.'
              },
              {
                icon: '✋',
                title: 'Craftsmanship',
                description: 'Each product is handcrafted with care and attention to detail.'
              },
              {
                icon: '💚',
                title: 'Transparency',
                description: 'We believe in full honesty about our ingredients and processes.'
              }
            ].map((value, index) => (
              <motion.div 
                key={index} 
                className="p-6 rounded-lg shadow-sm"
                style={{ backgroundColor: 'white' }}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#121769' }}>{value.title}</h3>
                <p style={{ color: '#67246A' }}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;