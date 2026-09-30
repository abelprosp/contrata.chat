import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState, ReactNode } from "react";
export type OpenLead = (purpose?: "checklist" | "demo") => void;
export const steps = [
  "Cadastre a vaga",
  "A IA entende os requisitos",
  "Encontre candidatos",
  "Converse pelo WhatsApp",
  "Qualifique os profissionais",
  "Receba sua shortlist",
];
export const categories = [
  "Definição da vaga",
  "Perfil técnico",
  "Stack necessária",
  "Experiência",
  "Soft skills",
  "Faixa salarial",
  "Modelo de trabalho",
  "Benefícios",
  "Perguntas para entrevista",
  "Teste técnico",
  "Avaliação do candidato",
  "Fit com a empresa",
  "Referências",
  "Decisão final",
];
export const people = [
  {
    initials: "JM",
    name: "João Martins",
    role: "Desenvolvedor Backend",
    color: "violet",
    score: 98,
    experience: 4,
  },
  {
    initials: "AC",
    name: "Ana Costa",
    role: "Desenvolvedora Full Stack",
    color: "peach",
    score: 96,
    experience: 5,
  },
  {
    initials: "PL",
    name: "Pedro Lima",
    role: "Desenvolvedor Backend",
    color: "blue",
    score: 94,
    experience: 6,
  },
];
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#"
      className={`logo ${light ? "logo-light" : ""}`}
      aria-label="Contrata.chat — início"
    >
      <img src="/contrata-logo.png" alt="contrata.chat" />
    </a>
  );
}

export function Button({
  children,
  onClick,
  secondary = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
}) {
  return (
    <button
      className={`button ${secondary ? "secondary" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}

export function Modal({
  children,
  close,
  label,
}: {
  children: ReactNode;
  close: () => void;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const elements = ref.current?.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, [tabindex="0"]',
        );
        if (!elements?.length) return;
        const first = elements[0],
          last = elements[elements.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (
          !e.shiftKey &&
          (document.activeElement === last ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [close]);
  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        ref={ref}
      >
        <button className="modal-close" aria-label="Fechar" onClick={close}>
          <X size={21} />
        </button>
        {children}
      </div>
    </div>
  );
}

export function AnimatedCount({ value }: { value: number }) {
  const [count, setCount] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (time: number) => {
          const progress = Math.max(0, Math.min((time - start) / 900, 1));
          setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return <span ref={ref}>{count}</span>;
}
