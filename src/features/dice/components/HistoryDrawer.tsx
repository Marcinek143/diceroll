"use client";

import { useEffect, useRef } from "react";
import { History, X } from "lucide-react";
import type { RollRecord } from "../domain/roll";
import { formatRoll } from "../domain/roll";

export function HistoryDrawer({ open, onClose, records }: { open: boolean; onClose: () => void; records: RollRecord[] }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open, onClose]);
  if (!open) return null;
  return <div className="fixed inset-0 z-50" role="presentation">
    <button className="absolute inset-0 h-full w-full bg-black/65 backdrop-blur-sm" type="button" onClick={onClose} aria-label="Close history"/>
    <aside role="dialog" aria-modal="true" aria-labelledby="history-title" className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-[var(--line)] bg-panel shadow-2xl">
      <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-5"><h2 id="history-title" className="flex items-center gap-2 text-base font-semibold"><History size={20} className="text-accent-text"/>Recent Rolls</h2><button ref={closeRef} className="utility-button" type="button" onClick={onClose} aria-label="Close history"><X size={18}/></button></div>
      <div className="flex-1 space-y-3 overflow-y-auto p-6">
        {records.length === 0 ? <p className="py-6 text-center text-sm text-subtext">No completed rolls yet. Roll the dice to begin.</p> : records.map((record) => <div key={record.id} className="rounded-xl border border-[var(--line)] bg-well p-3.5">
          <div className="flex items-center justify-between gap-3"><span className="font-mono text-xs text-subtext">{record.values.join(" + ")}</span><strong className="font-mono text-base">{record.total}</strong></div>
          <div className="mt-1 flex items-center justify-between gap-2 text-[11px] text-muted"><span>{record.count} {record.count === 1 ? "die" : "dice"} · {formatRoll(record)}</span><time dateTime={record.timestamp}>{new Date(record.timestamp).toLocaleString()}</time></div>
        </div>)}
      </div>
    </aside>
  </div>;
}
