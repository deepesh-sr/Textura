import './App.css'
import Navbar from './components/Navbar'
import HeroSlider from './components/HeroSlider'
import StatsSection from './components/StatsSection'
import FeaturesSection from './components/FeaturesSection'
import ServicesSection from './components/ServicesSection'
import IndustriesSection from './components/IndustriesSection'
import CaseStudiesSection from './components/CaseStudiesSection'
import TexturaSection from './components/TexturaSection'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import { useEffect, useState } from 'react'

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setIsAdmin(role === 'Admin');

    const handleHashChange = () => {
      setShowDashboard(window.location.hash === '#cms');
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <Navbar />
      {isAdmin && showDashboard ? (
        <AdminDashboard onClose={() => {
          window.location.hash = '';
          setShowDashboard(false);
        }} />
      ) : (
        <>
          <HeroSlider />
          <StatsSection />
          <FeaturesSection />
          <ServicesSection />
          <IndustriesSection />
          <CaseStudiesSection />
          <TexturaSection />
        </>
      )}
      <Footer />
    </>
  )
}

export default App
