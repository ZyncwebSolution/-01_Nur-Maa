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
  type?: TimelineEventType;
}

interface MarioTimelineProps {
  events?: TimelineEvent[];
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
  };
}

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
  const {
    primaryColor = '#9251ac',
    secondaryColor = '#f6a4ec',
    textColor = '#525f7f'
  } = theme;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Color constants
  const color1 = '#FE49AF';
  const color2 = '#67246a';
  const color4 = '#121769';

  // Helper functions for TypeScript
  const asPosition = (val: string) => val as React.CSSProperties['position'];
  const asTextTransform = (val: string) => val as React.CSSProperties['textTransform'];

  // Base styles
  const containerStyle: React.CSSProperties = {
    background: '#f6f9fc',
    fontFamily: '"Open Sans", sans-serif',
    color: textColor,
    padding: isMobile ? '16px' : '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const titleStyle: React.CSSProperties = {
    margin: isMobile ? '10px 0' : '5%',
    textAlign: 'center',
    fontSize: isMobile ? '2rem' : '4.5rem',
    fontWeight: 700,
    letterSpacing: '1px',
    color: color1,
    animation: 'fadeInDown 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
  };

  const subtitleStyle: React.CSSProperties = {
    margin: isMobile ? '0 0 20px' : '0 0 3%',
    textAlign: 'center',
    fontSize: isMobile ? '1.2rem' : '2.2rem',
    fontWeight: 400,
    color: color2,
    animation: 'fadeIn 2s cubic-bezier(0.23, 1, 0.32, 1)'
  };

  const timelineStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: isMobile ? '10px auto' : '20px auto',
    maxWidth: '1300px'
  };

  return (
    <div style={containerStyle}>
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
        @keyframes fillLeft {
          100% { right: 100%; }
        }
        @keyframes fillTop {
          100% { top: 100%; }
        }
        @keyframes fillLeftOdd {
          100% { left: 100%; }
        }
      `}</style>

      <h2 style={titleStyle}>Our Journey: The Nurmaa Story</h2>
      <h3 style={subtitleStyle}>Milestones and Achievements That Define Us</h3>

      <div style={timelineStyle}>
        {events.map((event, index) => {
          const eventColors = {
            primary: color4,
            secondary: color1,
            ...(event.type === 'landmark' && { secondary: color1 }),
            ...(event.type === 'remake' && { secondary: color1 })
          };

          // Mobile-specific layout
          if (isMobile) {
            return (
              <div key={event.id} style={{
                position: 'relative',
                marginBottom: '30px',
                opacity: 0,
                animation: `fadeInUp 1.2s ${0.3 + index * 0.2}s forwards`
              }}>
                {/* Date box - top */}
                <div style={{
                  background: eventColors.primary,
                  color: eventColors.secondary,
                  padding: '8px 12px',
                  borderRadius: '8px 8px 0 0',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  textAlign: 'center'
                }}>
                  {event.date}
                </div>

                {/* Content box */}
                <div style={{
                  background: '#fff',
                  padding: '16px',
                  borderRadius: '0 0 8px 8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: eventColors.primary,
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase' as const,
                    letterSpacing: '1px'
                  }}>
                    {event.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    color: textColor,
                    margin: 0
                  }}>
                    {event.description}
                  </p>
                </div>

                {/* Connector line (except last item) */}
                {index < events.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: '20px',
                    width: '2px',
                    background: eventColors.secondary,
                    animation: 'fillTop 1s forwards 0.5s'
                  }} />
                )}
              </div>
            );
          }

          // Desktop layout
          return (
            <div key={event.id} style={{
              display: 'flex',
              position: 'relative',
              margin: '30px 0',
              alignItems: 'center',
              opacity: 0,
              animation: `fadeInUp 1.2s ${0.3 + index * 0.2}s forwards`
            }}>
              {/* Left side (date) */}
              <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                padding: index % 2 === 0 ? '0 30px 0 0' : '0 0 0 30px'
              }}>
                {index % 2 === 0 && (
                  <div style={{
                    background: eventColors.primary,
                    color: eventColors.secondary,
                    padding: '12px 24px',
                    borderRadius: '8px 0 0 8px',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    textAlign: 'center'
                  }}>
                    {event.date}
                  </div>
                )}
              </div>

              {/* Center icon */}
              <div style={{
                position: 'relative',
                background: eventColors.secondary,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: eventColors.primary,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                flexShrink: 0,
                zIndex: 2
              }}>
                <FontAwesomeIcon icon={faGamepad} />
              </div>

              {/* Right side (content) */}
              <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                padding: index % 2 === 0 ? '0 0 0 30px' : '0 30px 0 0'
              }}>
                {index % 2 !== 0 && (
                  <div style={{
                    background: eventColors.primary,
                    color: eventColors.secondary,
                    padding: '12px 24px',
                    borderRadius: '0 8px 8px 0',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    textAlign: 'center'
                  }}>
                    {event.date}
                  </div>
                )}
              </div>

              {/* Content box (alternating sides) */}
              <div style={{
                position: 'absolute',
                [index % 2 === 0 ? 'left' : 'right']: 'calc(50% + 50px)',
                width: 'calc(50% - 90px)',
                background: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                top: '50%',
                transform: 'translateY(-50%)'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: eventColors.primary,
                  margin: '0 0 10px 0',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '1px'
                }}>
                  {event.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  color: textColor,
                  margin: 0
                }}>
                  {event.description}
                </p>
              </div>

              {/* Connector lines */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '2px',
                background: eventColors.secondary,
                transform: 'translateY(-50%)',
                zIndex: 1,
                animation: index % 2 === 0 ? 'fillLeft 1s forwards 0.5s' : 'fillLeftOdd 1s forwards 0.5s'
              }} />
              {index < events.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  width: '2px',
                  height: '30px',
                  background: eventColors.secondary,
                  transform: 'translateX(-50%)',
                  animation: 'fillTop 1s forwards 0.5s'
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarioTimeline;