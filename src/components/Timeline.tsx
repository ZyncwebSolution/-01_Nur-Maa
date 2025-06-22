import React, { useState } from 'react';

// Type definitions
type TimelineEventType = 'main' | 'landmark' | 'spin-off' | 'remake';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  details: string; // New field for detailed explanation
  image: string; // New field for image URL
}

const defaultEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "2010",
    title: "Kitchen Beginnings",
    description: "The journey begins in a home kitchen.",
    details: "Nurmaa starts her homemade food and makeup product business from her own kitchen, experimenting with recipes and ingredients.",
    image: "https://images.unsplash.com/photo-1587370560942-1ca29e8256ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvbWUgY29va2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    date: "2013",
    title: "Local Markets",
    description: "Selling at local markets and fairs.",
    details: "Nurmaa starts selling her products at local markets and fairs, gaining valuable customer feedback and building a loyal following.",
    image: "https://images.unsplash.com/photo-1559679844-274493821490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxvY2FsJTIwbWFya2V0fGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    date: "2017",
    title: "Online Store Launch",
    description: "Taking the business online.",
    details: "Nurmaa launches her online store, expanding her reach and making her products available to customers nationwide.",
    image: "https://images.unsplash.com/photo-1517314067944-3525b6127945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9ubGluZSUyMHNob3BwaW5nfGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    date: "2020",
    title: "First Retail Store",
    description: "Opening the first brick-and-mortar store.",
    details: "Nurmaa opens her first retail store, providing a physical space for customers to experience her products firsthand.",
    image: "https://images.unsplash.com/photo-1540747903589-440c1449d0a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJldGFpbCUyMHN0b3JlfGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    date: "2023",
    title: "National Recognition",
    description: "Gaining national recognition for quality and innovation.",
    details: "Nurmaa receives national recognition for her commitment to quality, innovation, and sustainable business practices.",
    image: "https://images.unsplash.com/photo-1542744166-e35939358c6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5hdGlvbmFsJTIwcmVjb2duaXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  }
];

const MarioTimeline: React.FC<{ events?: TimelineEvent[] }> = ({ events = defaultEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const handleCardClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
  };

  const closeDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <section id="timeline" className="p-8 bg-[#EBEBD3]">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#67246a]">A Future Timeline Design</h1>
      <p className="text-center mb-8 text-[#121769]">Explore the milestones that shaped the Nurmaa story.</p>

      {/* Timeline Container */}
      <div className="relative wrap overflow-hidden p-10 h-full bg-white/80 rounded-lg shadow-inner border-2 border-[#FE49AF]/15">
        {/* Vertical Line */}
        <div className="border-2-2 absolute border-opacity-70 border-[#FE49AF] h-full border-l-2 left-10"></div>

        {events.map((event, index) => (
          <div key={event.id} className="mb-12 flex items-center w-full">
             {/* Event Marker */}
             <div className="z-20 flex items-center justify-center bg-[#FE49AF] shadow-lg shadow-[#FE49AF]/50 w-8 h-8 rounded-full absolute left-6 -translate-x-1/2">
              <span className="text-[#121769] font-bold text-sm">{index + 1}</span>
            </div>
            {/* Event Card */}
            <div className="order-2 bg-white/80 text-[#121769] rounded-xl p-6 shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-[#FE49AF]/30 cursor-pointer w-full ml-16 border-2 border-[#FE49AF]/15" onClick={() => handleCardClick(event)}>
              <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-t-xl mb-4" />
              <h2 className="text-xl font-semibold text-[#121769] mb-2">{event.title}</h2>
              <p className="text-gray-400 mb-4">{event.date}</p>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white/80 text-[#121769] p-8 rounded-lg shadow-xl max-w-md w-full border-2 border-[#FE49AF]/15">
            <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-[#FE49AF]">{selectedEvent.title}</h2>
            <p className="mb-6 text-[#121769]">{selectedEvent.details}</p>
            <button className="bg-[#FE49AF] hover:bg-[#67246a] text-white px-6 py-3 rounded-lg transition-colors duration-300" onClick={closeDetails}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MarioTimeline;
