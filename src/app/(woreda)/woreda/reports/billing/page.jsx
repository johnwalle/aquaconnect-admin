import { MOCK_BILLING_REPORT } from '@/features/woreda/mock/officers.mock';

export default function BillingReportPage() {
  const { totalBills, breakdown, totalAmount, collectedAmount, pendingAmount } = MOCK_BILLING_REPORT;
  const collectionRate = ((breakdown.paid / totalBills) * 100).toFixed(1);

  return (
    <div className="text-[#e8f4f0]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          ['Total Bills', totalBills, 'this period'],
          ['Paid', breakdown.paid, `${collectionRate}% rate`],
          ['Unpaid', breakdown.unpaid, 'awaiting payment'],
          ['Overdue', breakdown.overdue + breakdown.escalated, 'need attention'],
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
          ['Total Amount', totalAmount, 'ETB', 'billed this period', 'text-[#e8f4f0]'],
          ['Collected', collectedAmount, 'ETB', 'payments received', 'text-[#1D9E75]'],
          ['Pending', pendingAmount, 'ETB', 'yet to be collected', 'text-[#EF9F27]'],
        ].map(([label, value, unit, sub, color]) => (
          <div key={label} className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-widest text-[rgba(232,244,240,0.35)] mb-2">{label}</p>
            <p className={`font-syne text-3xl font-bold tracking-tight ${color}`}>
              {value.toLocaleString()} <span className="text-base font-normal">{unit}</span>
            </p>
            <p className="text-[10px] text-[rgba(232,244,240,0.4)] mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-2xl p-6">
        <h3 className="font-syne font-bold text-sm tracking-tight mb-5">Bill Status Breakdown</h3>
        <div className="space-y-4">
          {[
            ['Paid', breakdown.paid, totalBills, '#1D9E75'],
            ['Unpaid', breakdown.unpaid, totalBills, '#EF9F27'],
            ['Overdue', breakdown.overdue, totalBills, '#E24B4A'],
            ['Escalated', breakdown.escalated, totalBills, '#D4537E'],
          ].map(([label, value, total, color]) => {
            const pct = ((value / total) * 100).toFixed(1);
            return (
              <div key={label} className="flex items-center gap-4">
                <span className="text-xs text-[rgba(232,244,240,0.5)] w-20">{label}</span>
                <div className="flex-1 h-2 bg-[rgba(29,158,117,0.08)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
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