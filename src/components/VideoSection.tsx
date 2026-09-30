import { Play, ShieldCheck, CheckCheck } from "lucide-react";
import Dashboard from "./Dashboard";
export default function VideoSection({ play }: { play: () => void }) {
  return (
    <div className="hero-visual">
      <div className="visual-orbit" />
      <div className="hero-browser">
        <div className="browser-top">
          <span className="traffic">
            <i />
            <i />
            <i />
          </span>
          <span>
            <ShieldCheck size={11} /> app.contrata.chat
          </span>
          <span />
        </div>
        <Dashboard compact />
        <button className="video-play" onClick={play}>
          <span>
            <Play fill="currentColor" size={17} />
          </span>
          <div>
            Veja como funciona<small>O produto em 60 segundos</small>
          </div>
          <span className="video-duration">1:00</span>
        </button>
      </div>
      <div className="floating-note">
        <span className="note-icon">
          <CheckCheck size={22} />
        </span>
        <div>
          <strong>Seu próximo talento está mais perto.</strong>
          <small>A IA qualifica. Sua equipe decide.</small>
        </div>
        <span className="note-dot" />
      </div>
      <p className="video-caption">
        <Play size={12} /> Demonstração ilustrativa · Dados fictícios
      </p>
    </div>
  );
}
