//import Navbar from '../components/landing/Navbar.jsx';
import Navbar from './Navbar.jsx';
//import Navbar from '../components/landing/Navbar.jsx';
import ScrollStoryHero from './ScrollStoryHero.jsx';
import ProblemSolution from './ProblemSolution.jsx';
import Features from './Features.jsx';
import HowItWorks from './HowItWorks.jsx';
import UseCases from './UseCases.jsx';
import Pricing from './Pricing.jsx';
import ClosingCta from './ClosingCta.jsx';
import Footer from './Footer.jsx';

export default function LandingPage() {
  return (
    <div className="bg-navy">
      <Navbar />
      <ScrollStoryHero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <UseCases />
      <ClosingCta />
      <Footer />
    </div>
  );
}
