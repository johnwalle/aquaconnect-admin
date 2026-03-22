'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/store/sidebarStore';

export default function Sidebar({ nav, role = 'SA', name = 'System Admin', roleLabel = 'SYSTEM_ADMIN' }) {
  const { collapsed, setCollapsed } = useSidebar();
  const pathname = usePathname();

  return (
    <aside className={`flex flex-col bg-[#05141f] border-r border-[rgba(29,158,117,0.1)] transition-all duration-250 shrink-0 h-screen sticky top-0 overflow-hidden ${collapsed ? 'w-15' : 'w-55'}`}>
      <div className="flex items-center justify-between px-4 h-14 border-b border-[rgba(29,158,117,0.08)] shrink-0">
        {!collapsed && (
          <Link href="/" className="font-syne font-extrabold text-base text-[#1D9E75] hover:opacity-80 transition-opacity">
            Aqua<span className="text-[#e8f4f0]">Connect</span>
          </Link>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="text-[rgba(232,244,240,0.3)] hover:text-[#1D9E75] transition-colors text-xs p-1 rounded ml-auto">
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden">
        {nav.map(({ section, items }) => (
          <div key={section}>
            {!collapsed
              ? <p className="px-3 pt-3 pb-1 text-[9px] uppercase tracking-widest text-[rgba(232,244,240,0.2)]">{section}</p>
              : <div className="h-3" />
            }
            {items.map(({ label, icon, href }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} title={collapsed ? label : undefined}
                  className={`flex items-center gap-2 px-3 py-2 mx-2 rounded-lg transition-all text-xs mb-0.5
                    ${active ? 'bg-[rgba(29,158,117,0.12)] text-[#1D9E75]' : 'text-[rgba(232,244,240,0.45)] hover:bg-[rgba(29,158,117,0.07)] hover:text-[#e8f4f0]'}`}
                >
                  <span className="text-xs w-4 shrink-0 text-center">{icon}</span>
                  {!collapsed && <span className={`whitespace-nowrap font-medium ${active ? 'text-[#1D9E75]' : ''}`}>{label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-[rgba(29,158,117,0.08)]">
        <div className="flex items-center gap-2 p-2 rounded-xl bg-[rgba(29,158,117,0.05)] overflow-hidden">
          <div className="w-7 h-7 rounded-full bg-[rgba(29,158,117,0.2)] flex items-center justify-center text-[10px] font-syne font-bold text-[#1D9E75] shrink-0">{role}</div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-medium truncate">{name}</p>
              <p className="text-[9px] text-[rgba(232,244,240,0.3)]">{roleLabel}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}