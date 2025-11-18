// src/App.tsx
import { lazy, Suspense } from 'react';

// Lazy load sections
const Header = lazy(() => import('./componets/Header'));
const Hero = lazy(() => import('./componets/Hero'));
const Projects = lazy(() => import('./componets/Projects'));
// const About = lazy(() => import('./components/About'));
// const Services = lazy(() => import('./components/Services'));
// const Contact = lazy(() => import('./components/Contact'));
// const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Header />
      </Suspense>
      
      <Suspense fallback={<div className="section-loading" />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<div className="section-loading" />}>
        <Projects />  {/* Add this */}
      </Suspense>
      
      {/*<Suspense fallback={<div className="section-loading" />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<div className="section-loading" />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<div className="section-loading" />}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<div className="section-loading" />}>
        <Footer />
      </Suspense> */}
    </>
  );
}

export default App;