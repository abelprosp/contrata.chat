import { Eyebrow } from "./shared";
import { FileText, MessageCircle, Search, Target } from "lucide-react";

export default function ProblemSection() {
  const cards = [
    [
      Search,
      "Procurar currículos",
      "Horas procurando candidatos em diferentes plataformas.",
    ],
    [
      FileText,
      "Triar candidatos",
      "Dezenas de currículos para analisar. Um por um.",
    ],
    [
      MessageCircle,
      "Fazer o primeiro contato",
      "Enviar mensagens, esperar respostas e repetir perguntas.",
    ],
    [
      Target,
      "Encontrar o perfil certo",
      "Descobrir quem realmente atende aos requisitos da vaga.",
    ],
  ] as const;
  return (
    <section className="section problems">
      <div className="container">
        <div className="section-heading center">
          <Eyebrow>PARECE FAMILIAR?</Eyebrow>
          <h2>
            Uma contratação.
            <br />
            Muitas horas de trabalho manual.
          </h2>
          <p>Quanto tempo sua empresa perde para contratar uma pessoa de TI?</p>
        </div>
        <div className="four-grid">
          {cards.map(([Icon, title, description], i) => (
            <article className="problem-card reveal" key={title}>
              <div className="card-top">
                <span className="icon-box">
                  <Icon size={21} />
                </span>
                <span className="card-number">0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <p className="problem-statement">
          O desafio não é encontrar currículos.{" "}
          <strong>É encontrar as pessoas certas.</strong>
        </p>
      </div>
    </section>
  );
}
