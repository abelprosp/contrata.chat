import { Button, Eyebrow, Modal } from "./shared";
import {
  submitLead,
  track,
  Lead,
  HIRING_OPTIONS,
  CONSENT_TEXT,
  isLeadPreview,
} from "../integrations";
import {
  ArrowRight,
  Check,
  Download,
  FileSpreadsheet,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";

export default function LeadCaptureModal({
  purpose,
  close,
  openDemo,
}: {
  purpose: "checklist" | "demo";
  close: () => void;
  openDemo: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [delivered, setDelivered] = useState(false);
  const [error, setError] = useState("");
  const submissionId = useRef(crypto.randomUUID());
  const submitting = useRef(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const f = new FormData(e.currentTarget);
    setError("");
    setStatus("loading");
    try {
      const lead: Lead = {
        name: String(f.get("name")).trim(),
        company: String(f.get("company")).trim(),
        email: String(f.get("email")).trim(),
        whatsapp: String(f.get("whatsapp")).trim(),
        hiring: String(f.get("hiring")),
        consent: f.get("consent") === "on",
        purpose,
      };
      const result = await submitLead(lead, {
        submissionId: submissionId.current,
      });
      setDelivered(result.delivered);
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Tente novamente.");
      setStatus("idle");
    } finally {
      submitting.current = false;
    }
  }
  return (
    <Modal
      close={close}
      label={
        purpose === "checklist"
          ? "Receba seu checklist"
          : "Conheça a Contrata.chat"
      }
    >
      {status === "success" ? (
        <div className="success-state">
          <span className="success-icon">
            <Check size={32} />
          </span>
          <h2>
            {purpose === "checklist"
              ? "Seu checklist está pronto!"
              : delivered
                ? "Solicitação recebida!"
                : "Conheça o processo na prática"}
          </h2>
          <p>
            {purpose === "checklist"
              ? "Baixe sua planilha e comece a organizar a próxima contratação."
              : delivered
                ? "Nossa equipe poderá entrar em contato pelos dados informados."
                : "O agendamento ainda não está conectado. Explore a demonstração interativa da plataforma."}
          </p>
          {!delivered && (
            <p className="form-notice">
              Modo demonstração: seus dados não foram enviados nem armazenados.
            </p>
          )}
          {purpose === "checklist" ? (
            <>
              <a
                className="button download-link"
                href="/checklist-contratacao-ti.xlsx"
                download
                onClick={() => track("checklist_download")}
              >
                <Download size={18} /> Baixar checklist
              </a>
              <small>
                Planilha Excel editável, compatível com Google Sheets.
              </small>
              <hr />
              <p>Enquanto isso, veja como automatizar esse processo.</p>
              <button className="text-link" onClick={openDemo}>
                Conhecer a Contrata.chat <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <Button onClick={openDemo}>
              Ver demonstração <Play size={16} />
            </Button>
          )}
        </div>
      ) : (
        <>
          <span className="modal-icon">
            {purpose === "checklist" ? <FileSpreadsheet /> : <Sparkles />}
          </span>
          <Eyebrow>
            {purpose === "checklist"
              ? "PRÁTICO. GRATUITO. SEU."
              : "VAMOS CONVERSAR"}
          </Eyebrow>
          <h2>
            {purpose === "checklist"
              ? "Preencha para baixar seu checklist."
              : "Menos trabalho manual na sua próxima vaga."}
          </h2>
          <p>
            {purpose === "checklist"
              ? "Informe seus dados abaixo. Após o envio, você terá acesso à planilha gratuita de contratação de TI."
              : "Informe seus dados para conhecer a Contrata.chat."}
          </p>
          <form onSubmit={submit} aria-busy={status === "loading"}>
            <div className="form-row">
              <label>
                Nome
                <input
                  autoComplete="name"
                  name="name"
                  placeholder="Seu nome"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                Empresa
                <input
                  autoComplete="organization"
                  name="company"
                  placeholder="Nome da empresa"
                  required
                  maxLength={150}
                />
              </label>
            </div>
            <label>
              E-mail profissional
              <input
                type="email"
                autoComplete="email"
                name="email"
                placeholder="voce@empresa.com.br"
                required
                maxLength={254}
              />
            </label>
            <label>
              WhatsApp
              <input
                type="tel"
                autoComplete="tel"
                name="whatsapp"
                placeholder="(11) 99999-9999"
                required
                minLength={10}
                maxLength={22}
              />
            </label>
            <label>
              Quantas pessoas sua empresa pretende contratar?
              <select name="hiring" required defaultValue="">
                <option value="" disabled>
                  Selecione uma opção
                </option>
                {HIRING_OPTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="consent">
              <input type="checkbox" name="consent" required />
              <span>{CONSENT_TEXT}</span>
            </label>
            {isLeadPreview && (
              <p className="form-notice">
                Prévia do site: os dados não serão enviados.{" "}
                {purpose === "checklist"
                  ? "Preencha o formulário para testar a liberação do checklist."
                  : "O agendamento será habilitado na versão publicada."}
              </p>
            )}
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <button className="button" disabled={status === "loading"}>
              {status === "loading"
                ? "Enviando…"
                : purpose === "checklist"
                  ? "Enviar e liberar checklist"
                  : "Solicitar demonstração"}
              <ArrowRight size={17} />
            </button>
            <span className="form-security">
              <ShieldCheck size={13} /> Seus dados merecem cuidado.
            </span>
          </form>
        </>
      )}
    </Modal>
  );
}
