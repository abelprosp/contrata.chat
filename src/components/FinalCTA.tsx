import { Button, OpenLead } from "./shared";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function FinalCTA({ open }: { open: OpenLead }) {
  return (
    <section className="final-cta">
      <div className="container center">
        <span className="final-icon">
          <MessageCircle size={30} />
          <Sparkles size={15} />
        </span>
        <h2>
          Encontre pessoas.
          <br />
          <span>Não apenas currículos.</span>
        </h2>
        <p>
          Comece com nosso checklist gratuito de contratação de TI.
          <br />
          Dê o próximo passo com a Contrata.chat.
        </p>
        <div className="final-buttons">
          <Button onClick={() => open()}>
            <Download size={17} /> Baixar checklist gratuito{" "}
            <ArrowRight size={16} />
          </Button>
          <Button secondary onClick={() => open("demo")}>
            Agendar demonstração <ArrowUpRight size={16} />
          </Button>
        </div>
        <small>Contrata.chat — Recrutamento com inteligência artificial.</small>
      </div>
    </section>
  );
}
