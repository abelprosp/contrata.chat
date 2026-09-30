import { Logo, OpenLead } from "./shared";

export default function Footer({
  open,
  legal,
}: {
  open: OpenLead;
  legal: (s: string) => void;
}) {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo />
            <p>
              Tecnologia para encontrar pessoas.
              <br />
              Tempo para conhecer cada uma.
            </p>
          </div>
          <div className="footer-links">
            <a href="#produto">Produto</a>
            <a href="#recursos">Recursos</a>
            <a href="#checklist">Checklist</a>
            <a href="#como-funciona">Como funciona</a>
            <button onClick={() => open("demo")}>Contato</button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Contrata.chat. Todos os direitos reservados.</span>
          <div>
            <button onClick={() => legal("Política de Privacidade")}>
              Política de Privacidade
            </button>
            <button onClick={() => legal("Termos de Uso")}>
              Termos de Uso
            </button>
            <span className="made-in">
              Feito para conectar <span>pessoas.</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
