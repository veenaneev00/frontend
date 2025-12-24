import { useState, useRef, useCallback } from 'react';
import '../assets/css/sections/testimonials.css';

interface Testimonial {
  id: number;
  video: string;
  // poster: string;
  clientName: string;
  clientTitle: string;
  company: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const testimonials: Testimonial[] = [
    {
      id: 1,
      video: '/videos/Testimonial/Testimonial-1.mp4',
      // poster: '/images/team-1.jpg',
      clientName: 'John Doe',
      clientTitle: 'CEO',
      company: 'Tech Corp',
    },
    // {
    //   id: 2,
    //   video: '/videos/card-premium.mp4',
    //   // poster: '/images/team-2.jpg',
    //   clientName: 'Jane Smith',
    //   clientTitle: 'Marketing Director',
    //   company: 'Brand Co',
    // },
    // {
    //   id: 3,
    //   video: '/videos/card-social.mp4',
    //   // poster: '/images/team-3.jpg',
    //   clientName: 'Mike Johnson',
    //   clientTitle: 'Product Manager',
    //   company: 'Innovation Ltd',
    // },
    // {
    //   id: 4,
    //   video: '/videos/card-speed.mp4',
    //   // poster: '/images/team-4.jpg',
    //   clientName: 'Sarah Williams',
    //   clientTitle: 'Creative Director',
    //   company: 'Design Studio',
    // },
    // {
    //   id: 5,
    //   video: '/videos/card-standout.mp4',
    //   // poster: '/images/team-5.jpg',
    //   clientName: 'David Brown',
    //   clientTitle: 'Founder',
    //   company: 'Startup Inc',
    // },
  ];

  const setVideoRef = useCallback((id: number) => {
    return (el: HTMLVideoElement | null) => {
      videoRefs.current[id] = el;
    };
  }, []);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    stopAllVideos();
    setTimeout(() => {
      setIsTransitioning(false);
      setSlideDirection(null);
    }, 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    stopAllVideos();
    setTimeout(() => {
      setIsTransitioning(false);
      setSlideDirection(null);
    }, 500);
  };

  const stopAllVideos = () => {
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setPlayingVideo(null);
  };

  const toggleVideo = (id: number) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (playingVideo === id) {
      video.pause();
      setPlayingVideo(null);
    } else {
      stopAllVideos();
      video.play();
      setPlayingVideo(id);
    }
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      visible.push({
        testimonial: testimonials[index],
        position: i,
      });
    }
    return visible;
  };

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Our Clients Say</h2>
          <p className="testimonials-subtitle">
            Real feedback from brands we've helped transform with stunning 3D animations
          </p>
        </div>

        {/* Slider */}
        <div className={`testimonials-slider ${slideDirection ? `sliding-${slideDirection}` : ''}`}>
          <div className="testimonials-track">
            {getVisibleTestimonials().map(({ testimonial, position }) => (
              <div
                key={`${testimonial.id}-${position}`}
                className={`testimonial-card testimonial-position-${position}`}
                style={{
                  transform: `translateX(${position * 110}%) scale(${position === 0 ? 1 : 0.85})`,
                  zIndex: position === 0 ? 10 : 5 - Math.abs(position),
                  opacity: Math.abs(position) > 2 ? 0 : 1,
                }}
                onClick={() => position === 0 && toggleVideo(testimonial.id)}
              >
                <div className="testimonial-video-container">
                  <video
                    ref={setVideoRef(testimonial.id)}
                    className="testimonial-video"
                    // poster={testimonial.poster}
                    loop
                    playsInline
                  >
                    <source src={testimonial.video} type="video/mp4" />
                  </video>

                  {/* Play/Pause Status Badge */}
                  {position === 0 && (
                    <div className="video-status-badge">
                      {playingVideo === testimonial.id ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="4" y="3" width="3" height="10" fill="currentColor" rx="0.5" />
                            <rect x="9" y="3" width="3" height="10" fill="currentColor" rx="0.5" />
                          </svg>
                          <span>Playing</span>
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M5 3v10l8-5-8-5z" fill="currentColor" />
                          </svg>
                          <span>Paused</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Click to Play Hint */}
                  {position === 0 && playingVideo !== testimonial.id && (
                    <div className="video-click-hint">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                        <path d="M12 8l12 8-12 8V8z" fill="currentColor" />
                      </svg>
                      <span>Click to Play</span>
                    </div>
                  )}

                  {/* Overlay for non-center cards */}
                  {position !== 0 && <div className="testimonial-overlay" />}
                </div>

                {/* Client Info */}
                {position === 0 && (
                  <div className="testimonial-info">
                    <h3 className="testimonial-client-name">{testimonial.clientName}</h3>
                    <p className="testimonial-client-title">
                      {testimonial.clientTitle} at {testimonial.company}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Slide Direction Indicator */}
          {slideDirection && (
            <div className={`slide-indicator slide-indicator-${slideDirection}`}>
              {slideDirection === 'left' ? (
                <>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M8 16h16M16 8l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Sliding Right</span>
                </>
              ) : (
                <>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M24 16H8M16 8l-8 8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Sliding Left</span>
                </>
              )}
            </div>
          )}

          {/* Navigation Arrows */}
          <button 
            className="testimonial-nav-btn testimonial-nav-prev" 
            onClick={handlePrev}
            disabled={isTransitioning}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button 
            className="testimonial-nav-btn testimonial-nav-next" 
            onClick={handleNext}
            disabled={isTransitioning}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;