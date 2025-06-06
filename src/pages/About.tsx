import React from 'react';
import { motion } from 'framer-motion';

// Consistent NurmaaCard for all cards on this page
const NurmaaCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`
      bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border-2 border-[#FE49AF]/15
      p-6 md:p-8
      ${className}
    `}
  >
    {children}
  </div>
);

const egyptianGradient = 'bg-gradient-to-br from-[#EBEBD3] via-white to-[#FE49AF]';
const accentBorder = 'border-4 border-[#67246a]';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, type: 'spring' }
  })
};

const About: React.FC = () => {
  return (
    <motion.div
      className="pt-24 pb-16 min-h-screen bg-[#EBEBD3]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
    >
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-[#FE49AF]/30 via-[#EBEBD3] to-[#67246a]/10 py-12 sm:py-20 md:py-28"
        variants={fadeInUp}
        custom={1}
      >
        {/* Background image for hero banner */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
            pointerEvents: 'none'
          }}
        ></div>
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-[#FE49AF]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-[#67246a]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 z-0"></div>
        {/* Centered content */}
        <div className="relative z-10 flex items-center justify-center min-h-[220px] sm:min-h-[320px] md:min-h-[400px]">
          <div className="w-full max-w-lg sm:max-w-2xl md:max-w-4xl px-4 sm:px-6 lg:px-8 text-center mx-auto">
            <motion.h1
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#67246a] tracking-wide mb-3 sm:mb-5 md:mb-7 font-serif drop-shadow-lg"
              variants={fadeInUp}
              custom={2}
            >
              Discover the Nurmaa Story
            </motion.h1>
            <motion.div
              className="w-16 sm:w-24 h-2 mx-auto bg-gradient-to-r from-[#FE49AF] to-[#67246a] rounded-full mb-4 sm:mb-6"
              variants={fadeInUp}
              custom={3}
            ></motion.div>
            <motion.p
              className="text-base sm:text-lg md:text-2xl text-[#121769] font-medium mb-2 sm:mb-4"
              variants={fadeInUp}
              custom={4}
            >
              Ancient wisdom. Modern wellness. Crafted with care.
            </motion.p>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-[#67246a] max-w-2xl mx-auto"
              variants={fadeInUp}
              custom={5}
            >
              From the heart of tradition to your hands, Nurmaa celebrates the beauty of natural ingredients and mindful living. Join us on a journey of transformation, protection, and life.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="nurmaa-container max-w-6xl mx-auto py-20">
        {/* Vision Section - image left, content right */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
          variants={fadeInUp}
          custom={5}
        >
          {/* Image first */}
          <div className="order-1 md:order-1">
            <NurmaaCard className="h-80 md:h-auto flex items-center justify-center p-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80"
                alt="Vision"
                className="rounded-2xl w-full h-80 object-cover"
              />
            </NurmaaCard>
          </div>
          {/* Content second */}
          <NurmaaCard className="order-2 md:order-2 flex flex-col justify-center h-full">
            <h2 className="text-3xl font-bold mb-6 text-[#FE49AF] font-serif">
              Our Vision
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#67246a] to-[#FE49AF] mb-6"></div>
            <p className="text-[#121769] mb-4">
              We strive to redefine wellness by making natural, sustainable living a joyful and accessible choice for everyone.
            </p>
            <p className="text-[#121769] mb-4">
              Our vision is to blend ancient wisdom with modern innovation, creating products that honor the earth and empower individuals to live consciously.
            </p>
            <p className="text-[#121769]">
              By fostering community and education, we aim to inspire a movement toward mindful, holistic well-being for generations to come.
            </p>
          </NurmaaCard>
        </motion.div>

        {/* Mission Section - swapped image and content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content first */}
          <NurmaaCard className="order-2 md:order-1 flex flex-col justify-center h-full">
            <h2 className="text-3xl font-bold mb-6 text-[#67246a] font-serif">
              Our Mission
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#FE49AF] to-[#121769] mb-6"></div>
            <p className="text-[#121769] mb-4">
              At Nurmaa, we are dedicated to creating handmade, natural products that nurture both your body and the environment.
              We believe in the power of nature's ingredients and traditional craftsmanship.
            </p>
            <p className="text-[#121769] mb-4">
              Each Nurmaa product is crafted with care and attention to detail, using only the finest natural ingredients
              sourced from trusted suppliers who share our commitment to sustainability and ethical practices.
            </p>
            <p className="text-[#121769]">
              Our mission is to bring the healing power of nature into your daily routine through simple, effective,
              and beautifully crafted products that celebrate traditional knowledge and modern wellness.
            </p>
          </NurmaaCard>
          {/* Image second */}
          <div className="order-1 md:order-2">
            <NurmaaCard className="h-80 md:h-auto flex items-center justify-center p-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80"
                alt="Handmade products"
                className="rounded-2xl w-full h-80 object-cover"
              />
            </NurmaaCard>
          </div>
        </div>

        {/* Modern Journey Timeline - Vertical Design with Animation */}
        <motion.div className="mt-24" variants={fadeInUp} custom={8}>
          <h2 className="text-3xl font-bold mb-12 text-center text-[#121769] font-serif">Our Journey</h2>
          <div className="relative flex flex-col items-center gap-12">
            {/* Timeline vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#FE49AF] to-[#67246a] rounded-full -translate-x-1/2 z-0"></div>
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
                className="relative z-10 flex flex-col items-center w-full"
                variants={fadeInUp}
                custom={9 + index}
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#FE49AF] border-4 border-white shadow-lg z-20"></div>
                  {index !== 3 && (
                    <div className="flex-1 w-1 h-12 bg-gradient-to-b from-[#FE49AF] to-[#67246a]"></div>
                  )}
                </div>
                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ delay: 0.1 * index, duration: 0.7, type: 'spring' }}
                  className="w-full max-w-2xl mx-auto mt-4"
                >
                  <NurmaaCard className="gap-8 flex flex-col md:flex-row items-center">
                    <div className="flex-shrink-0 w-full md:w-40">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="rounded-lg w-full h-32 md:h-40 object-cover border-4 border-[#FE49AF]/40"
                      />
                    </div>
                    <div className="flex-1 flex flex-col items-start">
                      <div className="flex items-center mb-2">
                        <div className="text-2xl font-bold text-[#FE49AF] mr-3">
                          {step.year === 'Today' ? '★' : step.year}
                        </div>
                        <div className="h-1 w-12 bg-gradient-to-r from-[#FE49AF] to-[#67246a] rounded" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-[#121769]">{step.title}</h3>
                      <p className="text-[#67246a]">{step.description}</p>
                    </div>
                  </NurmaaCard>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Founder Section - Modern Glassmorphism Card */}
        <motion.div
          className="mt-24"
          variants={fadeInUp}
          custom={13}
        >
          <NurmaaCard className="flex flex-col md:flex-row-reverse items-center gap-10 relative overflow-hidden">
            {/* Decorative background shapes */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#FE49AF]/20 rounded-full blur-2xl z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-[#67246a]/10 rounded-full blur-2xl z-0"></div>
            {/* Founder Image on the right */}
            <div className="relative flex-shrink-0 flex justify-center items-center w-full md:w-1/3 z-10 py-8 md:py-0">
              <img
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80"
                alt="Founder"
                className="rounded-2xl w-52 h-52 object-cover border-4 border-[#FE49AF]/30 shadow-xl"
              />
            </div>
            {/* Founder Info Card */}
            <div className="flex-1 flex flex-col justify-center items-start text-left z-10 px-8 py-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block w-2 h-8 bg-gradient-to-b from-[#FE49AF] to-[#67246a] rounded"></span>
                <h2 className="text-3xl font-extrabold text-[#67246a] font-serif tracking-tight">Meet the Founder</h2>
              </div>
              <div className="mb-4">
                <p className="font-serif text-xl italic text-[#121769] mb-4">
                  “With a background in herbal science and a love for sustainable living, I founded Nurmaa to share the beauty of nature’s remedies with the world. Every product is a reflection of my commitment to purity, tradition, and mindful creation.”
                </p>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <div className="font-bold text-[#FE49AF] text-lg">Amina Rahman</div>
                    <div className="text-[#121769] text-sm">Founder & Herbal Scientist</div>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <span className="bg-[#FE49AF]/10 text-[#FE49AF] px-3 py-1 rounded-full text-xs font-medium border border-[#FE49AF]/30">#HerbalScience</span>
                    <span className="bg-[#67246a]/10 text-[#67246a] px-3 py-1 rounded-full text-xs font-medium border border-[#67246a]/30">#EcoWellness</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <NurmaaCard className="flex-1 bg-gradient-to-br from-[#FE49AF]/10 to-[#67246a]/5 border border-[#FE49AF]/10 text-[#67246a] shadow-sm p-4">
                  <span className="font-bold">Expertise:</span> Herbal science, eco-friendly formulation, community wellness.
                </NurmaaCard>
                <NurmaaCard className="flex-1 bg-gradient-to-br from-[#67246a]/10 to-[#FE49AF]/5 border border-[#67246a]/10 text-[#121769] shadow-sm p-4">
                  <span className="font-bold">Belief:</span> Nature and science together can nurture a better world.
                </NurmaaCard>
              </div>
            </div>
          </NurmaaCard>
        </motion.div>

        {/* Values Section */}
        <motion.div className="mt-24 text-center" variants={fadeInUp} custom={14}>
          <h2 className="text-3xl font-bold mb-6 text-[#121769] font-serif">Our Values</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FE49AF] to-[#67246a] mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '𓂀', // Eye of Horus
                title: 'Protection',
                description: 'We safeguard your well-being and our environment, inspired by the ancient Eye of Horus.'
              },
              {
                icon: '𓆣', // Scarab
                title: 'Transformation',
                description: 'Like the scarab, we believe in renewal, growth, and positive change through nature.'
              },
              {
                icon: '☥', // Ankh
                title: 'Life',
                description: 'The ankh symbolizes life; we honor vitality and holistic wellness in all we do.'
              }
            ].map((value, idx) => (
              <NurmaaCard key={idx} className="flex flex-col items-center py-10">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-[#FE49AF]">{value.title}</h3>
                <p className="text-[#121769]">{value.description}</p>
              </NurmaaCard>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
