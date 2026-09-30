import { Eyebrow } from "./shared";
import {
  ArrowRight,
  ChevronRight,
  CircleCheck,
  MessageCircle,
  Plus,
  ShieldCheck,
  Sparkles,
  Send,
  CheckCheck,
} from "lucide-react";

export default function WhatsAppDemo() {
  return (
    <section className="section whatsapp">
      <div className="container split-section">
        <div className="phone-stage">
          <div className="phone">
            <div className="phone-status">
              <b>9:41</b>
              <span>••• ▰</span>
            </div>
            <div className="phone-header">
              <ChevronRight className="back-chevron" size={20} />
              <span className="chat-avatar">
                <MessageCircle size={21} />
              </span>
              <span>
                <b>Contrata.chat</b>
                <small>Assistente de recrutamento</small>
              </span>
              <ShieldCheck size={18} />
            </div>
            <div className="chat-messages">
              <span className="chat-date">HOJE · CONVERSA ILUSTRATIVA</span>
              {[
                [
                  "Olá, João! Encontramos seu perfil para uma oportunidade de Desenvolvedor Backend.",
                  false,
                ],
                ["Podemos fazer algumas perguntas rápidas?", false],
                ["Claro! 👋", true],
                ["Você possui experiência com Node.js?", false],
                ["Sim, há 4 anos.", true],
                ["Já trabalhou com PostgreSQL e Docker?", false],
                ["Sim, uso os dois no meu dia a dia.", true],
              ].map(([text, own], i) => (
                <div
                  key={i}
                  style={
                    { "--message-delay": `${i * 0.13}s` } as React.CSSProperties
                  }
                  className={`chat-message ${own ? "own" : ""}`}
                >
                  {text}
                  <small>
                    09:{42 + i} {own && <CheckCheck size={11} />}
                  </small>
                </div>
              ))}
              <div className="qualified">
                <CircleCheck size={17} /> Perfil qualificado
              </div>
            </div>
            <div className="phone-input">
              <Plus size={17} />
              <span>Mensagem</span>
              <Send size={17} />
            </div>
          </div>
          <div className="phone-float">
            <Sparkles size={19} />
            <span>
              Uma boa conversa.
              <br />
              <b>Uma triagem mais eficiente.</b>
            </span>
          </div>
        </div>
        <div>
          <Eyebrow>MENOS ATRITO. MAIS CONVERSA.</Eyebrow>
          <h2>
            Seu processo seletivo
            <br />
            também acontece
            <br />
            <span className="green-text">no WhatsApp.</span>
          </h2>
          <p>
            O candidato responde onde já está. Sua equipe recebe as informações
            de que precisa, sem repetir as mesmas perguntas.
          </p>
          <div className="conversation-points">
            {[
              "A IA conversa.",
              "O candidato responde.",
              "Sua equipe recebe o resultado.",
            ].map((x, i) => (
              <div key={x}>
                <span>0{i + 1}</span>
                {x}
              </div>
            ))}
          </div>
          <a href="#recursos" className="text-link">
            Conheça os recursos <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
