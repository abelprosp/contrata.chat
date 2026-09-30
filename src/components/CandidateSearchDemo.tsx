import { Eyebrow, people } from "./shared";
import { ArrowRight, Check, Search } from "lucide-react";
import { useState } from "react";

export default function CandidateSearchDemo() {
  const [filter, setFilter] = useState("Todos");
  return (
    <section className="section search-section">
      <div className="container split-section">
        <div>
          <Eyebrow>BUSCA INTELIGENTE DE CANDIDATOS</Eyebrow>
          <h2>
            Não espere o talento
            <br />
            chegar até você.
          </h2>
          <p>
            Amplie sua busca com inteligência artificial. Encontre profissionais
            em fontes disponíveis na internet, a partir do que realmente importa
            para a vaga.
          </p>
          <div className="search-benefits">
            <span>
              <Check /> Filtros por competências e experiência
            </span>
            <span>
              <Check /> Perfis organizados em um só lugar
            </span>
            <span>
              <Check /> Compatibilidade para apoiar sua avaliação
            </span>
          </div>
        </div>
        <div className="search-demo">
          <div className="search-input">
            <Search size={17} />
            <span>Desenvolvedor Full Stack</span>
            <span className="search-enter">
              <ArrowRight size={15} />
            </span>
          </div>
          <div className="tags">
            {[
              "React",
              "Node.js",
              "PostgreSQL",
              "3+ anos",
              "Brasil",
              "Remoto",
            ].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <div className="search-results-heading">
            <b>Candidatos encontrados</b>
            <select
              aria-label="Filtrar candidatos por tecnologia"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>Todos</option>
              <option>React</option>
              <option>Node.js</option>
            </select>
          </div>
          {people
            .filter(
              (_, i) =>
                filter === "Todos" || (filter === "React" ? i === 1 : i !== 1),
            )
            .map((p) => (
              <div className="search-person" key={p.name}>
                <span className={`avatar ${p.color}`}>{p.initials}</span>
                <div>
                  <b>{p.name}</b>
                  <small>
                    {p.role} · {p.experience} anos
                  </small>
                  <span className="person-tech">
                    {p.initials === "AC"
                      ? "React · TypeScript"
                      : "Node.js · PostgreSQL"}{" "}
                    · Brasil
                  </span>
                </div>
                <span className="search-score">
                  {p.score}%<small>compatível</small>
                </span>
              </div>
            ))}
          <p>
            Perfis fictícios. Score auxiliar de IA, sem garantia de contratação.
          </p>
        </div>
      </div>
    </section>
  );
}
