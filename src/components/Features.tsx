import { Eyebrow } from "./shared";
import {
  CircleCheck,
  FileCheck2,
  FileText,
  LayoutDashboard,
  ListFilter,
  MessageCircle,
  Search,
  Target,
  Users,
  History,
  Plug,
  Bot,
} from "lucide-react";

export default function Features() {
  const data = [
    [Search, "Busca inteligente"],
    [Bot, "Triagem com IA"],
    [CircleCheck, "Qualificação automática"],
    [MessageCircle, "Conversas no WhatsApp"],
    [FileText, "Perguntas personalizadas"],
    [ListFilter, "Filtros por competências"],
    [Users, "Candidatos organizados"],
    [History, "Histórico de conversas"],
    [LayoutDashboard, "Dashboard de vagas"],
    [FileCheck2, "Shortlist de candidatos"],
    [Target, "Busca na internet"],
    [Plug, "Integrações"],
  ] as const;
  return (
    <section id="recursos" className="section features">
      <div className="container">
        <div className="section-heading center">
          <Eyebrow>TUDO CONECTADO AO SEU PROCESSO</Eyebrow>
          <h2>
            Menos abas abertas.
            <br />
            Mais recrutamento acontecendo.
          </h2>
        </div>
        <div className="features-grid">
          {data.map(([Icon, title]) => (
            <div key={title}>
              <Icon size={20} />
              {title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
