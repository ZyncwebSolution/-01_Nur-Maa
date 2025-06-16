import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';

// Type definitions
type TimelineEventType = 'main' | 'landmark' | 'spin-off' | 'remake';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  type?: TimelineEventType; // Optional type for future use
}

interface MarioTimelineProps {
  events?: TimelineEvent[]; // Optional custom events
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
  }; // Optional theme customization
}

// Default events data
const defaultEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "September 1985",
    title: "Super Mario Brothers",
    description: "The game that started it all! Original platformer for NES that defined the genre.",
    type: "main"
  },
  {
    id: 2,
    date: "June 1996",
    title: "Super Mario 64",
    description: "Revolutionary 3D platformer that defined 3D gaming for generations.",
    type: "landmark"
  },
  {
    id: 3,
    date: "November 2007",
    title: "Super Mario Galaxy",
    description: "Wii title with spherical gravity mechanics and orchestrated soundtrack.",
    type: "landmark"
  },
  {
    id: 4,
    date: "October 2017",
    title: "Super Mario Odyssey",
    description: "Switch title featuring capture mechanic with Mario's hat and open-world exploration.",
    type: "landmark"
  },
  {
    id: 5,
    date: "February 2021",
    title: "Super Mario 3D World + Bowser's Fury",
    description: "Switch port with additional content featuring an open-world style experience.",
    type: "remake"
  }
];

const MarioTimeline: React.FC<MarioTimelineProps> = ({ 
  events = defaultEvents,
  theme = {}
}) => {
  // Destructure theme with defaults
  const {
    primaryColor = '#9251ac',
    secondaryColor = '#f6a4ec',
    textColor = '#525f7f'
  } = theme;

  // Responsive: detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Container styles
  const containerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    background: '#f6f9fc',
    fontFamily: '"Open Sans", sans-serif',
    color: textColor,
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  // Title styles
  const titleStyle: React.CSSProperties = {
    margin: '5%',
    textAlign: 'center',
    fontSize: '4rem',
    fontWeight: 100,
    color: primaryColor
  };

  const subtitleStyle: React.CSSProperties = {
    margin: '4%',
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 100
  };

  // Timeline styles
  const timelineStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px auto',
    position: 'relative'
  };

  // Event styles
  const eventBaseStyle: React.CSSProperties = {
    marginBottom: '20px',
    position: 'relative',
    display: 'flex',
    margin: '20px 0',
    borderRadius: '6px',
    alignSelf: 'center',
    width: '50vw'
  };

  const eventReversedStyle: React.CSSProperties = {
    ...eventBaseStyle,
    flexDirection: 'row-reverse'
  };

  // Animation keyframes as inline style string
  const keyframesStyle = `
    @keyframes fillLeft {
      100% { right: 100%; }
    }
    @keyframes fillTop {
      100% { top: 100%; }
    }
    @keyframes fillLeftOdd {
      100% { left: 100%; }
    }
  `;

  // Helper to get event type class
  const getEventTypeClass = (type?: TimelineEventType) => {
    if (type === 'landmark') return 'timeline__event timeline__event--type2';
    if (type === 'remake') return 'timeline__event timeline__event--type3';
    return 'timeline__event';
  };

  // Color palette for the site
  const color1 = '#FE49AF'; // main purple
  const color2 = '#67246a'; // secondary pink
  const color3 = '#EBEBD3'; // blue
  const color4 = '#121769'; // dark blue

  // Helper to convert string values to correct CSSProperties types
  function asFlexDirection(val: string) {
    return val as React.CSSProperties['flexDirection'];
  }
  function asPosition(val: string) {
    return val as React.CSSProperties['position'];
  }
  function asTextTransform(val: string) {
    return val as React.CSSProperties['textTransform'];
  }

  return (
    <div style={containerStyle}>
      <style>{keyframesStyle}</style>
      <h2 style={{
        ...titleStyle,
        color: color1,
        fontSize: '4.5rem',
        fontWeight: 700,
        letterSpacing: '2px',
        margin: '2% 0 1% 0',
        animation: 'fadeInDown 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
      }}>
        Our Journey: The Nurmaa Story
      </h2>
      <h3 style={{
        ...subtitleStyle,
        color: color2,
        fontSize: '2.2rem',
        fontWeight: 400,
        margin: '0 0 3% 0',
        animation: 'fadeIn 2s cubic-bezier(0.23, 1, 0.32, 1)'
      }}>
        Milestones and Achievements That Define Us
      </h3>
      <style>{`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="timeline" style={{...timelineStyle, maxWidth: '1300px'}}>
        {events.map((event, index) => {
          const isReversed = index % 2 === 0;
          const eventTypeClass = getEventTypeClass(event.type);
          let eventColors = { primary: color4, secondary: color1 };
          if (event.type === 'landmark') eventColors = { primary: color4, secondary: color1 };
          if (event.type === 'remake') eventColors = { primary: color4, secondary: color1 };

          const eventStyle: React.CSSProperties = {
            marginBottom: isMobile ? 16 : 32,
            position: asPosition('relative'),
            display: 'flex',
            margin: isMobile ? '16px 0' : '32px 0',
            borderRadius: 8,
            alignSelf: 'center',
            width: isMobile ? '90vw' : '60vw',
            flexDirection: asFlexDirection(isMobile ? 'column' : (isReversed ? 'row-reverse' : 'row')),
            opacity: 0,
            transform: 'translateY(40px)',
            animation: `fadeInUp 1.2s ${0.3 + index * 0.2}s cubic-bezier(0.23, 1, 0.32, 1) forwards`,
          };
          const dateBoxStyle: React.CSSProperties = {
            color: eventColors.secondary,
            fontSize: isMobile ? '1.5rem' : '2rem',
            fontWeight: 700,
            background: eventColors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            padding: isMobile ? '0 16px' : '0 32px',
            borderRadius: isMobile ? '8px 8px 0 0' : (isReversed ? '0 8px 8px 0' : '8px 0 0 8px'),
            minWidth: isMobile ? 120 : 180,
            minHeight: isMobile ? 40 : 70,
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
            width: isMobile ? '100%' : undefined,
          };
          const contentBoxStyle: React.CSSProperties = {
            padding: isMobile ? 16 : 32,
            boxShadow: '0 30px 60px -12px rgba(50, 50, 93, 0.18), 0 18px 36px -18px rgba(0, 0, 0, 0.18), 0 -12px 36px -8px rgba(0, 0, 0, 0.025)',
            background: '#fff',
            width: isMobile ? '100%' : 'calc(50vw - 84px)',
            borderRadius: isMobile ? '0 0 8px 8px' : (isReversed ? '8px 0 0 8px' : '0 8px 8px 0'),
            minHeight: isMobile ? 60 : 120,
          };
          const iconStyle: React.CSSProperties = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: eventColors.primary,
            padding: 28,
            alignSelf: 'center',
            margin: '0 32px',
            background: eventColors.secondary,
            borderRadius: '100%',
            width: 60,
            boxShadow: '0 30px 60px -12px rgba(50, 50, 93, 0.18), 0 18px 36px -18px rgba(0, 0, 0, 0.18), 0 -12px 36px -8px rgba(0, 0, 0, 0.025)',
            height: 60,
            position: asPosition('relative'),
            fontSize: '2rem',
          };
          // Animation lines
          const iconBeforeStyle: React.CSSProperties = {
            content: '""',
            width: 2,
            height: '100%',
            background: eventColors.secondary,
            position: asPosition('absolute'),
            top: '0%',
            zIndex: -1,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'fillTop 2s forwards 0.5s ease-in-out',
            display: index === events.length - 1 ? 'none' : undefined,
          };
          const iconAfterStyle: React.CSSProperties = {
            content: '""',
            width: '100%',
            height: 2,
            background: eventColors.secondary,
            position: asPosition('absolute'),
            left: isReversed ? undefined : 0,
            right: isReversed ? 0 : undefined,
            zIndex: -1,
            top: '50%',
            transform: 'translateY(-50%)',
            animation: isReversed ? 'fillLeft 2s forwards 0.5s ease-in-out' : 'fillLeftOdd 2s forwards 0.5s ease-in-out',
            display: index === events.length - 1 ? 'none' : undefined,
          };
          const titleTextStyle: React.CSSProperties = {
            fontSize: '1.5rem',
            lineHeight: 1.4,
            textTransform: asTextTransform('uppercase'),
            fontWeight: 700,
            color: eventColors.primary,
            letterSpacing: '2px',
            marginBottom: 8,
          };
          const descriptionStyle: React.CSSProperties = {
            flexBasis: '100%',
            color: textColor,
            fontSize: '1.1rem',
            marginTop: 8,
          };
          return (
            <div key={event.id} className={eventTypeClass} style={eventStyle}>
              <div style={iconStyle}>
                <FontAwesomeIcon icon={faGamepad} />
                <div style={iconBeforeStyle} />
                <div style={iconAfterStyle} />
              </div>
              <div style={dateBoxStyle}>{event.date}</div>
              <div style={contentBoxStyle}>
                <div style={titleTextStyle}>{event.title}</div>
                <div style={descriptionStyle}><p>{event.description}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarioTimeline;