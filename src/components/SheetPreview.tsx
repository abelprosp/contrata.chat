import { categories } from "./shared";
import {
  Check,
  ChevronDown,
  FileCheck2,
  FileSpreadsheet,
  Plus,
} from "lucide-react";

export default function SheetPreview() {
  return (
    <div className="sheet-preview">
      <div className="sheet-title">
        <span className="sheet-icon">
          <FileSpreadsheet size={24} />
        </span>
        <div>
          <b>Minha próxima contratação de TI</b>
          <small>Checklist prático · Contrata.chat</small>
        </div>
        <span className="sheet-free">GRÁTIS</span>
      </div>
      <div className="sheet-toolbar">
        <span>Arquivo</span>
        <span>Editar</span>
        <span>Visualizar</span>
        <span className="sheet-saved">
          <Check size={12} /> Tudo organizado
        </span>
      </div>
      <div className="sheet-columns">
        <span /> <span>ETAPA DA CONTRATAÇÃO</span>
        <span>STATUS</span>
      </div>
      {categories.slice(0, 7).map((c, i) => (
        <div className="sheet-row" key={c}>
          <span>{i + 1}</span>
          <div>
            <span className={`sheet-check ${i < 3 ? "checked" : ""}`}>
              {i < 3 && <Check size={11} />}
            </span>
            {c}
          </div>
          <span className={i < 3 ? "done" : "pending"}>
            {i < 3 ? "Concluído" : "A definir"}
          </span>
        </div>
      ))}
      <div className="sheet-tabs">
        <Plus size={13} />
        <span>
          <FileCheck2 size={13} /> Checklist de contratação{" "}
          <ChevronDown size={12} />
        </span>
        <span>Avaliação</span>
      </div>
      <div className="sheet-sticker">
        <FileCheck2 size={20} />
        <span>
          <b>Do planejamento à decisão.</b>
          <small>14 etapas para não deixar nada passar.</small>
        </span>
      </div>
    </div>
  );
}
