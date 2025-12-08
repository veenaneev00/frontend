import { lazy, Suspense } from 'react';

const Header = lazy(() => import('../componets/Header'));
const Hero = lazy(() => import('../componets/Hero'));
// const Projects = lazy(() => import('../componets/Projects'));
const Pricing = lazy(() => import('../componets/Pricing'));
const Testimonials = lazy(() => import('../componets/Testimonials'));
const FAQ = lazy(() => import('../componets/FAQ'));
// const Footer = lazy(() => import('../components/Footer'));

const HomePage = () => {
  return (
    <>
      <Suspense fallback={<div className="loading-header" />}>
        <Header />
      </Suspense>
      
      <Suspense fallback={<div className="section-loading" />}>
        <Hero />
      </Suspense>
      
      {/* <Suspense fallback={<div className="section-loading" />}>
        <Projects />
      </Suspense> */}

      <Suspense fallback={<div className="section-loading" />}>
        <Pricing />
      </Suspense>

      <Suspense fallback={<div className="section-loading" />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<div className="section-loading" />}>
        <FAQ />
      </Suspense>

      {/* Uncomment when Footer is ready */}
      {/* <Suspense fallback={<div className="section-loading" />}>
        <Footer />
      </Suspense> */}
    </>
  );
};

export default HomePage;