import { Eyebrow, steps } from "./shared";
import {
  Clock3,
  MessageCircle,
  Search,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

export default function HowItWorks() {
  const data = [
    [
      BriefcaseBusiness,
      "Cadastre a vaga",
      "Informe cargo, tecnologias, experiência e o que você procura.",
    ],
    [
      Search,
      "A IA procura candidatos",
      "Encontre perfis compatíveis em fontes disponíveis na internet.",
    ],
    [
      MessageCircle,
      "A conversa acontece",
      "A IA faz as perguntas iniciais diretamente pelo WhatsApp.",
    ],
    [
      Users,
      "Receba sua shortlist",
      "Avalie profissionais qualificados com as informações organizadas.",
    ],
  ] as const;
  return (
    <section id="como-funciona" className="section how">
      <div className="container">
        <div className="section-heading center">
          <Eyebrow>SIMPLES DO INÍCIO AO FIM</Eyebrow>
          <h2>Da vaga à shortlist, em quatro passos.</h2>
        </div>
        <div className="four-grid steps">
          {data.map(([Icon, title, desc], i) => (
            <article key={title} className="reveal">
              <div className="step-icon">
                <Icon size={23} />
                <span>0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
        <div className="how-note">
          <Clock3 size={17} /> Menos triagem manual. Mais tempo para entrevistar
          quem realmente importa.
        </div>
      </div>
    </section>
  );
}
