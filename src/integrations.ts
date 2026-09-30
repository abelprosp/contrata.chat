export type Lead = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  hiring: string;
  consent: boolean;
  purpose: "checklist" | "demo";
};

export const HIRING_OPTIONS = ["1", "2–5", "6–10", "10+"] as const;
export const CONSENT_TEXT =
  "Concordo em receber o material e informações sobre soluções de recrutamento.";
export const isLeadPreview =
  !import.meta.env?.VITE_LEAD_ENDPOINT && !!import.meta.env?.DEV;

/** One contract for a future CRM adapter, webhook or first-party API. */
export function createLeadPayload(lead: Lead, submissionId: string) {
  const name = lead.name.trim();
  const company = lead.company.trim();
  const email = lead.email.trim().toLowerCase();
  const digits = lead.whatsapp.replace(/\D/g, "");
  const phone =
    digits.startsWith("55") && digits.length >= 12 ? digits.slice(2) : digits;
  if (!name || name.length > 100 || !company || company.length > 150)
    throw new Error("Preencha nome e empresa corretamente.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    throw new Error("Informe um e-mail válido.");
  if (!/^[1-9][0-9][2-9][0-9]{7,8}$/.test(phone))
    throw new Error("Informe um WhatsApp brasileiro válido com DDD.");
  if (!HIRING_OPTIONS.includes(lead.hiring as (typeof HIRING_OPTIONS)[number]))
    throw new Error(
      "Selecione quantas pessoas sua empresa pretende contratar.",
    );
  if (!lead.consent)
    throw new Error("Confirme o consentimento para continuar.");
  if (lead.purpose !== "checklist" && lead.purpose !== "demo")
    throw new Error("Solicitação inválida.");
  return {
    schemaVersion: "1.0",
    event: "lead.create",
    submissionId,
    name,
    company,
    email,
    whatsapp: `+55${phone}`,
    hiring: lead.hiring,
    purpose: lead.purpose,
    source: "contrata.chat/landing",
    material: lead.purpose === "checklist" ? "checklist-contratacao-ti" : null,
    consent: true,
    consentText: CONSENT_TEXT,
    consentVersion: "2026-09",
    createdAt: new Date().toISOString(),
  };
}

export function track(event: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("contrata:analytics", { detail: { event, ...properties } }),
  );
}

type SubmissionOptions = {
  endpoint?: string;
  preview?: boolean;
  submissionId: string;
};
export async function submitLead(lead: Lead, options: SubmissionOptions) {
  const payload = createLeadPayload(lead, options.submissionId);
  const endpoint = options.endpoint ?? import.meta.env?.VITE_LEAD_ENDPOINT;
  if (!endpoint) {
    if (options.preview ?? isLeadPreview) return { delivered: false };
    throw new Error(
      "O formulário está temporariamente indisponível. Tente novamente mais tarde.",
    );
  }
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      signal: AbortSignal.timeout(15000),
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": options.submissionId,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Não foi possível conectar. Verifique sua conexão e tente novamente.",
    );
  }
  if (!response.ok)
    throw new Error(
      "Não foi possível registrar seus dados. Tente novamente em instantes.",
    );
  track("lead_submitted", { purpose: lead.purpose });
  return { delivered: true };
}
