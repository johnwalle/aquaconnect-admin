export default function TariffCard() {
  return (
    <div className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-syne font-bold text-sm tracking-tight">Current Tariff</h3>
        <span className="text-xs text-[#1D9E75] cursor-pointer hover:text-[#5DCAA5] transition-colors">Update</span>
      </div>
      <div className="bg-[rgba(29,158,117,0.05)] border border-[rgba(29,158,117,0.15)] rounded-xl p-4 flex justify-between items-center">
        <div>
          <p className="font-syne text-4xl font-extrabold text-[#1D9E75] tracking-tight">12.50</p>
          <p className="text-[10px] text-[rgba(232,244,240,0.35)] mt-1">ETB per m³</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[rgba(232,244,240,0.3)]">Effective from</p>
          <p className="text-xs text-[#e8f4f0] mt-1">Jan 1, 2026</p>
        </div>
      </div>
    </div>
  );
}