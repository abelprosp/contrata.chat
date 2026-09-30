import { Eyebrow, Modal, steps } from "./shared";
import {
  ArrowRight,
  CircleCheck,
  MessageCircle,
  Play,
  Search,
  Sparkles,
  Users,
  BriefcaseBusiness,
  Pause,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DemoModal({ close }: { close: () => void }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () =>
        setStep((s) => {
          if (s === 5) {
            setPlaying(false);
            return s;
          }
          return s + 1;
        }),
      10000,
    );
    return () => clearInterval(id);
  }, [playing]);
  return (
    <Modal close={close} label="Demonstração interativa da Contrata.chat">
      <Eyebrow>TOUR DO PRODUTO · 60 SEGUNDOS</Eyebrow>
      <h2>{steps[step]}</h2>
      <div className="demo-scene" key={step}>
        <span className="demo-step-number">0{step + 1}</span>
        {step === 0 ? (
          <>
            <BriefcaseBusiness size={35} />
            <h3>Desenvolvedor Backend</h3>
            <div className="tags">
              <span>Node.js</span>
              <span>PostgreSQL</span>
              <span>Remoto</span>
            </div>
          </>
        ) : step === 1 ? (
          <>
            <Sparkles size={35} />
            <h3>Requisitos organizados</h3>
            <p>
              Stack, experiência e critérios definidos para encontrar os perfis
              compatíveis.
            </p>
          </>
        ) : step === 2 ? (
          <>
            <Search size={35} />
            <h3>247 perfis encontrados</h3>
            <p>Busca inteligente com os critérios da sua vaga.</p>
          </>
        ) : step === 3 ? (
          <>
            <MessageCircle size={35} />
            <h3>Uma conversa pelo WhatsApp</h3>
            <div className="demo-bubble">
              Olá, João! Você tem experiência com Node.js?
            </div>
            <div className="demo-bubble answer">Sim, há 4 anos. ✓✓</div>
          </>
        ) : step === 4 ? (
          <>
            <CircleCheck size={35} />
            <h3>31 candidatos qualificados</h3>
            <p>Respostas e experiências organizadas para a equipe avaliar.</p>
          </>
        ) : (
          <>
            <Users size={35} />
            <h3>12 profissionais recomendados</h3>
            <p>
              Agora é com sua equipe. Conheça as pessoas por trás dos perfis.
            </p>
          </>
        )}
      </div>
      <div className="demo-progress">
        {steps.map((s, i) => (
          <button
            aria-label={s}
            aria-current={step === i ? "step" : undefined}
            key={s}
            className={i <= step ? "complete" : ""}
            onClick={() => {
              setStep(i);
              setPlaying(false);
            }}
          />
        ))}
      </div>
      <div className="demo-controls">
        <button
          className="text-link"
          onClick={() => {
            if (step === 5) setStep(0);
            setPlaying(!playing);
          }}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}{" "}
          {playing ? "Pausar" : "Reproduzir"}
        </button>
        <span>{step + 1} de 6</span>
        <button
          className="text-link"
          onClick={() => {
            setStep((step + 1) % 6);
            setPlaying(false);
          }}
        >
          {step === 5 ? "Recomeçar" : "Próximo"} <ArrowRight size={15} />
        </button>
      </div>
      <p className="demo-disclaimer">
        Tour animado com dados fictícios, sem operações reais.
      </p>
    </Modal>
  );
}
