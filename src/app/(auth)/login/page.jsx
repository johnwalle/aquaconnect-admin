import Link from 'next/link';
import LoginForm from '@/app/features/auth/components/LoginForm';

const METRICS = [
  ['12K+', 'Meters monitored'],
  ['99.9%', 'System uptime'],
  ['6', 'Sub-cities covered'],
  ['24/7', 'Monitoring active'],
];

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#020f1a] text-[#e8f4f0]">

      {/* LEFT PANEL */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_40%,rgba(29,158,117,0.12),transparent)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(29,158,117,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(29,158,117,0.05) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Logo */}
        <Link
          href="/"
          className="relative font-syne font-extrabold text-xl text-[#1D9E75] hover:opacity-80 transition-opacity w-fit"
        >
          Aqua<span className="text-[#e8f4f0]">Connect</span>
        </Link>

        {/* Main */}
        <div className="relative flex-1 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-[rgba(29,158,117,0.1)] border border-[rgba(29,158,117,0.2)] rounded-full px-4 py-1.5 text-xs text-[#5DCAA5] mb-8 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
            Admin Portal
          </div>
          <h2 className="font-syne text-5xl font-extrabold leading-tight tracking-tighter mb-5">
            Control every<br />drop of your<br />
            <em className="not-italic text-[#1D9E75]">water network</em>
          </h2>
          <p className="text-sm text-[rgba(232,244,240,0.45)] leading-relaxed max-w-sm mb-12 font-light">
            Full operational visibility across sub-cities, woredas, meters, and billing — all from one place.
          </p>
          <div className="grid grid-cols-2 divide-x divide-y divide-[rgba(29,158,117,0.08)] border border-[rgba(29,158,117,0.08)] rounded-2xl overflow-hidden max-w-sm">
            {METRICS.map(([num, label]) => (
              <div key={label} className="bg-[#020f1a] p-5">
                <div className="font-syne text-2xl font-bold text-[#1D9E75] tracking-tight">{num}</div>
                <div className="text-xs text-[rgba(232,244,240,0.35)] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative text-xs text-[rgba(232,244,240,0.2)]">
          © 2026 AquaConnect. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-[#05141f] border-l border-[rgba(29,158,117,0.08)] flex items-center justify-center p-8 sm:p-12">
        <LoginForm />
      </div>

    </main>
  );
}