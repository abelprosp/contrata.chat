import { AnimatedCount, people } from "./shared";
import {
  ArrowRight,
  ChevronRight,
  LayoutDashboard,
  MessageCircle,
  Plus,
  Users,
  BriefcaseBusiness,
  Settings,
  Bell,
  SlidersHorizontal,
} from "lucide-react";

export default function Dashboard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`dashboard ${compact ? "compact" : ""}`}>
      <aside className="dash-sidebar">
        <span className="mini-brand">
          <MessageCircle size={20} /> <b>contrata.chat</b>
        </span>
        <span className="side-item">
          <LayoutDashboard />
          Visão geral
        </span>
        <span className="side-item active">
          <BriefcaseBusiness />
          Vagas <small>4</small>
        </span>
        <span className="side-item">
          <Users />
          Candidatos
        </span>
        <span className="side-item">
          <MessageCircle />
          Conversas
        </span>
        <span className="side-item side-settings">
          <Settings />
          Configurações
        </span>
        <div className="workspace-avatar">
          A{" "}
          <span>
            Acme Tecnologia<small>Seu workspace</small>
          </span>
        </div>
      </aside>
      <div className="dash-main">
        <div className="dash-top">
          <span>
            Workspace <ChevronRight size={12} /> Vagas
          </span>
          <div>
            <Bell size={14} />
            <span className="tiny-avatar">A</span>
          </div>
        </div>
        <div className="dash-title">
          <div>
            <small>SUAS CONTRATAÇÕES, EM MOVIMENTO</small>
            <h3>
              Desenvolvedor Backend <span className="status">Ativa</span>
            </h3>
            <p>Remoto · Pleno / Sênior · Tecnologia</p>
          </div>
          <span className="new-vaga">
            <Plus size={13} /> Nova vaga
          </span>
        </div>
        <div className="stats">
          {[
            ["247", "Encontrados"],
            ["86", "Contatados"],
            ["54", "Responderam"],
            ["31", "Qualificados"],
          ].map(([n, l]) => (
            <div key={l}>
              <span>{l}</span>
              <strong>
                <AnimatedCount value={Number(n)} />
              </strong>
              <small>
                <span>↗</span> Em andamento
              </small>
            </div>
          ))}
        </div>
        <div className="candidate-heading">
          <b>
            Candidatos recomendados <span>12</span>
          </b>
          <SlidersHorizontal size={15} />
        </div>
        <div className="candidate-labels">
          <span>CANDIDATO</span>
          <span>COMPATIBILIDADE</span>
        </div>
        {people.map((p) => (
          <div className="candidate-row" key={p.name}>
            <span className={`avatar ${p.color}`}>{p.initials}</span>
            <div>
              <b>{p.name}</b>
              <small>{p.role}</small>
            </div>
            <span className="score">
              <span />
              {p.score}%
            </span>
            <ChevronRight size={14} />
          </div>
        ))}
        <div className="dash-bottom">
          <span>
            <span className="live-dot" /> IA trabalhando na sua vaga
          </span>
          <span>
            Ver candidatos <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}
