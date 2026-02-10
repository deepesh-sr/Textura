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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import BlogList from './components/BlogList'
import BlogDetail from './components/BlogDetail'

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
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={
                isAdmin && showDashboard ? (
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
                )
              } />
              
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
