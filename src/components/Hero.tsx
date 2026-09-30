import { Logo, OpenLead } from "./shared";
import VideoSection from "./VideoSection";

export default function Hero({ play }: { open: OpenLead; play: () => void }) {
  return (
    <section className="reference-hero">
      <div className="reference-hero-glow" />
      <div className="reference-container">
        <div className="reference-brand">
          <Logo light />
        </div>
        <div className="reference-kicker">RECRUTAMENTO DE TI COM IA</div>
        <h1>
          PARE DE CONTRATAR
          <br />
          <span>PROFISSIONAIS DE TI</span>
          <br />
          ERRADO<em>.</em>
        </h1>
        <p className="reference-subtitle">
          Use o checklist que ajuda a tomar decisões melhores,
          <br className="desktop-break" /> evitar prejuízos e{" "}
          <strong>contratar com segurança.</strong>
        </p>
        <div className="reference-video">
          <VideoSection play={play} />
        </div>
      </div>
    </section>
  );
}
