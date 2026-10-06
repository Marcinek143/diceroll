import { Megaphone } from "lucide-react";

export function AdSlot({ name, unitId }: { name: string; unitId?: string }) {
  return <section aria-label={`${name} advertisement`} data-ad-unit={unitId} className="mx-auto mb-14 mt-10 w-full max-w-7xl px-4 sm:mb-16 sm:px-8">
    <div className="flex flex-col items-center">
      <span className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-muted">Advertisement</span>
      <div className="ad-space flex items-center justify-center gap-2 px-3 text-center font-mono text-[11px] text-muted"><Megaphone size={15}/><span>Responsive ad space</span></div>
    </div>
  </section>;
}
