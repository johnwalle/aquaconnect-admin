import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="bg-[#020f1a] text-[#e8f4f0] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-28 pb-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_50%,rgba(29,158,117,0.08),transparent)]" />
        <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
          <div className="inline-flex items-center gap-2 bg-[rgba(29,158,117,0.1)] border border-[rgba(29,158,117,0.25)] rounded-full px-4 py-1.5 text-xs text-[#5DCAA5] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
            Water Utility Management Platform
          </div>
          <h1 className="font-syne text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tighter mb-6">
            Manage your city's{' '}
            <em className="not-italic text-[#1D9E75]">water system</em> smarter
          </h1>
          <p className="text-[rgba(232,244,240,0.55)] text-base sm:text-lg leading-relaxed max-w-xl mb-10 font-light">
            AquaConnect gives administrators full visibility and control over water distribution, billing, and field operations across every sub-city and woreda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link
              href="/login"
              className="bg-[#1D9E75] text-[#020f1a] px-8 py-3 rounded-lg font-medium hover:bg-[#5DCAA5] transition-colors w-full sm:w-auto text-center"
            >
              Access Dashboard
            </Link>

            <a
              href="#features"
              className="text-[rgba(232,244,240,0.6)] px-6 py-3 rounded-lg border border-[rgba(232,244,240,0.1)] hover:border-[rgba(29,158,117,0.4)] hover:text-[#e8f4f0] transition-all w-full sm:w-auto text-center"
            >
              See how it works
            </a>
          </div>
          <div className="flex flex-wrap gap-8 sm:gap-12 mt-16 pt-10 border-t border-[rgba(29,158,117,0.12)]">
            {[
              ['12K+', 'Meters managed'],
              ['99.9%', 'Uptime'],
              ['6', 'Sub-cities covered'],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="font-syne text-2xl sm:text-3xl font-bold text-[#1D9E75] tracking-tight">
                  {num}
                </div>
                <div className="text-xs text-[rgba(232,244,240,0.4)] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="px-6 md:px-12 lg:px-16 pb-16">
        <div className="bg-[rgba(29,158,117,0.04)] border border-[rgba(29,158,117,0.12)] rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="bg-[#020f1a] border border-[rgba(29,158,117,0.08)] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 min-h-60">

            {/* Sidebar */}
            <div className="sm:w-40 sm:border-r border-b sm:border-b-0 border-[rgba(29,158,117,0.08)] pb-4 sm:pb-0 sm:pr-6 shrink-0">
              <div className="font-syne font-extrabold text-sm text-[#1D9E75] mb-4">AquaConnect</div>
              <div className="flex sm:flex-col flex-wrap gap-1">
                {['Dashboard', 'Admins', 'Users', 'Billing', 'Tariff'].map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs ${i === 0
                        ? 'bg-[rgba(29,158,117,0.12)] text-[#1D9E75]'
                        : 'text-[rgba(232,244,240,0.35)]'
                      }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Main */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
                {[
                  ['Total Users', '4,821'],
                  ['Active Meters', '3,940'],
                  ['Bills Issued', '1,204'],
                  ['Tariff/m³', '12.50'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="bg-[rgba(29,158,117,0.06)] border border-[rgba(29,158,117,0.1)] rounded-lg p-3"
                  >
                    <div className="text-[10px] text-[rgba(232,244,240,0.35)] mb-1">{label}</div>
                    <div className="font-syne font-bold text-base text-[#1D9E75]">{value}</div>
                  </div>
                ))}
              </div>
              <div className="bg-[rgba(29,158,117,0.04)] border border-[rgba(29,158,117,0.08)] rounded-lg p-3 h-20 sm:h-24 flex items-end gap-1.5">
                {[40, 65, 50, 80, 70, 55, 90, 75].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm transition-colors ${i === 3 ? 'bg-[#1D9E75]' : 'bg-[rgba(29,158,117,0.25)]'
                      }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-12 lg:px-16 py-16 sm:py-24">
        <div className="text-xs text-[#1D9E75] uppercase tracking-widest mb-3">What we offer</div>
        <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Everything you need to run a utility
        </h2>
        <p className="text-[rgba(232,244,240,0.45)] mb-12 font-light max-w-lg">
          From admin management to real-time billing, AquaConnect covers the full operational lifecycle.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-[rgba(29,158,117,0.08)] border border-[rgba(29,158,117,0.08)] rounded-2xl overflow-hidden">
          {[
            ['🏙️', 'Multi-level Admin Control', 'Manage system admins and subcity admins with role-based access and full audit visibility.'],
            ['💧', 'Meter Management', 'Track every meter across all woredas. Assign, update, and monitor consumption in real time.'],
            ['📄', 'Automated Billing', 'Generate and manage bills automatically based on meter readings and the active tariff rate.'],
            ['📍', 'Location-based Filtering', 'Filter users and reports by sub-city and woreda for precise administrative oversight.'],
            ['💰', 'Tariff Scheduling', 'Set new tariffs with effective dates so price changes are applied automatically on time.'],
            ['🔐', 'Secure Authentication', 'OTP-based email verification, JWT access tokens, and refresh token rotation keep accounts safe.'],
          ].map(([icon, title, desc]) => (
            <div
              key={title}
              className="bg-[#020f1a] p-8 sm:p-10 hover:bg-[rgba(29,158,117,0.04)] transition-colors border-b border-r border-[rgba(29,158,117,0.08)]"
            >
              <div className="w-11 h-11 bg-[rgba(29,158,117,0.12)] rounded-xl flex items-center justify-center text-xl mb-6">
                {icon}
              </div>
              <h3 className="font-syne font-bold text-base mb-3">{title}</h3>
              <p className="text-sm text-[rgba(232,244,240,0.45)] leading-relaxed font-light">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-16 py-12 sm:py-20">
        <div className="bg-[rgba(29,158,117,0.05)] border border-[rgba(29,158,117,0.15)] rounded-3xl p-10 sm:p-20 text-center">
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Ready to take control?
          </h2>
          <p className="text-[rgba(232,244,240,0.45)] mb-10 font-light max-w-md mx-auto">
            Sign in to your AquaConnect admin dashboard and start managing your city's water system today.
          </p>
          <Link
            href="/login"
            className="bg-[#1D9E75] text-[#020f1a] px-10 py-3.5 rounded-lg font-medium hover:bg-[#5DCAA5] transition-colors inline-block"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-16 py-6 border-t border-[rgba(29,158,117,0.08)] flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="font-syne font-extrabold text-[#1D9E75]">AquaConnect</span>
        <span className="text-xs text-[rgba(232,244,240,0.25)]">© 2026 AquaConnect. All rights reserved.</span>
      </footer>
    </main>
  );
}