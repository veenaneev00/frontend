import { useState, useEffect } from 'react';
import '../assets/css/sections/hero.css';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // All 5 cards data
  const allCards = [
    {
      id: 1,
      badge: 'RESULTS',
      badgeClass: 'card-badge-results',
      title: 'Conversions',
      description: 'Turn clicks into paying customers.',
      video: '/videos/card-conversions.mp4',
      videoWebm: '/videos/card-conversions.webm',
      poster: '/images/card-conversions-poster.jpg',
    },
    {
      id: 2,
      badge: 'SPEED',
      badgeClass: 'card-badge-speed',
      title: 'Speed',
      description: 'Launch in days, not weeks.',
      video: '/videos/card-speed.mp4',
      videoWebm: '/videos/card-speed.webm',
      poster: '/images/card-speed-poster.jpg',
    },
    {
      id: 3,
      badge: 'SOCIAL',
      badgeClass: 'card-badge-social',
      title: 'Social-Ready',
      description: 'Made for IG, TikTok, and Meta.',
      video: '/videos/card-social.mp4',
      videoWebm: '/videos/card-social.webm',
      poster: '/images/card-social-poster.jpg',
    },
    {
      id: 4,
      badge: 'STANDOUT',
      badgeClass: 'card-badge-standout',
      title: 'Standout',
      description: 'Be the product no one scrolls past.',
      video: '/videos/card-standout.mp4',
      videoWebm: '/videos/card-standout.webm',
      poster: '/images/card-standout-poster.jpg',
    },
    {
      id: 5,
      badge: 'PREMIUM',
      badgeClass: 'card-badge-premium',
      title: 'Premium',
      description: 'Look like the industry leader.',
      video: '/videos/card-premium.mp4',
      videoWebm: '/videos/card-premium.webm',
      poster: '/images/card-premium-poster.jpg',
    },
  ];

  // Show 3 cards on mobile, all 5 on desktop
  const cardsToShow = isMobile ? allCards.slice(0, 3) : allCards;

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Hero Header */}
        <div className="hero-header">
          <div className="hero-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" fill="currentColor"/>
            </svg>
            <span>RENDERDAC</span>
          </div>

{/* 3D Art, Product Design, Animation, Visualization. Turn your idea into reality. */}

          <h6 className="hero-title">
            3D Art, Product Design, Animation, Visualization.
            <br />
            {/* <span className="hero-title-highlight">3D ANIMATION</span> */}
            {/* <br /> */}
            Turn your idea into reality.
          </h6>

          <a href="#contact" className="hero-cta">
            Chat With Us
          </a>
        </div>

        {/* Product Cards Grid */}
        <div className="hero-cards">
          {cardsToShow.map((card) => (
            <div key={card.id} className="hero-card">
              <div className="card-image">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  poster={card.poster}
                >
                  <source src={card.video} type="video/mp4" />
                  <source src={card.videoWebm} type="video/webm" />
                </video>
              </div>
              <span className={`card-badge ${card.badgeClass}`}>{card.badge}</span>
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;