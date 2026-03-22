const STATS = [
  { label: 'Total Users', value: '4,821', change: '↑ 12% this month' },
  { label: 'Active Meters', value: '3,940', change: '↑ 8% this month' },
  { label: 'Bills Issued', value: '1,204', change: '↑ 5% this month' },
  { label: 'Subcity Admins', value: '14', change: '↑ 2 added' },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {STATS.map(({ label, value, change }) => (
        <div key={label} className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-xl p-5">
          <p className="text-[10px] uppercase tracking-widest text-[rgba(232,244,240,0.35)] mb-2">{label}</p>
          <p className="font-syne text-3xl font-bold tracking-tight mb-1">{value}</p>
          <p className="text-xs text-[#1D9E75]">{change}</p>
        </div>
      ))}
    </div>
  );
}