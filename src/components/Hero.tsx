import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import logo from '@/assets/images/ban1.jpg';

const slides = [
  {
    id: 1,
    title: "Nurtured by Nature",
    description: "Discover ethically sourced, handcrafted products rooted in tradition and crafted with care.",
    image: logo,
    color: "#67246A",
    buttonVariant: "default"
  },
  {
    id: 2,
    title: "Pure, Simple, Organic",
    description: "We bring you nature's best—no chemicals, no compromises. Just purity in every drop.",
    image: "https://i.pinimg.com/736x/cf/e9/6a/cfe96aca38b049ddbfde022d92fbeec8.jpg",
    color: "#121769",
    buttonVariant: "secondary"
  },
  {
    id: 3,
    title: "Crafted with Purpose",
    description: "Every product tells a story—of farmers, artisans, and traditions passed through generations.",
    image: "https://i.pinimg.com/736x/23/1a/2d/231a2d0b342a080fd6f6ebcf55bdcf6a.jpg",
    color: "#FE49AF",
    buttonVariant: "destructive"
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const slideInterval = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (!isHovering) {
      startSlideTimer();
    }
    return () => stopSlideTimer();
  }, [currentSlide, isHovering]);

  const startSlideTimer = () => {
    stopSlideTimer();
    slideInterval.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  const stopSlideTimer = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  const scrollToSection = () => {
    const section = document.getElementById("scroll-target");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    stopSlideTimer();
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const diffX = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          setDirection(-1);
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        } else {
          setDirection(1);
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }
      }
    }
    touchStartX.current = null;
    startSlideTimer();
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div 
<<<<<<< HEAD
      className="w-full h-screen overflow-hidden relative md:h-screen hero-slider-mobile-height"
=======
      className="w-full h-[400px] sm:h-screen overflow-hidden relative"
>>>>>>> dc5a74c48e906fade16ace0c1697d8010b1c8e19
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
<<<<<<< HEAD
      {/* Responsive height and layout for mobile */}
      <style>{`
        @media (max-width: 768px) {
          .hero-slider-mobile-height {
            height: 400px !important;
            max-height: 500px !important;
          }
          .hero-content-mobile {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            align-items: flex-start !important;
            justify-content: flex-end !important;
            bottom: 2rem !important;
            top: unset !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
          }
          .hero-title-mobile {
            font-size: 1.5rem !important;
            line-height: 1.8rem !important;
            margin-bottom: 0.5rem !important;
          }
          .hero-desc-mobile {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          .hero-btns-mobile {
            flex-direction: column !important;
            gap: 0.75rem !important;
            width: 100% !important;
            
          }
          .hero-btns-mobile button {
            width: 50% !important;
            font-size: 0.95rem !important;
            padding: 0.5rem 0 !important;
            min-height: 1rem !important;
            
          }
          .hero-nav-mobile {
            top: 95% !important;
            left: 0.5rem !important;
            right: 0.5rem !important;
            transform: none !important;
            
          }
          .hero-dot-mobile {
            width: 0.5rem !important;
            height: 0.5rem !important;
           
          }
          .hero-arrow-btn {
            padding: 0.5rem !important;
            display:none !important;
          }
          .hero-arrow-icon {
            width: 0.5rem !important;
            height: 0.5rem !important;
            display: none !important;
          }
            a{
            width:35% !important;
            height: 0.5rem !important;
            padding: 0.85rem !important;
            flex-direction: row !important;
            font-size: 0.55rem !important;
            margin-bottom: 0.5rem !important;
            }
        }
      `}</style>
      <div className="hero-slider-mobile-height w-full h-full absolute inset-0">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={slides[currentSlide].id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={slides[currentSlide].image}
              alt="Slide Background"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "brightness(0.7) contrast(1.1)",
                mixBlendMode: "multiply"
              }}
            />
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundColor: slides[currentSlide].color,
                opacity: 0.3,
                mixBlendMode: "overlay"
              }}
            />
=======
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={slides[currentSlide].id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Slide Background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "brightness(0.65)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons - Hide on small screens */}
      <div className="hidden sm:block absolute top-1/2 left-2 sm:left-4 lg:left-8 transform -translate-y-1/2 z-20">
        <motion.button
          onClick={goToPrevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#EBEBD3] bg-opacity-80 hover:bg-opacity-100 p-3 sm:p-4 rounded-full shadow-xl"
          style={{ color: slides[currentSlide].color }}
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 lg:h-9 lg:w-9" strokeWidth={2.5} />
        </motion.button>
      </div>
      <div className="hidden sm:block absolute top-1/2 right-2 sm:right-4 lg:right-8 transform -translate-y-1/2 z-20">
        <motion.button
          onClick={goToNextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#EBEBD3] bg-opacity-80 hover:bg-opacity-100 p-2 sm:p-3 rounded-full shadow-lg"
          style={{ color: slides[currentSlide].color }}
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-2 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-1 sm:gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-[#EBEBD3] opacity-100" : "bg-[#EBEBD3] opacity-50"
            }`}
            style={{
              width: currentSlide === index ? "1.5rem" : "0.75rem",
              backgroundColor: currentSlide === index ? slides[currentSlide].color : "#EBEBD3"
            }}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl text-center pt-[100px] sm:pt-0"
          >
            {/* Larger Title */}
            <motion.h1
              variants={textVariants}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 md:mb-7 leading-tight"
              style={{ color: "#EBEBD3", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            >
              {slides[currentSlide].title}
            </motion.h1>

            {/* Larger Description */}
            <motion.p
              variants={textVariants}
              className="text-base sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 md:mb-10 font-medium"
              style={{ color: "#EBEBD3", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* Larger Buttons */}
            <motion.div
              variants={textVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              <motion.div whileHover={{ y: -2 }}>
                <Link to="/products">
                  <Button
                    variant={slides[currentSlide].buttonVariant as "default" | "secondary" | "destructive" | "link" | "outline" | "ghost"}
                    className="px-8 sm:px-10 py-4 sm:py-5 rounded-full shadow-xl font-bold text-lg sm:text-xl flex items-center justify-center gap-3"
                  >
                    <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
                    Shop Now
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <Link to="/about">
                  <Button
                    variant="outline"
                    className="px-8 sm:px-10 py-4 sm:py-5 rounded-full border-3 font-bold text-lg sm:text-xl flex items-center justify-center gap-3"
                    style={{ 
                      borderColor: "#EBEBD3",
                      color: "#EBEBD3",
                      backgroundColor: "rgba(235, 235, 211, 0.1)"
                    }}
                  >
                    <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
>>>>>>> dc5a74c48e906fade16ace0c1697d8010b1c8e19
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
          <motion.button
            onClick={goToPrevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#EBEBD3] bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg hero-arrow-btn"
            style={{ color: slides[currentSlide].color }}
          >
            <ChevronLeft className="hero-arrow-icon" size={28} strokeWidth={2.5} />
          </motion.button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
          <motion.button
            onClick={goToNextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#EBEBD3] bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg hero-arrow-btn"
            style={{ color: slides[currentSlide].color }}
          >
            <ChevronRight className="hero-arrow-icon" size={28} strokeWidth={2.5} />
          </motion.button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3 hero-nav-mobile">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 hero-dot-mobile ${
                currentSlide === index ? "bg-[#EBEBD3] opacity-100" : "bg-[#EBEBD3] opacity-50"
              }`}
              style={{
                width: currentSlide === index ? "1.5rem" : "0.75rem",
                backgroundColor: currentSlide === index ? slides[currentSlide].color : "#EBEBD3"
              }}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 md:px-20 lg:px-32 hero-content-mobile" style={{height: '100%'}}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="max-w-2xl w-full"
            >
              <motion.h1
                variants={textVariants}
                className="text-4xl md:text-6xl font-bold mb-4 leading-tight hero-title-mobile"
                style={{ color: "#EBEBD3", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                variants={textVariants}
                className="text-xl md:text-2xl mb-8 font-medium hero-desc-mobile"
                style={{ color: "#EBEBD3", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                variants={textVariants}
                className="flex gap-4 flex-wrap hero-btns-mobile"
              >
                <motion.div whileHover={{ y: -2 }}>
                    <Button
                    asChild
                    variant={slides[currentSlide].buttonVariant as "default" | "secondary" | "destructive" | "link" | "outline" | "ghost"}
                    className="px-8 py-6 rounded-full shadow-lg font-semibold text-lg flex items-center gap-2"
                    >
                    <a href="/products">
                      <ShoppingBag className="h-5 w-5" />
                      Shop Now
                    </a>
                    </Button>
                </motion.div>
                <motion.div whileHover={{ y: -2 }}>
                    <Button
                    asChild
                    variant="outline"
                    className="px-8 py-6 rounded-full border-2 font-semibold text-lg flex items-center gap-2"
                    style={{ 
                      borderColor: "#EBEBD3",
                      color: "#EBEBD3",
                      backgroundColor: "rgba(235, 235, 211, 0.1)"
                    }}
                    >
                    <a href="/about">
                      <Heart className="h-5 w-5" />
                      Learn More
                    </a>
                    </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll Indicator - Hide on small screens */}
      <div className="hidden sm:block absolute bottom-4 right-4 z-20">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            transition: { 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="text-[#EBEBD3] text-sm font-medium flex items-center gap-1"
        >
          <span>Scroll Down</span>
          <motion.div
            animate={{ 
              y: [0, 5, 0],
              transition: { 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <ChevronRight className="rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;