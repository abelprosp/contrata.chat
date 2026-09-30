import { Eyebrow } from "./shared";
import { Check, ChevronRight, Sparkles } from "lucide-react";

export default function Transition() {
  return (
    <section className="transition section">
      <div className="container">
        <div className="transition-heading">
          <Eyebrow>
            ORGANIZAR É O PRIMEIRO PASSO. AUTOMATIZAR É O PRÓXIMO.
          </Eyebrow>
          <h2>
            O checklist organiza.
            <br />A Contrata.chat <span>coloca em movimento.</span>
          </h2>
          <p>
            Você definiu o perfil ideal. Agora vem a parte que mais toma tempo:
            encontrar, abordar e qualificar cada candidato. Deixe essa etapa com
            a IA.
          </p>
        </div>
        <div className="flow manual">
          <span>O caminho manual</span>
          {[
            "Buscar",
            "Mensagem",
            "Esperar",
            "Perguntar",
            "Avaliar",
            "Selecionar",
          ].map((s, i) => (
            <div key={s}>
              {i > 0 && <ChevronRight size={14} />}
              <span>{s}</span>
            </div>
          ))}
        </div>
        <div className="flow automated">
          <span>
            <Sparkles size={17} /> Com Contrata.chat
          </span>
          {[
            "IA",
            "Busca",
            "WhatsApp",
            "Qualificação",
            "Ranking",
            "Shortlist",
          ].map((s, i) => (
            <div key={s}>
              {i > 0 && <ChevronRight size={14} />}
              <span>
                {s}
                {i === 5 && <Check size={13} />}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
