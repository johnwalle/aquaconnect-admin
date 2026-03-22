import { MOCK_CUSTOMER_REPORT, MOCK_WOREDA_CUSTOMERS } from '@/features/woreda/mock/officers.mock';

export default function CustomerReportPage() {
  const { totalCustomers, breakdown } = MOCK_CUSTOMER_REPORT;

  return (
    <div className="text-[#e8f4f0]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          ['Total', totalCustomers, 'registered'],
          ['Active', breakdown.active, 'in good standing'],
          ['Suspended', breakdown.suspended, 'account suspended'],
          ['Escalated', breakdown.escalated, 'legal action'],
        ].map(([label, value, sub]) => (
          <div key={label} className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-widest text-[rgba(232,244,240,0.35)] mb-2">{label}</p>
            <p className="font-syne text-3xl font-bold tracking-tight">{value}</p>
            <p className="text-[10px] text-[#1D9E75] mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-2xl p-6 mb-4">
        <h3 className="font-syne font-bold text-sm tracking-tight mb-5">Payment Flag Distribution</h3>
        <div className="space-y-4">
          {[
            ['Clear', MOCK_WOREDA_CUSTOMERS.filter(u => u.paymentFlag === 'NONE').length, '#1D9E75'],
            ['Warning', MOCK_WOREDA_CUSTOMERS.filter(u => u.paymentFlag === 'WARNING').length, '#EF9F27'],
            ['Critical', MOCK_WOREDA_CUSTOMERS.filter(u => u.paymentFlag === 'CRITICAL').length, '#E24B4A'],
            ['Legal Action', MOCK_WOREDA_CUSTOMERS.filter(u => u.paymentFlag === 'LEGAL_ACTION').length, '#D4537E'],
          ].map(([label, value, color]) => {
            const pct = ((value / totalCustomers) * 100).toFixed(1);
            return (
              <div key={label} className="flex items-center gap-4">
                <span className="text-xs text-[rgba(232,244,240,0.5)] w-24">{label}</span>
                <div className="flex-1 h-2 bg-[rgba(29,158,117,0.08)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                </div>
                <span className="text-xs text-[rgba(232,244,240,0.5)] w-16 text-right">{value} ({pct}%)</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-2xl p-6">
        <h3 className="font-syne font-bold text-sm tracking-tight mb-5">Meter Assignment Status</h3>
        <div className="space-y-4">
          {[
            ['With Meter', MOCK_WOREDA_CUSTOMERS.filter(u => u.meter).length, '#1D9E75'],
            ['No Meter', MOCK_WOREDA_CUSTOMERS.filter(u => !u.meter).length, '#EF9F27'],
          ].map(([label, value, color]) => {
            const pct = ((value / totalCustomers) * 100).toFixed(1);
            return (
              <div key={label} className="flex items-center gap-4">
                <span className="text-xs text-[rgba(232,244,240,0.5)] w-24">{label}</span>
                <div className="flex-1 h-2 bg-[rgba(29,158,117,0.08)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                </div>
                <span className="text-xs text-[rgba(232,244,240,0.5)] w-16 text-right">{value} ({pct}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}