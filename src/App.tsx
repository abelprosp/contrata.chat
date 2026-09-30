import { useEffect, useState } from "react";
import { Download, ArrowRight } from "lucide-react";
import { track } from "./integrations";
import { Button, Eyebrow, Modal, type OpenLead } from "./components/shared";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import ChecklistSection from "./components/ChecklistSection";
import Transition from "./components/Transition";
import ProductDemo from "./components/ProductDemo";
import HowItWorks from "./components/HowItWorks";
import WhatsAppDemo from "./components/WhatsAppDemo";
import CandidateSearchDemo from "./components/CandidateSearchDemo";
import Comparison from "./components/Comparison";
import Audience from "./components/Audience";
import Features from "./components/Features";
import IntermediateCTA from "./components/IntermediateCTA";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import LeadCaptureModal from "./components/LeadCaptureModal";
import DemoModal from "./components/DemoModal";
export default function App() {
  const [lead, setLead] = useState<"checklist" | "demo" | null>(null);
  const [demo, setDemo] = useState(false);
  const [legal, setLegal] = useState<string | null>(null);
  const open: OpenLead = (purpose = "checklist") => {
    if (purpose === "demo" && import.meta.env.VITE_DEMO_URL) {
      window.open(
        import.meta.env.VITE_DEMO_URL,
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }
    setLead(purpose);
    track("form_opened", { purpose });
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".reveal,.phone")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="reference-page">
        <Header open={open} />
        <main id="conteudo">
          <Hero open={open} play={() => setDemo(true)} />
          <ChecklistSection open={open} />
          <ProductDemo open={open} />
          <ProblemSection />
          <Transition />
          <HowItWorks />
          <WhatsAppDemo />
          <CandidateSearchDemo />
          <Comparison />
          <Audience />
          <Features />
          <IntermediateCTA open={open} />
          <FAQ />
          <FinalCTA open={open} />
        </main>
        <Footer open={open} legal={setLegal} />
        <div className="mobile-sticky">
          <Button onClick={() => open()}>
            <Download size={17} /> Baixar checklist grátis{" "}
            <ArrowRight size={17} />
          </Button>
        </div>
        {lead && (
          <LeadCaptureModal
            purpose={lead}
            close={() => setLead(null)}
            openDemo={() => {
              setLead(null);
              setDemo(true);
            }}
          />
        )}
        {demo && <DemoModal close={() => setDemo(false)} />}{" "}
        {legal && (
          <Modal label={legal} close={() => setLegal(null)}>
            <Eyebrow>INFORMAÇÕES DESTA PRÉVIA</Eyebrow>
            <h2>{legal}</h2>
            {legal === "Política de Privacidade" ? (
              <>
                <p>
                  Nesta versão de demonstração, os formulários não enviam nem
                  armazenam seus dados pessoais. Não há ferramentas de
                  rastreamento de terceiros ativadas.
                </p>
                <p>
                  Antes da publicação, a empresa deverá disponibilizar sua
                  política completa, com identificação do controlador,
                  finalidade do tratamento, retenção, direitos dos titulares e
                  canal de contato.
                </p>
              </>
            ) : (
              <>
                <p>
                  Esta página apresenta uma demonstração ilustrativa. Os perfis,
                  as conversas e os números exibidos são fictícios. A avaliação
                  automatizada auxilia a análise e não garante contratação.
                </p>
                <p>
                  A planilha gratuita é um material de organização. Os termos
                  comerciais e de uso da plataforma deverão ser fornecidos pela
                  Contrata.chat antes da contratação.
                </p>
              </>
            )}
          </Modal>
        )}
      </div>
    </>
  );
}
