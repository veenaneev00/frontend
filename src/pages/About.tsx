import { lazy, Suspense, useEffect } from 'react';
import '../assets/css/sections/about.css';

const Header = lazy(() => import('../componets/Header'));
const Footer = lazy(() => import('../componets/Footer'));

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: 'John doe',
      role: 'Founder & Creative Director',
      image: '/images/team-1.jpg',
    },
    {
      id: 2,
      name: 'John doe',
      role: 'Founder & Creative Director',
      image: '/images/team-2.jpg',
    },
    {
      id: 3,
      name: 'John doe',
      role: 'Founder & Creative Director',
      image: '/images/team-3.jpg',
    },
    {
      id: 4,
      name: 'John doe',
      role: 'Founder & Creative Director',
      image: '/images/team-4.jpg',
    },
    // {
    //   id: 5,
    //   name: 'John doe',
    //   role: 'Founder & Creative Director',
    //   image: '/images/team-5.jpg',
    // },
    // {
    //   id: 6,
    //   name: 'John doe',
    //   role: 'Founder & Creative Director',
    //   image: '/images/team-6.jpg',
    // },
    // {
    //   id: 7,
    //   name: 'John doe',
    //   role: 'Founder & Creative Director',
    //   image: '/images/team-7.jpg',
    // },
    // {
    //   id: 8,
    //   name: 'John doe',
    //   role: 'Founder & Creative Director',
    //   image: '/images/team-8.jpg',
    // },
  ];

  return (
    <div className="about-page">
      <Suspense fallback={<div className="loading-header" />}>
        <Header />
      </Suspense>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          {/* Page Title */}
          {/* <h1 className="about-title">About Us</h1> */}

          {/* Our Story */}
          <div className="about-story">
            <div className="story-content">
              <h2 className="story-heading">Our Story</h2>
              <div className="story-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                  facilisis, eros at placerat porta, augue mi viverra nunc, nec fringilla
                  sapien nisl in magna. Donec porttitor, justo in egestas ullamcorper,
                  neque libero volutpat mauris, sit amet aliquet nisl nulla non odio. Proin
                  quis tortor lorem. Curabitur nec lacus vitae nunc malesuada feugiat. Nam
                  sodales, nibh quis bibendum pulvinar, lectus sapien gravida enim, a
                  ullamcorper urna orci sit amet arcu.
                </p>
                <p>
                  Vivamus in magna non est dictum dictum non vel massa. Mauris posuere
                  sapien at lectus tincidunt porta. Suspendisse a ex eu tortor vestibulum
                  scelerisque sit amet in nulla. Etiam accumsan justo in tincidunt
                  facilisis. Quisque volutpat turpis ut metus pharetra, ac viverra nunc
                  elementum.
                </p>
              </div>
            </div>

            <div className="story-image">
              <img src="/images/about-story.jpg" alt="Our Story" />
            </div>

            <div className="story-quote">
              <p className="quote-text">
                Design should feel like clarity not noise. At D2HMI, we don't just design
                brands, we shape identities that speak without shouting, and last without
                fading.
              </p>
              <div className="quote-author">
                <p className="author-name">Arnav Gupta</p>
                <p className="author-role">Founder & Creative Director</p>
                <div className="author-social">
                  <a href="#" className="social-link">Instagram</a>
                  <a href="#" className="social-link">LinkedIn</a>
                  <a href="#" className="social-link">Youtube</a>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="about-team">
            <h2 className="team-heading">Team</h2>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member">
                  <div className="team-member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="team-member-info">
                    <h3 className="team-member-name">{member.name}</h3>
                    <p className="team-member-role">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="section-loading" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default About;