'use client';

import { usePathname } from 'next/navigation';

export default function Topbar({ pageMeta = {}, onAction }) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? { title: 'Dashboard', sub: '', action: '' };

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-[rgba(29,158,117,0.08)] shrink-0 bg-[#020f1a]">
      <div>
        <h1 className="font-syne font-bold text-sm tracking-tight">{meta.title}</h1>
        <p className="text-[10px] text-[rgba(232,244,240,0.3)] mt-0.5">{meta.sub}</p>
      </div>
      <div className="flex items-center gap-3">
        {meta.action && (
          <button onClick={onAction} className="bg-[rgba(29,158,117,0.08)] border border-[rgba(29,158,117,0.15)] rounded-lg px-4 py-1.5 text-xs text-[#1D9E75] hover:bg-[rgba(29,158,117,0.15)] transition-colors font-medium">
            {meta.action}
          </button>
        )}
        <div className="w-2 h-2 rounded-full bg-[#1D9E75]" />
      </div>
    </header>
  );
}