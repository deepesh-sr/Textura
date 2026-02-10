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

  useEffect(() => {
    const role = localStorage.getItem('role');
    setIsAdmin(role === 'Admin');
  }, []);

  return (
    <>
      <Navbar />
      {isAdmin && <AdminDashboard />}
      <HeroSlider />
      <StatsSection />
      <FeaturesSection />
      <ServicesSection />
      <IndustriesSection />
      <CaseStudiesSection />
      <TexturaSection />
      <Footer />
    </>
  )
}

export default App
