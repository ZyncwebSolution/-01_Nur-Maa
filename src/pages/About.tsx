import React from 'react';

const colors = {
  gold: '#fe49af',
  blue: '#121769',
  beige: '#ebebd3',
  purple: '#67246a',
  white: '#fff',
};

// Animation style objects for inline usage
const fadeInUp = {
  animation: 'fadeInUp 1s ease both',
};
const fadeIn = {
  animation: 'fadeIn 1s ease both',
};

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-16" style={{ background: colors.beige }}>
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          @keyframes fadeIn {
            0% { opacity: 0;}
            100% { opacity: 1;}
          }
          .hero-overlay {
            background: linear-gradient(120deg, rgba(18,23,105,0.85) 0%, rgba(103,36,106,0.7) 100%);
            position: absolute;
            inset: 0;
            z-index: 1;
            border-radius: 0 0 2.5rem 2.5rem;
          }
          .hero-img {
            filter: brightness(0.6) blur(1px);
          }
          .hero-text {
            text-shadow: 0 4px 32px #121769, 0 2px 8px #fff8;
          }
          .bounce {
            animation: bounce 1.2s infinite alternate;
          }
          @keyframes bounce {
            0% { transform: translateY(0);}
            100% { transform: translateY(-10px);}
          }
        `}
      </style>
      {/* Hero Banner */}
      <div
        className="relative w-full h-[320px] md:h-[420px] flex items-center justify-center mb-[-60px] md:mb-[-80px] z-10 overflow-hidden rounded-b-3xl"
        style={{
          background: `linear-gradient(120deg, ${colors.gold} 0%, ${colors.purple} 100%)`,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Egyptian landscape"
          className="absolute inset-0 w-full h-full object-cover hero-img"
        />
        <div className="hero-overlay"></div>
        <div className="relative z-10 text-center w-full px-4" style={fadeInUp}>
          <h1
            className="text-3xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight hero-text"
            style={{
              color: colors.beige,
              fontFamily: 'serif',
              letterSpacing: '0.04em',
            }}
          >
            The Nurmaa Story
          </h1>
          <div
            className="mx-auto mt-6 w-16 md:w-24 h-2 rounded bounce"
            style={{ background: colors.gold, opacity: 0.95 }}
          />
          <p
            className="mx-auto mt-6 md:mt-8 max-w-xl md:max-w-2xl text-base md:text-xl font-medium hero-text"
            style={{ color: colors.beige, textShadow: '0 2px 8px #121769' }}
          >
            Nurmaa was born from a passion for natural ingredients and traditional craft, inspired by the timeless wisdom of ancient Egypt.
          </p>
        </div>
      </div>

      <div
        className="bg-white shadow-lg rounded-b-3xl"
        style={{ background: colors.beige, boxShadow: `0 8px 32px ${colors.purple}22` }}
      >
        <div className="nurmaa-container py-10 md:py-20" />
      </div>

      <div className="nurmaa-container py-10 md:py-20 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center" style={fadeInUp}>
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 md:mb-8"
              style={{ color: colors.gold, fontFamily: 'serif' }}
            >
              Our Mission
            </h2>
            <div className="space-y-5 text-base md:text-lg">
              <p style={{ color: colors.blue, ...fadeIn }}>
                At Nurmaa, we are dedicated to creating handmade, natural products that nurture both your body and the environment.
                We believe in the power of nature's ingredients and traditional craftsmanship, echoing the holistic practices of ancient Egypt.
              </p>
              <p style={{ color: colors.purple, ...fadeIn, animationDelay: '0.2s' }}>
                Each Nurmaa product is crafted with care and attention to detail, using only the finest natural ingredients
                sourced from trusted suppliers who share our commitment to sustainability and ethical practices.
              </p>
              <p style={{ color: colors.blue, ...fadeIn, animationDelay: '0.4s' }}>
                Our mission is to bring the healing power of nature into your daily routine through simple, effective,
                and beautifully crafted products that celebrate traditional knowledge and modern wellness.
              </p>
            </div>
          </div>

          <div className="relative h-60 md:h-96 flex items-center justify-center" style={fadeIn}>
            <div
              className="absolute top-4 right-4 w-4/5 h-4/5 rounded-3xl blur-sm -z-10 shadow-xl"
              style={{
                background: `${colors.gold}44`,
                boxShadow: `0 8px 32px ${colors.purple}33`,
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&q=80"
              alt="Egyptian craft"
              className="rounded-2xl shadow-2xl border-4"
              style={{
                borderColor: `${colors.blue}44`,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s',
                animation: 'fadeIn 1.2s ease both',
              }}
            />
          </div>
        </div>

        <div className="mt-16 md:mt-28" style={fadeInUp}>
          <h2
            className="text-3xl md:text-4xl font-bold mb-10 md:mb-14 text-center"
            style={{ color: colors.gold, fontFamily: 'serif' }}
          >
            Our Journey
          </h2>

          <div className="space-y-10 md:space-y-16">
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
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-6 md:gap-16`}
                style={{
                  ...fadeInUp,
                  animationDelay: `${0.2 + index * 0.2}s`,
                }}
              >
                <div className="w-full md:w-1/2">
                  <div
                    className="p-2 md:p-3 rounded-2xl shadow-xl border-2 hover:shadow-2xl transition-shadow duration-300"
                    style={{
                      background: colors.white,
                      borderColor: `${colors.blue}33`,
                      boxShadow: `0 8px 32px ${colors.purple}22`,
                      animation: 'fadeIn 1.2s ease both',
                      animationDelay: `${0.3 + index * 0.2}s`,
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-40 md:h-64 object-cover rounded-xl"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <div
                    className="inline-block px-4 md:px-6 py-2 rounded-full mb-2 md:mb-3 shadow-md text-base md:text-lg font-semibold tracking-wide"
                    style={{
                      background: colors.gold,
                      color: colors.blue,
                      fontFamily: 'serif',
                    }}
                  >
                    {step.year}
                  </div>
                  <h3
                    className="text-xl md:text-3xl font-bold mb-2 md:mb-4"
                    style={{ color: colors.purple }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg" style={{ color: colors.blue }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-16 md:mt-28 rounded-3xl p-6 md:p-16 shadow-lg border"
          style={{
            background: colors.white,
            borderColor: `${colors.gold}33`,
            boxShadow: `0 8px 32px ${colors.purple}22`,
            ...fadeInUp,
          }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-2 md:mb-4"
              style={{ color: colors.blue, fontFamily: 'serif' }}
            >
              Meet the Founder
            </h2>
            <div
              className="w-16 md:w-24 h-1 mx-auto rounded"
              style={{ background: colors.gold }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-center">
            <div className="md:col-span-1 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
                alt="Founder"
                className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover border-4 shadow-xl ring-4"
                style={{
                  borderColor: colors.gold,
                  boxShadow: `0 4px 24px ${colors.purple}33`,
                  animation: 'fadeIn 1.2s ease both',
                }}
              />
            </div>

            <div className="md:col-span-2">
              <div
                className="font-playfair text-lg md:text-2xl italic mb-6 md:mb-8"
                style={{ color: colors.purple, ...fadeIn }}
              >
                "I started Nurmaa with a simple belief: that the purest ingredients, combined with traditional knowledge
                and careful craftsmanship, can create products that truly nurture our bodies and souls."
              </div>
              <p className="mb-2 md:mb-4 text-base md:text-lg" style={{ color: colors.blue, ...fadeIn }}>
                With a background in herbal medicine and a lifelong passion for natural living, our founder has dedicated
                years to perfecting recipes that harness the power of nature while respecting traditional techniques.
              </p>
              <p className="text-base md:text-lg" style={{ color: colors.purple, ...fadeIn }}>
                Every Nurmaa product reflects this dedication to quality, sustainability, and the belief that what we put
                on our bodies and into our bodies should be as pure and natural as possible.
              </p>
              <div className="mt-6 md:mt-8">
                <div
                  className="font-semibold text-lg md:text-xl"
                  style={{ color: colors.gold }}
                >
                  Maya Johnson
                </div>
                <div style={{ color: colors.blue }}>Founder & Formulator</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-28 text-center" style={fadeInUp}>
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 md:mb-8"
            style={{ color: colors.blue, fontFamily: 'serif' }}
          >
            Our Values
          </h2>
          <div
            className="w-16 md:w-24 h-1 mx-auto mb-10 md:mb-14 rounded"
            style={{ background: colors.gold }}
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                icon: '🌾',
                title: 'Sustainability',
                description: 'We prioritize eco-friendly practices in every step of our production process.'
              },
              {
                icon: '🛕',
                title: 'Craftsmanship',
                description: 'Each product is handcrafted with care and attention to detail, inspired by Egyptian artisans.'
              },
              {
                icon: '👁️',
                title: 'Transparency',
                description: 'We believe in full honesty about our ingredients and processes, as clear as the Nile.'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 md:p-8 rounded-2xl shadow-lg border-2 hover:shadow-2xl transition-shadow duration-300"
                style={{
                  background: colors.beige,
                  borderColor: `${colors.purple}22`,
                  boxShadow: `0 8px 32px ${colors.blue}11`,
                  animation: 'fadeInUp 1s ease both',
                  animationDelay: `${0.2 + index * 0.2}s`,
                }}
              >
                <div className="text-4xl md:text-5xl mb-4 md:mb-6 bounce">{value.icon}</div>
                <h3
                  className="text-xl md:text-2xl font-bold mb-2 md:mb-4"
                  style={{ color: colors.gold }}
                >
                  {value.title}
                </h3>
                <p className="text-base md:text-lg" style={{ color: colors.blue }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

/* Nurmaa orb pulse animation (add to your global CSS if not present):
@keyframes nurmaaPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(254,73,175,0.18), 0 0 0 0 rgba(103,36,106,0.15);}
  50% { box-shadow: 0 0 32px 12px rgba(254,73,175,0.22), 0 0 24px 8px rgba(103,36,106,0.18);}
}
.animate-nurmaaPulse {
  animation: nurmaaPulse 2.8s cubic-bezier(0.4,0,0.2,1) infinite;
}
*/
