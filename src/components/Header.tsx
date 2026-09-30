import { Logo, OpenLead } from "./shared";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header({ open }: { open: OpenLead }) {
  const [menu, setMenu] = useState(false);
  return (
    <header>
      <div className="container nav">
        <Logo />
        <nav
          className={menu ? "nav-links open" : "nav-links"}
          aria-label="Menu principal"
        >
          {[
            ["Como funciona", "#como-funciona"],
            ["Checklist gratuito", "#checklist"],
            ["Contrata.chat", "#produto"],
            ["Recursos", "#recursos"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
        </nav>
        <button className="header-cta" onClick={() => open("demo")}>
          Quero automatizar meu recrutamento <ArrowUpRight size={15} />
        </button>
        <button
          className="menu-button"
          aria-label={menu ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
