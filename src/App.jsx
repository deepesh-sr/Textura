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

function App() {
  return (
    <>
      <Navbar />
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
