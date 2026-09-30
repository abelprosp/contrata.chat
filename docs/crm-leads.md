# Integração de novos leads ao CRM

Todos os CTAs de checklist abrem o formulário. Nome, empresa, e-mail, WhatsApp brasileiro com DDD, volume de contratações e consentimento são obrigatórios. Após validar, a página envia o lead e só exibe o download quando recebe HTTP 2xx.

## Configuração posterior

1. Crie um endpoint no seu backend ou um webhook que aceite o contrato abaixo.
2. Configure `VITE_LEAD_ENDPOINT=https://sua-api.com/leads` no ambiente de build e gere novamente o site.
3. No servidor, mapeie os campos para os campos do seu CRM e use as credenciais privadas do CRM. Não coloque tokens no frontend.
4. Retorne 201 após salvar o lead no CRM, ou 202 após registrá-lo em uma fila durável para envio posterior. Em falhas, retorne 4xx/5xx: o formulário mantém os dados e permite tentar novamente.
5. Valide os dados também no servidor. Configure CORS para o domínio da landing page, permitindo POST e os headers Content-Type e Idempotency-Key.

## Requisição

```http
POST /leads
Content-Type: application/json
Idempotency-Key: UUID-da-solicitacao
```

```json
{
  "schemaVersion": "1.0",
  "event": "lead.create",
  "submissionId": "UUID-da-solicitacao",
  "name": "Pessoa Teste",
  "company": "Empresa Exemplo",
  "email": "teste@example.com",
  "whatsapp": "+5511999999999",
  "hiring": "2–5",
  "purpose": "checklist",
  "source": "contrata.chat/landing",
  "material": "checklist-contratacao-ti",
  "consent": true,
  "consentText": "Concordo em receber o material e informações sobre soluções de recrutamento.",
  "consentVersion": "2026-09",
  "createdAt": "2026-09-30T12:00:00.000Z"
}
```

`purpose` também pode ser `demo`; nesse caso `material` será null. `hiring` aceita `1`, `2–5`, `6–10` ou `10+`.

## Mapeamento sugerido

| Campo enviado                                   | Campo no CRM                                |
| ----------------------------------------------- | ------------------------------------------- |
| name                                            | Nome do contato                             |
| company                                         | Empresa                                     |
| email                                           | E-mail                                      |
| whatsapp                                        | Telefone/WhatsApp                           |
| hiring                                          | Campo personalizado: contratações previstas |
| source                                          | Origem do lead                              |
| material                                        | Material de interesse                       |
| purpose                                         | Interesse: checklist ou demonstração        |
| consent, consentText, consentVersion, createdAt | Registro de consentimento                   |

Use `submissionId` para deduplicar tentativas da mesma solicitação e faça upsert por e-mail conforme a regra do CRM. O navegador impede envios simultâneos; a deduplicação definitiva é responsabilidade do backend. O timeout é de 15 segundos. Nenhum dado pessoal é enviado aos eventos de analytics ou salvo em localStorage.

## Prévia e produção

Em desenvolvimento (`npm run dev`), sem endpoint, o formulário valida os dados e permite testar o download, com aviso explícito de que nada foi enviado ou armazenado. Em produção sem endpoint, o envio falha e o botão de download não aparece. A integração com um CRM real depende da configuração acima.

A barreira atual é o fluxo da interface. O XLSX em `public/` é um arquivo estático acessível por URL. Se precisar impedir também o acesso direto, mova-o para armazenamento privado e faça seu backend emitir um link temporário após registrar o lead.
