import { MOCK_BILLS, MOCK_METERS, MOCK_READINGS } from '@/features/billing/mock/billing.mock';

export default function BillingOverviewPage() {
  const paid = MOCK_BILLS.filter(b => b.status === 'PAID').length;
  const unpaid = MOCK_BILLS.filter(b => b.status === 'UNPAID').length;
  const overdue = MOCK_BILLS.filter(b => b.status === 'OVERDUE').length;
  const escalated = MOCK_BILLS.filter(b => b.status === 'ESCALATED').length;
  const totalAmount = MOCK_BILLS.reduce((s, b) => s + b.amount, 0);
  const collected = MOCK_BILLS.filter(b => b.status === 'PAID').reduce((s, b) => s + b.amount, 0);

  return (
    <div className="text-[#e8f4f0]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          ['Total Bills', MOCK_BILLS.length, 'this period'],
          ['Paid', paid, `${((paid / MOCK_BILLS.length) * 100).toFixed(1)}% rate`],
          ['Unpaid', unpaid + overdue, 'need collection'],
          ['Escalated', escalated, 'legal action'],
        ].map(([label, value, sub]) => (
          <div key={label} className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-widest text-[rgba(232,244,240,0.35)] mb-2">{label}</p>
            <p className="font-syne text-3xl font-bold tracking-tight">{value}</p>
            <p className="text-[10px] text-[#1D9E75] mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {[
          ['Total Billed', totalAmount, 'ETB', 'text-[#e8f4f0]'],
          ['Collected', collected, 'ETB', 'text-[#1D9E75]'],
          ['Pending', totalAmount - collected, 'ETB', 'text-[#EF9F27]'],
        ].map(([label, value, unit, color]) => (
          <div key={label} className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-widest text-[rgba(232,244,240,0.35)] mb-2">{label}</p>
            <p className={`font-syne text-2xl font-bold tracking-tight ${color}`}>
              {value.toLocaleString()} <span className="text-sm font-normal">{unit}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-syne font-bold text-sm tracking-tight">Recent Readings</h3>
            <a href="/billing/readings" className="text-[10px] text-[#1D9E75] hover:text-[#5DCAA5] transition-colors">View all</a>
          </div>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-[rgba(29,158,117,0.06)]">
                {['Meter', 'Customer', 'Reading', 'Date'].map((h) => (
                  <th key={h} className="text-left text-[rgba(232,244,240,0.3)] font-medium pb-2 pr-3 text-[10px] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_READINGS.slice(0, 4).map((r) => (
                <tr key={r.id} className="border-b border-[rgba(29,158,117,0.04)]">
                  <td className="py-2 pr-3"><span className="px-2 py-0.5 rounded-md text-[10px] bg-[rgba(29,158,117,0.08)] text-[#1D9E75]">{r.meter.meterNumber}</span></td>
                  <td className="py-2 pr-3 text-[rgba(232,244,240,0.7)]">{r.createdBy.fullName}</td>
                  <td className="py-2 pr-3 font-mono text-[rgba(232,244,240,0.6)]">{r.readingValue}</td>
                  <td className="py-2 text-[rgba(232,244,240,0.4)]">{new Date(r.readingDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-syne font-bold text-sm tracking-tight">Meters Under Woreda</h3>
            <a href="/billing/meters" className="text-[10px] text-[#1D9E75] hover:text-[#5DCAA5] transition-colors">View all</a>
          </div>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-[rgba(29,158,117,0.06)]">
                {['Meter No.', 'Customer', 'Flag'].map((h) => (
                  <th key={h} className="text-left text-[rgba(232,244,240,0.3)] font-medium pb-2 pr-3 text-[10px] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_METERS.slice(0, 4).map((m) => (
                <tr key={m.id} className="border-b border-[rgba(29,158,117,0.04)]">
                  <td className="py-2 pr-3"><span className="px-2 py-0.5 rounded-md text-[10px] bg-[rgba(29,158,117,0.08)] text-[#1D9E75]">{m.meterNumber}</span></td>
                  <td className="py-2 pr-3 text-[rgba(232,244,240,0.7)]">{m.customer.fullName}</td>
                  <td className="py-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${m.customer.paymentFlag === 'NONE' ? 'bg-[rgba(29,158,117,0.1)] text-[#1D9E75]' : m.customer.paymentFlag === 'WARNING' ? 'bg-[rgba(239,159,39,0.12)] text-[#EF9F27]' : 'bg-[rgba(226,75,74,0.12)] text-[#E24B4A]'}`}>
                      {m.customer.paymentFlag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}