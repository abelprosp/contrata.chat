# Contrata.chat — landing page

React 19, TypeScript, Vite e Tailwind CSS 4. Componentes separados em `src/components`.

## Executar

```sh
npm install
npm run dev -- --port 5186
npm run build
npm run preview
```

O build está em `dist/`. Publique essa pasta em um serviço de hospedagem estática.

## Formulário e integrações

Copie `.env.example` para `.env.local` e configure:

- `VITE_LEAD_ENDPOINT`: endpoint HTTP POST do seu backend. Retorne um status 2xx apenas após aceitar o lead. O corpo inclui nome, empresa, email, WhatsApp, quantidade de contratações, finalidade, consentimento, versão do consentimento, origem e data.
- `VITE_DEMO_URL`: URL pública da agenda comercial. Sem ela, o CTA abre o formulário de interesse.

Em desenvolvimento sem endpoint, o formulário valida todos os dados antes de liberar a prévia do download. Em produção sem endpoint, a liberação fica bloqueada. Nenhum lead é enviado ao CRM até configurar a integração. Veja o contrato e o mapeamento em [docs/crm-leads.md](docs/crm-leads.md).

O backend deve validar os dados, aplicar proteção contra abuso e processar CRM, e-mail marketing e WhatsApp. Mantenha credenciais desses serviços no servidor, nunca em variáveis VITE. Configure CORS para a origem da landing page.

`src/integrations.ts` emite o evento `contrata:analytics`, com nome do evento e finalidade, sem incluir dados pessoais. Eventos: `form_opened`, `lead_submitted`, `checklist_download`. Conecte GA e Meta Pixel a um adaptador com gestão de consentimento antes de ativar rastreamento.

## Material gratuito

`public/checklist-contratacao-ti.xlsx`: planilha editável com 14 etapas, orientações, lista de status e campos de responsável, prazo e observações.

## Conteúdo demonstrativo

- Logo oficial fornecido em `public/contrata-logo.png`, usado na marca da página e no favicon.
- Tour animado com seis etapas, controles e duração automática de 60 segundos. Substitua por vídeo oficial se disponível.
- Interfaces, candidatos, mensagens, números e scores são fictícios e identificados como demonstração.
- Os links jurídicos abrem avisos de prévia. Substitua por documentos oficiais e canal de contato antes de conectar o formulário e publicar.

## Verificação

- Compilação TypeScript e build Vite.
- Formulário e tela de sucesso em modo demonstração, incluindo navegação por teclado.
- Menu mobile, tour e FAQ.
- Layout mobile em 390 px sem transbordamento horizontal da página. O dashboard grande tem rolagem interna no celular.
- Download Excel incluído no build. Planilha inspecionada e renderizada para conferência.
