import { Eyebrow } from "./shared";
import { Users, Code2, Building2, ChartNoAxesCombined } from "lucide-react";

export default function Audience() {
  const data = [
    [
      Code2,
      "Empresas de tecnologia",
      "Do desenvolvimento à infraestrutura, encontre quem faz seu produto avançar.",
    ],
    [
      ChartNoAxesCombined,
      "Empresas em crescimento",
      "Contrate sem aumentar proporcionalmente o trabalho operacional do RH.",
    ],
    [
      Users,
      "RH e recrutadores",
      "Menos triagem repetitiva. Mais tempo para se conectar com bons profissionais.",
    ],
    [
      Building2,
      "Equipes sem RH dedicado",
      "Organize suas contratações sem precisar de uma grande estrutura interna.",
    ],
  ] as const;
  return (
    <section className="section audience">
      <div className="container">
        <div className="section-heading center">
          <Eyebrow>FEITO PARA QUEM CONTRATA</Eyebrow>
          <h2>
            Uma equipe pequena.
            <br />
            Ou muitas vagas. A gente ajuda.
          </h2>
        </div>
        <div className="four-grid">
          {data.map(([Icon, title, desc]) => (
            <article key={title}>
              <Icon size={26} />
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
