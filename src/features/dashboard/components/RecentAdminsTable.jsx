const ADMINS = [
  { name: 'Abebe Kebede', email: 'abebe@aquaconnect.com', role: 'System Admin', status: 'Active' },
  { name: 'Tigist Haile', email: 'tigist@aquaconnect.com', role: 'Subcity Admin', status: 'Active' },
  { name: 'Meron Tadesse', email: 'meron@aquaconnect.com', role: 'Subcity Admin', status: 'Pending' },
];

export default function RecentAdminsTable() {
  return (
    <div className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-syne font-bold text-sm tracking-tight">Recent Admins</h3>
        <span className="text-xs text-[#1D9E75] cursor-pointer hover:text-[#5DCAA5] transition-colors">View all</span>
      </div>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-[rgba(29,158,117,0.06)]">
            {['Name', 'Email', 'Role', 'Status'].map((h) => (
              <th key={h} className="text-left text-[rgba(232,244,240,0.3)] font-medium pb-2.5 pr-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ADMINS.map(({ name, email, role, status }) => (
            <tr key={email} className="border-b border-[rgba(29,158,117,0.04)]">
              <td className="py-2.5 pr-4 text-[rgba(232,244,240,0.8)]">{name}</td>
              <td className="py-2.5 pr-4 text-[rgba(232,244,240,0.5)]">{email}</td>
              <td className="py-2.5 pr-4 text-[rgba(232,244,240,0.5)]">{role}</td>
              <td className="py-2.5">
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  status === 'Active'
                    ? 'bg-[rgba(29,158,117,0.12)] text-[#1D9E75]'
                    : 'bg-[rgba(239,159,39,0.12)] text-[#EF9F27]'
                }`}>
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}