import StatsGrid from '@/features/dashboard/components/StatsGrid';
import TariffCard from '@/features/dashboard/components/TariffCard';
import RecentAdminsTable from '@/features/dashboard/components/RecentAdminsTable';

export default function DashboardPage() {
  return (
    <div>
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-syne font-bold text-sm tracking-tight">Monthly Billing</h3>
            <span className="text-xs text-[#1D9E75] cursor-pointer">View all</span>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {[40, 60, 45, 75, 65, 85, 70, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-opacity hover:opacity-70"
                style={{
                  height: `${h}%`,
                  background: i === 3 ? '#1D9E75' : 'rgba(29,158,117,0.25)',
                }}
              />
            ))}
          </div>
        </div>
        <TariffCard />
      </div>
      <RecentAdminsTable />
    </div>
  );
}