
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="bg-nurmaa-peach bg-opacity-20">
        <div className="nurmaa-container py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center">Our Story</h1>
          <p className="text-center mt-6 max-w-3xl mx-auto text-lg text-gray-700">
            Nurmaa was born from a passion for natural ingredients and traditional craft.
          </p>
        </div>
      </div>
      
      <div className="nurmaa-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At Nurmaa, we are dedicated to creating handmade, natural products that nurture both your body and the environment.
              We believe in the power of nature's ingredients and traditional craftsmanship.
            </p>
            <p className="text-gray-700 mb-4">
              Each Nurmaa product is crafted with care and attention to detail, using only the finest natural ingredients
              sourced from trusted suppliers who share our commitment to sustainability and ethical practices.
            </p>
            <p className="text-gray-700">
              Our mission is to bring the healing power of nature into your daily routine through simple, effective,
              and beautifully crafted products that celebrate traditional knowledge and modern wellness.
            </p>
          </div>
          
          <div className="relative h-80 md:h-auto">
            <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-nurmaa-mint rounded-lg -z-10" />
            <img 
              src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80" 
              alt="Handmade products" 
              className="rounded-lg shadow-lg transform translate-y-4 -translate-x-4 w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
          
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
              <div 
                key={index} 
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8`}
              >
                <div className="w-full md:w-1/2">
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-64 object-cover rounded"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <div className="inline-block bg-nurmaa-green text-white px-4 py-1 rounded mb-2">
                    {step.year}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-24 bg-nurmaa-beige bg-opacity-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet the Founder</h2>
            <div className="w-24 h-1 bg-nurmaa-green mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
                alt="Founder" 
                className="rounded-full w-48 h-48 mx-auto object-cover border-4 border-white shadow-lg"
              />
            </div>
            
            <div className="md:col-span-2">
              <div className="font-playfair text-xl italic mb-6">
                "I started Nurmaa with a simple belief: that the purest ingredients, combined with traditional knowledge
                and careful craftsmanship, can create products that truly nurture our bodies and souls."
              </div>
              <p className="text-gray-700 mb-4">
                With a background in herbal medicine and a lifelong passion for natural living, our founder has dedicated
                years to perfecting recipes that harness the power of nature while respecting traditional techniques.
              </p>
              <p className="text-gray-700">
                Every Nurmaa product reflects this dedication to quality, sustainability, and the belief that what we put
                on our bodies and into our bodies should be as pure and natural as possible.
              </p>
              <div className="mt-6">
                <div className="font-semibold">Maya Johnson</div>
                <div className="text-gray-600">Founder & Formulator</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>
          <div className="w-24 h-1 bg-nurmaa-green mx-auto mb-12"></div>
          
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
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
