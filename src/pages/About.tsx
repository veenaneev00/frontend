import { lazy, Suspense, useEffect } from "react";
import "../assets/css/sections/about.css";

const Header = lazy(() => import("../componets/Header"));
const Footer = lazy(() => import("../componets/Footer"));

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Pranshu Gupta",
      role: "Creative Director & Fx Artist",
      image: "/images/about/Pranshu_Gupta-Creative_Director_and_Fx_Artist.JPG",
    },
    {
      id: 2,
      name: "Pradeep Patidar",
      role: "3D Animator Motion Graphic",
      image: "/images/about/Pradeep_Patidar-3D_Animator-Motion_Graphic.JPG",
    },
    {
      id: 3,
      name: "Satish Kumar",
      role: "3D Animator",
      image: "/images/about/Satish_Kumar-3d_Animator.JPG",
    },
    {
      id: 4,
      name: "Shantanu Manna",
      role: "3D Modeller",
      image: "/images/about/Shantanu_Manna-3D_Modeller.JPG",
    },
    {
      id: 5,
      name: "Liza",
      role: "Fx Artist",
      image: "/images/about/Liza-Fx_Artist.png",
    },
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
                  RENDER DAC was built on a simple belief: great product visuals
                  aren’t just seen — they’re experienced.{" "}
                </p>
                <p>
                  We work closely with founders, startups, and global teams to
                  transform products into high-impact 3D visuals that
                  communicate value instantly. From photo-realistic renders to
                  cinematic product animations, our focus is on clarity,
                  precision, and visual storytelling that sells.
                </p>
                <p>
                  Our process is hands-on and collaborative. We combine
                  technical accuracy with creative lighting, materials, and
                  motion to craft visuals that feel premium, believable, and
                  purpose-driven — not generic.
                </p>
              </div>
            </div>

            <div className="story-image">
              <img src="/images/about/Arnav_Gupta-Founder_CreativeDirector.PNG" alt="Our Story" />
            </div>

            <div className="story-quote">
              <p className="quote-text">
                At RENDER DAC, we don’t just make things look good. We help
                brands launch, explain, and elevate their products through
                world-class 3D product animation and rendering.
              </p>
              <div className="quote-author">
                <p className="author-name">Arnav Gupta</p>
                <p className="author-role">Founder & Creative Director</p>
                <div className="author-social">
                  <a href="https://www.instagram.com/therenderdac/" className="social-link">
                    Instagram
                  </a>
                  <a href="https://www.linkedin.com/company/renderdac/?viewAsMember=true" className="social-link">
                    LinkedIn
                  </a>
                  {/* <a href="#" className="social-link">
                    YouTube
                  </a> */}
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
