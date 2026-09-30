import { Eyebrow } from "./shared";
import { Check, Clock3, Sparkles } from "lucide-react";

export default function Comparison() {
  return (
    <section className="section comparison">
      <div className="container">
        <div className="section-heading center">
          <Eyebrow>MAIS ESPAÇO PARA O QUE IMPORTA</Eyebrow>
          <h2>
            Automatize o trabalho repetitivo.
            <br />
            Mantenha a decisão com sua equipe.
          </h2>
        </div>
        <div className="comparison-grid">
          <article>
            <span className="comparison-label">
              <Clock3 size={19} /> Recrutamento tradicional
            </span>
            <ul>
              {[
                "Procurar candidatos manualmente",
                "Abrir dezenas de currículos e copiar informações",
                "Enviar mensagens e repetir as mesmas perguntas",
                "Esperar respostas e organizar planilhas",
                "Comparar cada candidato manualmente",
              ].map((x) => (
                <li key={x}>
                  <span className="minus">−</span>
                  {x}
                </li>
              ))}
            </ul>
            <span className="comparison-bottom">
              Mais esforço operacional, em cada contratação.
            </span>
          </article>
          <article className="with-contrata">
            <span className="comparison-label">
              <Sparkles size={19} /> Com Contrata.chat <span>COM IA</span>
            </span>
            <ul>
              {[
                "Defina a vaga e os critérios de seleção",
                "A IA encontra perfis e faz o primeiro contato",
                "A triagem inicial acontece pelo WhatsApp",
                "Receba informações e candidatos organizados",
                "Sua equipe decide quem entrevistar",
              ].map((x) => (
                <li key={x}>
                  <Check size={17} />
                  {x}
                </li>
              ))}
            </ul>
            <span className="comparison-bottom">
              Mais informação para decidir. Mais tempo para pessoas.
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}
