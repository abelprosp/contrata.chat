import { OpenLead } from "./shared";

export default function ChecklistSection({ open: _open }: { open: OpenLead }) {
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
        <div className="crm-form-embed">
          <iframe
            src="https://app.persoocrm.online:18443/f/8a5o8FtDOIsD"
            title="Formulário"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
