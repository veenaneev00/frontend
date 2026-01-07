import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/sections/pricing.css";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  badge?: string;
  features: string[];
  highlightedFeatures?: string[];
  examples: {
    title: string;
    type: "youtube" | "instagram" | "local";
    video: string;
    poster?: string;
  }[];
}

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());

  const pricingPlans: PricingPlan[] = [
    {
      id: "startup",
      name: "Startup",
      price: "₹25,000/-",
      priceNote: "per video",
      badge: "Save Flat ₹1,500/-",
      features: [
        "10-15s Reel/Teaser (1 SKU)",
        "Simple background + lighting",
        "1 revision",
        "Delivered in 10 days",
        "Social reel/ad-ready visuals",
        "3D Modelling - Included",
      ],
      examples: [
        {
          title: "YouTube Shorts Example",
          type: "youtube",
          video: "kJ84gnI9AIA",
        },
        {
          title: "Instagram Reel Example",
          type: "instagram",
          video: "DRPO-8PEplD",
        },
        {
          title: "Perfume 3D Animation Video",
          type: "local",
          video: '/videos/hero-section/HeroSec-3.MP4',
          poster: "images/project/Project-3.png",
        },
        // {
        //   title: "SERUM | 3d Product Animation Video",
        //   type: "local",
        //   video: "/videos/example-startup-2.mp4",
        //   poster: "/images/example-startup-2.jpg",
        // },
        // {
        //   title: "Sneaker 3D Animation Video",
        //   type: "local",
        //   video: "/videos/example-startup-3.mp4",
        //   poster: "/images/example-startup-3.jpg",
        // },
        // {
        //   title: "CGI Product VFX Campaign",
        //   type: "local",
        //   video: "/videos/example-startup-4.mp4",
        //   poster: "/images/example-startup-4.jpg",
        // },
        // {
        //   title: "Cosmetics - 3D Product Animation",
        //   type: "local",
        //   video: "/videos/example-startup-5.mp4",
        //   poster: "/images/example-startup-5.jpg",
        // },
        // {
        //   title: "Smart Watch - 3D product animation",
        //   type: "local",
        //   video: "/videos/example-startup-6.mp4",
        //   poster: "/images/example-startup-6.jpg",
        // },
        // {
        //   title: "Cosmetics- 3D Product Animation",
        //   type: "local",
        //   video: "/videos/example-startup-7.mp4",
        //   poster: "/images/example-startup-7.jpg",
        // },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "₹55,000/-",
      priceNote: "per video",
      features: [
        "20-25s Animation (1 SKU)",
        "Fixed Shot-list (no surprises)",
        "Creative background + pro graphics",
        "2 structured revisions",
        "Delivered in 3 weeks",
        "3D Modelling - Included",
      ],
      examples: [
        // {
        //   title: "YouTube Example",
        //   type: "youtube",
        //   video: "kJ84gnI9AIA",
        // },
        // {
        //   title: "Instagram Example",
        //   type: "instagram",
        //   video: "DRPO-8PEplD",
        // },
        // {
        //   title: "Pro Example 1",
        //   type: "local",
        //   video: "/videos/example-pro-1.mp4",
        //   poster: "/images/example-pro-1.jpg",
        // },
        // {
        //   title: "Pro Example 2",
        //   type: "local",
        //   video: "/videos/example-pro-2.mp4",
        //   poster: "/images/example-pro-2.jpg",
        // },
        // {
        //   title: "Pro Example 3",
        //   type: "local",
        //   video: "/videos/example-pro-3.mp4",
        //   poster: "/images/example-pro-3.jpg",
        // },
        // {
        //   title: "Pro Example 4",
        //   type: "local",
        //   video: "/videos/example-pro-4.mp4",
        //   poster: "/images/example-pro-4.jpg",
        // },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹1,70,500/-",
      priceNote: "per video",
      features: [
        "30-40s Animation (up to 5 SKUs)",
        "Advanced storyboard + shot design",
        "Delivered in 4 week",
        "Lighting, Camera Animation, Depth effects",
        "Up to 3 structured revisions",
        "3D Modelling - Included",
      ],
      examples: [
        // {
        //   title: "YouTube Showcase",
        //   type: "youtube",
        //   video: "kJ84gnI9AIA",
        // },
        // {
        //   title: "Instagram Showcase",
        //   type: "instagram",
        //   video: "DRPO-8PEplD",
        // },
        // {
        //   title: "Premium Example 1",
        //   type: "local",
        //   video: "/videos/example-premium-1.mp4",
        //   poster: "/images/example-premium-1.jpg",
        // },
        // {
        //   title: "Premium Example 2",
        //   type: "local",
        //   video: "/videos/example-premium-2.mp4",
        //   poster: "/images/example-premium-2.jpg",
        // },
        // {
        //   title: "Premium Example 3",
        //   type: "local",
        //   video: "/videos/example-premium-3.mp4",
        //   poster: "/images/example-premium-3.jpg",
        // },
        // {
        //   title: "Premium Example 4",
        //   type: "local",
        //   video: "/videos/example-premium-4.mp4",
        //   poster: "/images/example-premium-4.jpg",
        // },
      ],
    },
  ];

  const openModal = (planId: string) => {
    setSelectedPlan(planId);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setPlayingVideos(new Set());
    document.body.style.overflow = "auto";
  };

  const toggleVideo = (videoId: string) => {
    const video = document.getElementById(videoId) as HTMLVideoElement;
    if (!video) return;

    const newPlayingVideos = new Set(playingVideos);

    if (playingVideos.has(videoId)) {
      video.pause();
      newPlayingVideos.delete(videoId);
    } else {
      video.play();
      newPlayingVideos.add(videoId);
    }

    setPlayingVideos(newPlayingVideos);
  };

  const selectedPlanData = pricingPlans.find(
    (plan) => plan.id === selectedPlan
  );

  return (
    <>
      <section className="pricing-section" id="pricing">
        <div className="pricing-container">
          {/* Header */}
          <div className="pricing-header">
            <h2 className="pricing-title">Our Pricing.</h2>
            <p className="pricing-subtitle">
              No hidden fees. Just world-class animation that fits your budget.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="pricing-cards">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="pricing-card">
                {plan.badge && (
                  <div className="pricing-card-badge">{plan.badge}</div>
                )}

                <div className="pricing-card-header">
                  <h3 className="pricing-card-name">{plan.name}</h3>
                  <div className="pricing-card-price">
                    {plan.price}
                    <span className="pricing-card-note">{plan.priceNote}</span>
                  </div>
                </div>

                <button
                  className="pricing-view-example-btn"
                  onClick={() => openModal(plan.id)}
                >
                  View Example
                </button>

                <ul className="pricing-features">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="pricing-feature">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6 10l3 3 5-6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.highlightedFeatures?.map((feature, index) => (
                    <li key={`highlight-${index}`} className="pricing-feature">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6 10l3 3 5-6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Button */}
          <div className="pricing-footer">
            <Link to="/contact" className="pricing-contact-btn">
              Contact Now
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedPlan && selectedPlanData && (
        <>
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">{selectedPlanData.name} Plan</h2>
              <p className="modal-subtitle">
                Pricing: {selectedPlanData.price}
              </p>
              <button className="modal-close" onClick={closeModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-grid">
                {selectedPlanData.examples.map((example, index) => {
                  const videoId = `video-${selectedPlan}-${index}`;
                  const isPlaying = playingVideos.has(videoId);

                  return (
                    <div key={index} className="modal-video-card">
                      <div className="modal-video-container">
                        {/* YouTube Embed - Clean Version */}
                        {example.type === "youtube" && (
                          <div className="embed-wrapper">
                            <iframe
                              className="modal-video modal-iframe"
                              src={`https://www.youtube.com/embed/${example.video}?controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3`}
                              title={example.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                            <div className="youtube-overlay"></div>
                          </div>
                        )}

                        {/* Instagram Embed - Clean Version */}
                        {example.type === "instagram" && (
                          <div className="embed-wrapper instagram-wrapper">
                            <iframe
                              className="modal-video modal-iframe instagram-iframe"
                              src={`https://www.instagram.com/p/${example.video}/embed/captioned/`}
                              title={example.title}
                              allowFullScreen
                              scrolling="no"
                            />
                            <div className="instagram-overlay">
                              <div className="instagram-overlay-top"></div>
                              <div className="instagram-overlay-button"></div>
                            </div>
                          </div>
                        )}

                        {/* Local Video */}
                        {example.type === "local" && (
                          <>
                            <video
                              id={videoId}
                              className="modal-video"
                              poster={example.poster}
                              loop
                              playsInline
                              preload="none"
                            >
                              <source src={example.video} type="video/mp4" />
                            </video>

                            <button
                              className="modal-video-play-btn"
                              onClick={() => toggleVideo(videoId)}
                            >
                              {isPlaying ? (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <rect
                                    x="4"
                                    y="3"
                                    width="3"
                                    height="10"
                                    fill="currentColor"
                                    rx="1"
                                  />
                                  <rect
                                    x="9"
                                    y="3"
                                    width="3"
                                    height="10"
                                    fill="currentColor"
                                    rx="1"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M5 3.5v9l7-4.5-7-4.5z"
                                    fill="currentColor"
                                  />
                                </svg>
                              )}
                              <span>{isPlaying ? "Pause" : "Play"}</span>
                            </button>
                          </>
                        )}

                        <div className="modal-video-title">
                          <span>{example.title}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Pricing;