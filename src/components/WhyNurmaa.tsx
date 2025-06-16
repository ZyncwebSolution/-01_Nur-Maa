import React from 'react';
import { motion } from 'framer-motion';
import { GiPlantSeed, GiFarmTractor, GiLipstick, GiTreeGrowth } from 'react-icons/gi';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <GiPlantSeed className="w-8 h-8" color="#EBEBD3" />, // Skincare
      title: "Homemade Skincare",
      description: "Crafted with natural ingredients for radiant skin",
      color: "linear-gradient(135deg, #121769 0%, #67246A 100%)" // Deep navy gradient
    },
    {
      icon: <GiFarmTractor className="w-8 h-8" color="#EBEBD3" />, // Food
      title: "Organic Food",
      description: "Sourced from local farms for pure nourishment",
      color: "linear-gradient(135deg, #121769 0%, #67246A 100%)"  // Royal blue
    },
    {
      icon: <GiLipstick className="w-8 h-8" color="#EBEBD3" />, // Makeup
      title: "Natural Makeup",
      description: "Enhance your beauty with eco-friendly cosmetics",
      color: "linear-gradient(135deg, #121769 0%, #67246A 100%)"  // Gold
    },
    {
      icon: <GiTreeGrowth className="w-8 h-8" color="#EBEBD3" />, // Sustainability
      title: "Sustainable Legacy",
      description: "Committed to preserving nature and heritage",
      color:"linear-gradient(135deg, #121769 0%, #67246A 100%)" // Ochre
    }
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  // Hieroglyphic grid background component
  const GridBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Major grid lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(212, 175, 55, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }}></div>
      
      {/* Minor grid lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(212, 175, 55, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(212, 175, 55, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}></div>
      
      {/* Floating hieroglyphs */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: ['#D4AF37', '#3A4E7A', '#8B2323'][Math.floor(Math.random() * 3)]
          }}
          animate={{
            y: [0, Math.random() * 10 - 5],
            x: [0, Math.random() * 10 - 5],
            rotate: [0, Math.random() * 10 - 5]
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          {['𓀀', '𓁟', '𓂀','𓃭','𓃙', '𓅓', '𓆣', '𓇋','𓃘','𓃗','𓃙','𓃙', '𓃠', '𓄿','𓃗','𓃗','𓃙','𓃘','𓃭','𓃘',
][Math.floor(Math.random() * 20)]}
        </motion.div>
      ))}
    </div>
  );

  return (
    <section 
      className="py-20 px-4 relative overflow-hidden why-nurmaa-mobile"
      style={{ 
        backgroundColor: "#F0EDE5",
        backgroundImage: `
          linear-gradient(to bottom, rgba(210,180,140,0.1) 1px, transparent 1px),
          linear-gradient(to right, rgba(210,180,140,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    >
      <GridBackground />
      
      {/* Pyramid silhouette decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="none">
          <polygon points="0,500 500,100 1000,500" fill="#3A4E7A"/>
          {/* Place hieroglyph icons in a grid pattern inside the pyramid */}
          {(() => {
            const icons = ['𓀀', '𓁟', '𓂀', '𓃠', '𓄿', '𓅓', '𓆣', '𓇋' ,'𓆣', '𓇋','𓃘','𓃗','𓃙','𓃙', '𓃠', '𓄿','𓃗','𓃗','𓃙','𓃘','𓃭','𓃘'];
            const rows = 10;
            const cols = 16;
            const iconSize = 32;
            const startY = 120; // top Y of pyramid
            const endY = 480; // bottom Y of pyramid
            const iconsArr = [] as React.ReactNode[];
            let iconIndex = 0;
            for (let row = 0; row < rows; row++) {
              const iconsInRow = cols - row * 2;
              const y = startY + ((endY - startY) / (rows - 1)) * row;
              const xStart = 500 - ((iconsInRow - 1) * iconSize) / 2;
              for (let col = 0; col < iconsInRow; col++) {
                const x = xStart + col * iconSize;
                iconsArr.push(
                  <text
                    key={`pyramid-icon-${row}-${col}`}
                    x={x}
                    y={y}
                    fontSize="32"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="#F0EDE5"
                    opacity="0.92"
                    style={{
                      fontFamily: 'Noto Sans Egyptian Hieroglyphs, Arial Unicode MS, sans-serif',
                      filter: 'drop-shadow(0 1px 4px #121769AA) drop-shadow(0 0px 8px #FE49AF55)'
                    }}
                  >
                    {icons[iconIndex % icons.length]}
                  </text>
                );
                iconIndex++;
              }
            }
            return iconsArr;
          })()}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated title section */}
        <motion.div 
          className="text-center mb-16 why-nurmaa-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight why-nurmaa-title"
            style={{ 
              color: '#0C1446',
              fontFamily: "'EB Garamond', serif",
              fontWeight: 700
            }}
          >
            <span className="block">Why Choose NUR-MAA</span>
          </h2>
          <p 
            className="max-w-2xl mx-auto text-lg leading-relaxed why-nurmaa-subtitle"
            style={{ 
              color: '#3A4E7A',
              fontFamily: "'Cormorant Garamond', serif"
            }}
          >
            Where the sacred beauty rituals of ancient Egypt meet cutting-edge cosmetic science
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 why-nurmaa-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-xl p-8 shadow-lg border border-opacity-20 why-nurmaa-feature"
              style={{ 
                backgroundImage: feature.color.startsWith('linear-gradient') ? feature.color : undefined,
                backgroundColor: feature.color.startsWith('linear-gradient') ? undefined : feature.color,
                borderColor: '#D4AF37',
                boxShadow: '0 8px 32px rgba(12, 20, 70, 0.2)'
              }}
              variants={itemVariants}
              whileHover="hover"
            >
              {/* Cartouche shape effect */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-16 bg-[#D4AF37] rounded-full opacity-10"></div>
              <motion.div
                className="relative z-10 why-nurmaa-icon"
                variants={hoverVariants}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto why-nurmaa-icon"
                  style={{ 
                    backgroundColor: "rgba(255,255,255,0.15)",
                    border: '2px solid rgba(212, 175, 55, 0.5)'
                  }}
                >
                  {feature.icon}
                </div>
                <h3 
                  className="text-2xl font-bold mb-3 text-center why-nurmaa-feature-title"
                  style={{ 
                    color: '#F0EDE5',
                    fontFamily: "'EB Garamond', serif",
                    textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
                  }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="opacity-90 text-center why-nurmaa-feature-desc"
                  style={{ 
                    color: '#F0EDE5',
                    fontFamily: "'Cormorant Garamond', serif"
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA section with Egyptian border */}
        <motion.div 
          className="mt-20 text-center relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          {/* Decorative border */}
          <div className="absolute top-0 left-0 right-0 h-2 overflow-hidden">
            <div className="flex justify-center space-x-4">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="text-xl text-[#3A4E7A]"
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity
                  }}
                >
                  {/* Only use icons not in the removed list */}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-nurmaa-mobile {
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
          }
          .why-nurmaa-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.5rem !important;
          }
          .why-nurmaa-subtitle {
            font-size: 1rem !important;
            margin-bottom: 1rem !important;
          }
          .why-nurmaa-grid {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
          }
          .why-nurmaa-feature {
            padding: 1.2rem !important;
            border-radius: 10px !important;
            margin-left:2rem !important;
            margin-right:2rem !important;
            height: 200px !important;
          }
          
          .mb-16 {
            margin-bottom: 1.2rem !important;
          }
          .mt-20 {
            margin-top: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;