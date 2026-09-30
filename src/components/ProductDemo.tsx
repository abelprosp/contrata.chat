import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Button, OpenLead } from "./shared";
import Dashboard from "./Dashboard";

export default function ProductDemo({ open }: { open: OpenLead }) {
  return (
    <section id="produto" className="reference-product">
      <div className="reference-product-inner">
        <div className="reference-product-copy">
          <div className="reference-kicker green">QUER IR ALÉM?</div>
          <h2>
            Conheça a<br />
            <strong>
              contrata<span>.chat</span>
            </strong>
          </h2>
          <p>
            A plataforma que qualifica candidatos com IA, gera perfis ideais e
            conecta você aos melhores profissionais de TI de forma rápida e
            segura.
          </p>
          <Button onClick={() => open("demo")}>
            CONHECER A CONTRATA.CHAT <ArrowUpRight size={17} />
          </Button>
        </div>
        <div className="reference-product-visual">
          <Dashboard />
          <div className="reference-phone">
            <MessageCircle size={22} />
            <span>Olá! Vamos começar sua qualificação?</span>
            <Check size={16} />
          </div>
        </div>
        <div className="reference-product-points">
          <div>
            <span>
              <Zap />
            </span>
            <b>Qualificação com IA</b>
            <small>Candidatos pré-avaliados com mais precisão</small>
          </div>
          <div>
            <span>
              <Target />
            </span>
            <b>Mais assertividade</b>
            <small>Contrate certo, economize tempo e dinheiro</small>
          </div>
          <div>
            <span>
              <ShieldCheck />
            </span>
            <b>Processo seguro</b>
            <small>Dados protegidos e 100% em conformidade</small>
          </div>
        </div>
      </div>
    </section>
  );
}
