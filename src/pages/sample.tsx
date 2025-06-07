import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';
import { FiShoppingBag, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaSeedling, FaLeaf, FaAtom } from 'react-icons/fa';
import { GiFlowerPot, GiLipstick } from 'react-icons/gi';
import { BiDna, BiTestTube } from 'react-icons/bi';

const AboutPage: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const heroSlides = [
    {
      title: "Bio-Adaptive Skincare",
      subtitle: "Formulas that respond to your skin's needs",
      bg: "bg-[#121769]",
      icon: <BiDna className="text-6xl text-[#FE49AF]" />
    },
    {
      title: "Plant Intelligence",
      subtitle: "Harnessing nature's most powerful ingredients",
      bg: "bg-[#67246A]",
      icon: <FaSeedling className="text-6xl text-[#EBEBD3]" />
    },
    {
      title: "Clinical Results",
      subtitle: "Proven effectiveness meets clean beauty",
      bg: "bg-[#FE49AF]",
      icon: <BiTestTube className="text-6xl text-[#121769]" />
    }
  ];

  const productFeatures = [
    {
      name: "Adaptive Serum",
      description: "Dynamically adjusts to skin conditions",
      icon: <BiDna className="text-4xl text-[#121769]" />,
      color: "bg-[#EBEBD3]"
    },
    {
      name: "Phyto Mask",
      description: "Botanical infusion for instant radiance",
      icon: <FaLeaf className="text-4xl text-[#67246A]" />,
      color: "bg-[#EBEBD3]"
    },
    {
      name: "Lip Revival",
      description: "Nourishing treatment with fruit enzymes",
      icon: <GiLipstick className="text-4xl text-[#FE49AF]" />,
      color: "bg-[#EBEBD3]"
    },
    {
      name: "Glow Drops",
      description: "Vitamin C complex for luminosity",
      icon: <FaAtom className="text-4xl text-[#67246A]" />,
      color: "bg-[#EBEBD3]"
    }
  ];

  const scientificPrinciples = [
    {
      title: "Biomimicry",
      description: "Formulas that mimic skin's natural processes",
      icon: <BiDna className="text-3xl text-[#FE49AF]" />
    },
    {
      title: "Phytoactives",
      description: "Plant-derived compounds with clinical backing",
      icon: <GiFlowerPot className="text-3xl text-[#67246A]" />
    },
    {
      title: "Microbiome",
      description: "Supporting your skin's ecosystem",
      icon: <FaSeedling className="text-3xl text-[#121769]" />
    }
  ];

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-[#EBEBD3] text-[#121769]">
      {/* Modern Hero Carousel */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 flex items-center justify-center ${heroSlides[activeSlide].bg}`}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center"
              >
                <div className="flex justify-center mb-8">
                  {heroSlides[activeSlide].icon}
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-[#EBEBD3]">
                  {heroSlides[activeSlide].title}
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 text-[#EBEBD3]">
                  {heroSlides[activeSlide].subtitle}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-12 px-8 py-3 bg-[#EBEBD3] text-[#121769] rounded-full flex items-center mx-auto gap-2 font-medium"
                >
                  Explore Science <FiArrowRight />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${activeSlide === index ? 'bg-[#EBEBD3] w-6' : 'bg-[#EBEBD3]/40'}`}
            />
          ))}
        </div>

        <button 
          onClick={handlePrevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#EBEBD3]/30 backdrop-blur-sm"
        >
          <FiChevronLeft className="text-2xl text-[#EBEBD3]" />
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#EBEBD3]/30 backdrop-blur-sm"
        >
          <FiChevronRight className="text-2xl text-[#EBEBD3]" />
        </button>
      </section>

      {/* Science Section */}
      <section ref={ref} className="py-24 px-6 bg-[#EBEBD3]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
          >
            <motion.div variants={slideUp} className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Where Botany Meets Biotechnology
              </h2>
              <p className="text-lg max-w-3xl mx-auto opacity-80">
                Our research bridges ancient plant wisdom with modern dermatological science
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {scientificPrinciples.map((principle, index) => (
                <motion.div 
                  key={index}
                  variants={slideUp}
                  className="bg-white p-8 rounded-xl hover:shadow-lg transition-all border border-[#121769]/10"
                >
                  <div className="mb-6">
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{principle.title}</h3>
                  <p className="opacity-80">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-24 bg-[#121769] text-[#EBEBD3]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
          >
            Intelligent Formulas
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productFeatures.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${product.color} p-6 rounded-xl hover:-translate-y-2 transition-transform border border-[#121769]/10`}
              >
                <div className="mb-6">
                  {product.icon}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: product.icon.props.className.includes('text-[#121769]') ? '#121769' : product.icon.props.className.includes('text-[#67246A]') ? '#67246A' : '#FE49AF' }}>{product.name}</h3>
                <p className="opacity-80 mb-6 text-[#121769]">{product.description}</p>
                <button className="flex items-center gap-1 text-sm font-medium opacity-90 hover:opacity-100" style={{ color: product.icon.props.className.includes('text-[#121769]') ? '#121769' : product.icon.props.className.includes('text-[#67246A]') ? '#67246A' : '#FE49AF' }}>
                  Learn more <FiArrowRight className="mt-0.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-[#67246A] text-[#EBEBD3]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="aspect-video bg-[#121769] rounded-xl overflow-hidden relative"
          >
            <ReactPlayer
              url="https://vimeo.com/823866334"
              playing
              loop
              muted
              width="100%"
              height="100%"
              style={{
                objectFit: 'cover'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 rounded-full bg-[#EBEBD3]/20 backdrop-blur-sm flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="#EBEBD3"/>
                </svg>
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                The Science of Skin Intelligence
              </h3>
              <p className="opacity-90 mb-8">
                Our research team studies how plant molecules interact with skin biology to create adaptive formulas that respond to your unique needs.
              </p>
              <button className="px-6 py-3 border border-[#EBEBD3] rounded-full hover:bg-[#EBEBD3] hover:text-[#67246A] transition-colors">
                Meet Our Scientists
              </button>
            </div>
            <div className="space-y-6">
              {[
                "12 patented botanical complexes",
                "83% increase in skin hydration",
                "100% clean ingredient policy"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-[#EBEBD3]/10 p-2 rounded-full mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="#EBEBD3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#FE49AF] text-[#121769]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Experience Bio-Adaptive Beauty?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg mb-10 max-w-2xl mx-auto opacity-90"
          >
            Join thousands who've transformed their skincare routine with our intelligent formulas.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="px-8 py-4 bg-[#121769] text-[#EBEBD3] rounded-full hover:bg-[#121769]/90 transition-colors flex items-center gap-2">
              <FiShoppingBag /> Shop Now
            </button>
            <button className="px-8 py-4 bg-[#EBEBD3] text-[#121769] rounded-full hover:bg-[#EBEBD3]/90 transition-colors">
              Take Skin Quiz
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;