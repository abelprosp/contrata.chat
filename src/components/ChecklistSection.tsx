import { useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Download,
  Mail,
  Phone,
  UserRound,
  Building2,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";
import {
  HIRING_OPTIONS,
  CONSENT_TEXT,
  isLeadPreview,
  submitLead,
  type Lead,
} from "../integrations";
import { OpenLead } from "./shared";

export default function ChecklistSection({ open: _open }: { open: OpenLead }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");
  const submissionId = useRef(crypto.randomUUID());
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const lead: Lead = {
      name: String(form.get("name")),
      company: String(form.get("company")),
      email: String(form.get("email")),
      whatsapp: String(form.get("whatsapp")),
      hiring: String(form.get("hiring")),
      consent: form.get("consent") === "on",
      purpose: "checklist",
    };
    try {
      await submitLead(lead, { submissionId: submissionId.current });
      setStatus("success");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Não foi possível enviar. Tente novamente.",
      );
      setStatus("idle");
    }
  }
  return (
    <section className="reference-checklist" id="checklist">
      <div className="reference-container">
        <div className="reference-section-heading">
          <h2>
            BAIXE AGORA SEU CHECKLIST
            <br />
            <span>GRÁTIS</span>
          </h2>
          <p>
            Preencha os campos abaixo para <strong>liberar o download.</strong>
          </p>
        </div>
        {status === "success" ? (
          <div className="reference-success">
            <span>
              <Check size={28} />
            </span>
            <h3>Seu checklist está pronto!</h3>
            <p>
              Baixe a planilha e comece a organizar sua próxima contratação.
            </p>
            <a
              className="reference-download"
              href="/checklist-contratacao-ti.xlsx"
              download
            >
              <Download size={19} /> Baixar checklist gratuito{" "}
              <ArrowRight size={17} />
            </a>
            <small>
              Planilha Excel editável, compatível com Google Sheets.
            </small>
          </div>
        ) : (
          <form className="reference-form" onSubmit={submit}>
            <div className="reference-form-row">
              <label>
                <UserRound />
                <input
                  name="name"
                  placeholder="Seu nome"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                <Mail />
                <input
                  name="email"
                  type="email"
                  placeholder="Seu e-mail"
                  autoComplete="email"
                  required
                  maxLength={254}
                />
              </label>
            </div>
            <label>
              <Building2 />
              <input
                name="company"
                placeholder="Nome da empresa"
                autoComplete="organization"
                maxLength={150}
              />
            </label>
            <label>
              <BriefcaseBusiness />
              <select name="hiring" defaultValue="" required>
                <option value="" disabled>
                  Quantas pessoas sua empresa pretende contratar?
                </option>
                {HIRING_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              <Phone />
              <input
                name="whatsapp"
                type="tel"
                placeholder="Seu WhatsApp"
                autoComplete="tel"
                required
                minLength={10}
                maxLength={22}
              />
            </label>
            <label className="reference-consent">
              <input type="checkbox" name="consent" required />
              <span>{CONSENT_TEXT}</span>
            </label>
            {isLeadPreview && (
              <p className="reference-preview">
                Modo prévia: o lead não será enviado, mas todos os campos
                continuam obrigatórios.
              </p>
            )}
            {error && (
              <p className="reference-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="reference-submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                "Enviando…"
              ) : (
                <>
                  <Download size={20} /> QUERO BAIXAR O CHECKLIST GRÁTIS{" "}
                  <ArrowRight size={17} />
                </>
              )}
            </button>
            <small className="reference-security">
              <ShieldCheck size={14} /> Seus dados estão 100% seguros. Não
              compartilhamos suas informações.
            </small>
          </form>
        )}
      </div>
    </section>
  );
}
