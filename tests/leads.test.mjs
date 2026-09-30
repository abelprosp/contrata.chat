import test from "node:test";
import assert from "node:assert/strict";
import { createLeadPayload, submitLead } from "../src/integrations.ts";
const lead = {
  name: "  Pessoa Teste  ",
  company: "Empresa Exemplo",
  email: " TESTE@example.com ",
  whatsapp: "(11) 99999-9999",
  hiring: "2–5",
  consent: true,
  purpose: "checklist",
};
test("contrato do CRM normaliza os dados e registra consentimento", () => {
  const payload = createLeadPayload(lead, "request-1");
  assert.equal(payload.name, "Pessoa Teste");
  assert.equal(payload.email, "teste@example.com");
  assert.equal(payload.whatsapp, "+5511999999999");
  assert.equal(payload.event, "lead.create");
  assert.equal(payload.submissionId, "request-1");
  assert.equal(payload.material, "checklist-contratacao-ti");
  assert.equal(payload.consent, true);
  assert.ok(payload.consentText);
  assert.equal(
    createLeadPayload({ ...lead, whatsapp: "+55 11 99999-9999" }, "request-2")
      .whatsapp,
    payload.whatsapp,
  );
});
test("campos inválidos e consentimento ausente bloqueiam o envio", () => {
  for (const invalid of [
    { name: " " },
    { company: "" },
    { email: "invalido" },
    { whatsapp: "0000000000" },
    { hiring: "" },
    { consent: false },
  ])
    assert.throws(() =>
      createLeadPayload({ ...lead, ...invalid }, "request-1"),
    );
});
test("produção sem endpoint bloqueia a liberação; prévia exige dados válidos", async () => {
  await assert.rejects(
    submitLead(lead, {
      endpoint: "",
      preview: false,
      submissionId: "request-1",
    }),
    /indisponível/,
  );
  assert.deepEqual(
    await submitLead(lead, {
      endpoint: "",
      preview: true,
      submissionId: "request-1",
    }),
    { delivered: false },
  );
  await assert.rejects(
    submitLead(
      { ...lead, consent: false },
      { endpoint: "", preview: true, submissionId: "request-1" },
    ),
    /consentimento/,
  );
});
test("API aceita lead antes de liberar sem cabeçalhos bloqueados pelo CORS", async (t) => {
  let request;
  t.mock.method(globalThis, "fetch", async (url, init) => {
    request = { url, init };
    return new Response(null, { status: 201 });
  });
  assert.deepEqual(
    await submitLead(lead, {
      endpoint: "https://crm.example.test/leads",
      submissionId: "request-1",
    }),
    { delivered: true },
  );
  assert.equal(request.init.method, "POST");
  assert.equal(request.init.headers["Idempotency-Key"], undefined);
  assert.equal(JSON.parse(request.init.body).email, "teste@example.com");
});
test("falha da API e falha de conexão não liberam o material", async (t) => {
  const mock = t.mock.method(
    globalThis,
    "fetch",
    async () => new Response(null, { status: 500 }),
  );
  await assert.rejects(
    submitLead(lead, {
      endpoint: "https://crm.example.test/leads",
      submissionId: "request-1",
    }),
    /registrar/,
  );
  mock.mock.mockImplementation(async () => {
    throw new Error("Network error");
  });
  await assert.rejects(
    submitLead(lead, {
      endpoint: "https://crm.example.test/leads",
      submissionId: "request-1",
    }),
    /conectar/,
  );
});
