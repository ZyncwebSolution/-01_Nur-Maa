import React, { useState } from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 1 | 2 | 3;
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "3100 BCE",
    title: "Unification of Egypt",
    description: "Pharaoh Menes unites Upper and Lower Egypt, establishing the first dynasty and founding Memphis as the capital of the unified kingdom.",
    type: 1,
    image: "https://images.unsplash.com/photo-1612362420614-c4a91f9eacd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    date: "2686 BCE",
    title: "Old Kingdom Begins",
    description: "The age of pyramid building begins with the Third Dynasty. This period marks the height of ancient Egyptian civilization and monumental architecture.",
    type: 2,
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    date: "2580 BCE",
    title: "Great Pyramid of Giza",
    description: "Construction of the Great Pyramid of Giza for Pharaoh Khufu, one of the Seven Wonders of the Ancient World and the last surviving wonder.",
    type: 3,
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    date: "2558 BCE",
    title: "The Great Sphinx",
    description: "The mysterious Great Sphinx is carved from limestone bedrock, featuring a lion's body with a human head, guarding the Giza pyramid complex.",
    type: 1,
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    date: "2055 BCE",
    title: "Middle Kingdom",
    description: "Period of reunification under Mentuhotep II, marked by cultural renaissance, expanded trade networks, and the flourishing of arts and literature.",
    type: 2,
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

const Timeline: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<TimelineEvent | null>(null);

  const openModal = (event: TimelineEvent) => {
    setModalContent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#67246A] to-[#FE49AF]">Our Journey</h2>
      {/* Animated Nile River flowing line */}
      <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 800 2000" preserveAspectRatio="none">
        <path
          d="M400 0 Q200 100 400 200 Q600 300 400 400 Q200 500 400 600 Q600 700 400 800 Q200 900 400 1000 Q600 1100 400 1200 Q200 1300 400 1400 Q600 1500 400 1600 Q200 1700 400 1800 Q600 1900 400 2000"
          stroke="url(#nileGradient)"
          strokeWidth="6"
          fill="none"
          className="opacity-40"
        />
        <defs>
          <linearGradient id="nileGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#121769" />
            <stop offset="50%" stopColor="#67246A" />
            <stop offset="100%" stopColor="#FE49AF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating hieroglyphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-xl opacity-10 text-[#121769] animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          >
            {['𓀭', '𓂀', '𓊖', '𓇳', '𓉻', '𓃭', '𓆣', '𓋹'][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>

      {timelineEvents.map((event, index) => {
        const isLeft = index <= Math.floor(timelineEvents.length / 2);
        const typeColors = {
          1: { 
            bg: 'bg-[#121769]', 
            cardBg: 'bg-gradient-to-br from-[#EBEBD3] to-[#EBEBD3]/90', 
            text: 'text-[#121769]', 
            circle: 'from-[#121769] to-[#67246A]',
            dateBg: 'bg-gradient-to-r from-[#121769] to-[#67246A]',
            border: 'border-[#121769]/20',
            hover: 'hover:shadow-[0_10px_30px_-5px_rgba(18,23,105,0.3)]'
          },
          2: { 
            bg: 'bg-[#67246A]', 
            cardBg: 'bg-gradient-to-br from-[#EBEBD3] to-[#EBEBD3]/90', 
            text: 'text-[#67246A]', 
            circle: 'from-[#67246A] to-[#FE49AF]',
            dateBg: 'bg-gradient-to-r from-[#67246A] to-[#FE49AF]',
            border: 'border-[#67246A]/20',
            hover: 'hover:shadow-[0_10px_30px_-5px_rgba(103,36,106,0.3)]'
          },
          3: { 
            bg: 'bg-[#FE49AF]', 
            cardBg: 'bg-gradient-to-br from-[#EBEBD3] to-[#EBEBD3]/90', 
            text: 'text-[#FE49AF]', 
            circle: 'from-[#FE49AF] to-[#121769]',
            dateBg: 'bg-gradient-to-r from-[#FE49AF] to-[#121769]',
            border: 'border-[#FE49AF]/20',
            hover: 'hover:shadow-[0_10px_30px_-5px_rgba(254,73,175,0.3)]'
          }
        };
        const colors = typeColors[event.type];

        return (
          <div
            key={index}
            className={`relative mb-24`}
            onMouseEnter={() => setActiveEvent(index)}
            onMouseLeave={() => setActiveEvent(null)}
          >
            {/* Main container with flexible layout */}
            <div className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
               
              {/* Content Card - Papyrus style */}
              <div
                className={`w-full md:max-w-md animate-scale-in transform transition-all duration-500 ${activeEvent === index ? 'scale-105' : 'scale-100'}`}
                style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
                onClick={() => openModal(event)}
              >
                <div className={`relative ${colors.cardBg} rounded-xl p-4 md:p-6 shadow-lg border-2 ${colors.border} ${colors.hover} transition-all duration-500 backdrop-blur-sm cursor-pointer group`}>
                   
                  {/* Image preview */}
                  {event.image && (
                    <div className="relative h-32 md:h-40 mb-4 overflow-hidden rounded-lg">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                  )}
                   
                  {/* Hieroglyphic corner decorations */}
                  <div className="absolute top-2 left-2 text-xs opacity-30 hidden md:block">𓀭</div>
                  <div className="absolute top-2 right-2 text-xs opacity-30 hidden md:block">𓂀</div>
                  <div className="absolute bottom-2 left-2 text-xs opacity-30 hidden md:block">𓊖</div>
                  <div className="absolute bottom-2 right-2 text-xs opacity-30 hidden md:block">𓇳</div>
                   
                  {/* Title with Egyptian styling */}
                  <h3 className={`text-lg md:text-xl font-bold ${colors.text} mb-3 leading-tight flex items-center gap-2`}>
                    <span className="text-base md:text-lg">𓉻</span>
                    {event.title}
                  </h3>
 
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed text-sm font-medium">
                    {event.description.substring(0, 100)}...
                  </p>
 
                  {/* Pyramid corner elements */}
                  <div className="absolute top-4 right-4 opacity-20 hidden md:block">
                    <div className={`w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-transparent ${colors.bg.replace('bg-', 'border-b-')}`}></div>
                  </div>
                   
                  {/* Click indicator */}
                  <div className="absolute bottom-2 right-4 text-xs text-gray-400 flex items-center gap-1">
                    <span className="text-xs md:text-sm">Click for details</span>
                    <span className="animate-pulse">↓</span>
                  </div>
                </div>
              </div>

              {/* Connecting Circle - Eye of Horus style */}
              <div 
                className="relative z-10 animate-scale-in transform transition-all duration-500 hover:scale-125"
                style={{ animationDelay: `${index * 0.15 + 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.circle} shadow-xl flex items-center justify-center group transition-all duration-300 border-4 border-white hover:rotate-12`}>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="text-base">𓂀</div>
                  </div>
                </div>
              </div>

              {/* Date Badge - Cartouche style */}
              <div 
                className={`flex-1 max-w-md animate-fade-in transform transition-all duration-500 ${activeEvent === index ? 'scale-110' : 'scale-100'}`}
                style={{ animationDelay: `${index * 0.15 + 0.3}s` }}
              >
                <div className={`${isLeft ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block ${colors.dateBg} text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl border-2 border-white/50 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 rounded-full"></div>
                    <span className="relative z-10">{event.date}</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shine"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated connecting line */}
            <div className={`absolute top-1/2 ${isLeft ? 'left-1/2' : 'right-1/2'} transform -translate-y-1/2 w-16 h-1 ${colors.bg} opacity-30`}></div>

            {/* Floating particles */}
            <div className={`absolute top-1/2 ${isLeft ? 'left-1/2' : 'right-1/2'} transform -translate-y-1/2`}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div 
                  key={i}
                  className={`absolute w-2 h-2 ${colors.bg} rounded-full animate-float opacity-60`}
                  style={{ 
                    left: `${Math.random() * 20 - 10}px`,
                    top: `${Math.random() * 20 - 10}px`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        );
      })}

      {/* End marker - Pyramid
      <div className="relative flex justify-center mt-12 animate-scale-in">
        <div className="relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}> */}
          {/* Pyramid structure */}
          {/* <div className="w-24 h-24 bg-gradient-to-br from-[#121769] via-[#67246A] to-[#FE49AF] relative shadow-2xl hover:scale-110 transition-all duration-500 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[48px] border-r-[48px] border-b-[60px] border-transparent border-b-[#121769]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl animate-bounce">𓂀</div>
            </div>
          </div> */}
          {/* Pyramid glow effect */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-[#121769] via-[#67246A] to-[#FE49AF] animate-ping opacity-20">
            <div className="w-0 h-0 border-l-[48px] border-r-[48px] border-b-[60px] border-transparent border-b-[#121769]"></div>
          </div> */}
          {/* Tooltip */}
          {/* <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#121769] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Back to Top
          </div> */}
        {/* </div>
      </div> */}

      {/* Modal for detailed view */}
      {showModal && modalContent && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative bg-[#EBEBD3] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-[#121769]/20">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 bg-[#FE49AF] text-white w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              ×
            </button>
            
            {modalContent.image && (
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                  src={modalContent.image} 
                  alt={modalContent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-3xl font-bold">{modalContent.title}</h2>
                  <p className="text-xl">{modalContent.date}</p>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="prose max-w-none text-[#121769]">
                <p className="text-lg mb-6">{modalContent.description}</p>
                
                {/* Additional content could be added here */}
                <div className="bg-[#121769]/10 p-4 rounded-lg border-l-4 border-[#67246A]">
                  <h4 className="font-bold text-[#67246A] mb-2">Historical Significance</h4>
                  <p>This event marked a turning point in Egyptian history, influencing culture, architecture, and politics for centuries to come.</p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <button 
                  onClick={closeModal}
                  className="bg-gradient-to-r from-[#121769] to-[#67246A] text-white px-6 py-2 rounded-full hover:scale-105 transition-transform"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes shine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shine {
          animation: shine 3s linear infinite;
          background-size: 200% auto;
        }
      `}</style>
    </div>
  );
};

export default Timeline;