import { MOCK_WOREDAS } from '@/features/subcity-admins/subcity/mock/woredaAdmins.mock';
// import { MOCK_USERS } from '@/features/users/mock/users.mock';

const MOCK_BILLING = [
  { woredaId: 'w1', total: 45, paid: 38, unpaid: 5, overdue: 2, totalAmount: 5625, collectedAmount: 4750 },
  { woredaId: 'w2', total: 32, paid: 25, unpaid: 4, overdue: 3, totalAmount: 4000, collectedAmount: 3125 },
  { woredaId: 'w3', total: 28, paid: 20, unpaid: 6, overdue: 2, totalAmount: 3500, collectedAmount: 2500 },
];

export default function SubcityReportsPage() {
  const totals = MOCK_BILLING.reduce((acc, r) => ({
    total: acc.total + r.total,
    paid: acc.paid + r.paid,
    unpaid: acc.unpaid + r.unpaid,
    overdue: acc.overdue + r.overdue,
    totalAmount: acc.totalAmount + r.totalAmount,
    collectedAmount: acc.collectedAmount + r.collectedAmount,
  }), { total: 0, paid: 0, unpaid: 0, overdue: 0, totalAmount: 0, collectedAmount: 0 });

  return (
    <div className="text-[#e8f4f0]">

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          ['Total Bills', totals.total, 'across all woredas'],
          ['Paid', totals.paid, `${((totals.paid / totals.total) * 100).toFixed(1)}% collection rate`],
          ['Unpaid', totals.unpaid, 'awaiting payment'],
          ['Overdue', totals.overdue, 'past due date'],
        ].map(([label, value, sub]) => (
          <div key={label} className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-widest text-[rgba(232,244,240,0.35)] mb-2">{label}</p>
            <p className="font-syne text-3xl font-bold tracking-tight">{value}</p>
            <p className="text-[10px] text-[#1D9E75] mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Amount Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-xl p-5">
          <p className="text-[10px] uppercase tracking-widest text-[rgba(232,244,240,0.35)] mb-2">Total Amount</p>
          <p className="font-syne text-3xl font-bold tracking-tight text-[#e8f4f0]">
            {totals.totalAmount.toLocaleString()} ETB
          </p>
          <p className="text-[10px] text-[rgba(232,244,240,0.4)] mt-1">billed this period</p>
        </div>
        <div className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-xl p-5">
          <p className="text-[10px] uppercase tracking-widest text-[rgba(232,244,240,0.35)] mb-2">Collected Amount</p>
          <p className="font-syne text-3xl font-bold tracking-tight text-[#1D9E75]">
            {totals.collectedAmount.toLocaleString()} ETB
          </p>
          <p className="text-[10px] text-[rgba(232,244,240,0.4)] mt-1">
            {totals.totalAmount - totals.collectedAmount} ETB pending
          </p>
        </div>
      </div>

      {/* Per Woreda Breakdown */}
      <div className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[rgba(29,158,117,0.08)]">
          <h2 className="font-syne font-bold text-sm tracking-tight">Billing by Woreda</h2>
          <p className="text-[10px] text-[rgba(232,244,240,0.3)] mt-0.5">Breakdown per woreda under your subcity</p>
        </div>
        <div className="px-6 py-4 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-[rgba(29,158,117,0.06)]">
                {['Woreda', 'Total Bills', 'Paid', 'Unpaid', 'Overdue', 'Total Amount', 'Collected', 'Collection Rate'].map((h) => (
                  <th key={h} className="text-left text-[rgba(232,244,240,0.3)] font-medium pb-3 pr-4 uppercase tracking-wider text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_BILLING.map((r) => {
                const woreda = MOCK_WOREDAS.find((w) => w.id === r.woredaId);
                const rate = ((r.paid / r.total) * 100).toFixed(1);
                return (
                  <tr key={r.woredaId} className="border-b border-[rgba(29,158,117,0.04)] hover:bg-[rgba(29,158,117,0.03)] transition-colors">
                    <td className="py-3 pr-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] bg-[rgba(29,158,117,0.08)] text-[#1D9E75]">
                        {woreda?.name ?? '—'}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-[rgba(232,244,240,0.7)]">{r.total}</td>
                    <td className="py-3 pr-4 text-[#1D9E75]">{r.paid}</td>
                    <td className="py-3 pr-4 text-[#EF9F27]">{r.unpaid}</td>
                    <td className="py-3 pr-4 text-[#E24B4A]">{r.overdue}</td>
                    <td className="py-3 pr-4 text-[rgba(232,244,240,0.6)]">{r.totalAmount.toLocaleString()} ETB</td>
                    <td className="py-3 pr-4 text-[#1D9E75]">{r.collectedAmount.toLocaleString()} ETB</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-[rgba(29,158,117,0.1)] rounded-full overflow-hidden max-w-15">
                          <div className="h-full bg-[#1D9E75] rounded-full" style={{ width: `${rate}%` }} />
                        </div>
                        <span className="text-[rgba(232,244,240,0.6)]">{rate}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}