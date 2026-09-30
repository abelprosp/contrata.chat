import { Eyebrow } from "./shared";
import { Plus } from "lucide-react";

export default function FAQ() {
  const data = [
    [
      "A Contrata.chat substitui o recrutador?",
      "Não. A plataforma automatiza tarefas operacionais e ajuda a equipe a encontrar e qualificar candidatos. A decisão final continua com a empresa.",
    ],
    [
      "A IA conversa com os candidatos?",
      "Sim. A plataforma pode realizar a etapa inicial de comunicação e qualificação pelo WhatsApp.",
    ],
    [
      "A Contrata.chat procura candidatos na internet?",
      "Sim, a plataforma pode utilizar fontes disponíveis na internet para ampliar a busca por profissionais compatíveis.",
    ],
    [
      "Posso definir as perguntas feitas aos candidatos?",
      "Sim. A empresa pode configurar critérios e perguntas de acordo com cada vaga.",
    ],
    [
      "Posso usar para vagas de tecnologia?",
      "Sim. A plataforma pode ser configurada para diferentes perfis profissionais, incluindo desenvolvimento, infraestrutura, dados, suporte e outras áreas.",
    ],
    [
      "Preciso substituir meu sistema de RH?",
      "Não necessariamente. A proposta é automatizar etapas do processo de recrutamento e pode ser integrada ao fluxo existente da empresa.",
    ],
  ];
  return (
    <section className="section faq">
      <div className="container faq-grid">
        <div>
          <Eyebrow>SEM PONTAS SOLTAS</Eyebrow>
          <h2>
            Boas perguntas.
            <br />
            Respostas diretas.
          </h2>
          <p>
            Entenda como a Contrata.chat
            <br />
            se encaixa no seu processo.
          </p>
        </div>
        <div>
          {data.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={18} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
