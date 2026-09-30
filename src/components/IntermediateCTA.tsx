import { Button, OpenLead } from "./shared";
import { ArrowUpRight, Download, Zap } from "lucide-react";

export default function IntermediateCTA({ open }: { open: OpenLead }) {
  return (
    <section className="container intermediate">
      <span className="cta-icon">
        <Zap size={25} />
      </span>
      <div>
        <h3>A primeira etapa pode ser mais simples.</h3>
        <p>
          Comece pelo checklist ou descubra o que a IA pode fazer pela sua
          equipe.
        </p>
      </div>
      <Button onClick={() => open()}>
        Baixar checklist <Download size={16} />
      </Button>
      <button className="text-link" onClick={() => open("demo")}>
        Conhecer a plataforma <ArrowUpRight size={16} />
      </button>
    </section>
  );
}
