import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import IntegrationMarquee from './components/IntegrationMarquee';
import Services from './components/Services';
import ArchitectureFlow from './components/ArchitectureFlow';
import RoiCalculator from './components/RoiCalculator';
import Process from './components/Process';
import Footer from './components/Footer';
import AuditModal from './components/AuditModal';
import ScrollProgress from './components/ScrollProgress';
import StickyCTA from './components/StickyCTA';

function App() {
  const [auditOpen, setAuditOpen] = useState(false);
  const openAudit = () => setAuditOpen(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <ScrollProgress />
      <Header onOpenAudit={openAudit} />
      <main>
        <Hero onOpenAudit={openAudit} />
        <IntegrationMarquee />
        <Services />
        <ArchitectureFlow />
        <RoiCalculator onOpenAudit={openAudit} />
        <Process />
      </main>
      <Footer onOpenAudit={openAudit} />
      <StickyCTA onOpenAudit={openAudit} />
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
    </div>
  );
}

export default App;
