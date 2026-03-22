'use client';

import EmptyState from '@/components/ui/EmptyState';

const DAY_COLORS = {
  MONDAY:    'bg-[rgba(29,158,117,0.12)] text-[#1D9E75]',
  TUESDAY:   'bg-[rgba(55,138,221,0.12)] text-[#378ADD]',
  WEDNESDAY: 'bg-[rgba(186,117,23,0.12)] text-[#BA7517]',
  THURSDAY:  'bg-[rgba(29,158,117,0.12)] text-[#1D9E75]',
  FRIDAY:    'bg-[rgba(212,83,126,0.12)] text-[#D4537E]',
  SATURDAY:  'bg-[rgba(127,119,221,0.12)] text-[#7F77DD]',
  SUNDAY:    'bg-[rgba(226,75,74,0.12)] text-[#E24B4A]',
};

export default function ScheduleTable({ schedules, onEdit, onDelete }) {
  if (!schedules.length) return <EmptyState message="No schedules found." />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-[rgba(29,158,117,0.06)]">
            {['Day', 'Woreda', 'Start Time', 'End Time', 'Duration', 'Note', 'Last Updated', 'Actions'].map((h) => (
              <th key={h} className="text-left text-[rgba(232,244,240,0.3)] font-medium pb-3 pr-4 uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedules.map((s) => {
            const [sh, sm] = s.startTime.split(':').map(Number);
            const [eh, em] = s.endTime.split(':').map(Number);
            const duration = (eh * 60 + em) - (sh * 60 + sm);
            return (
              <tr key={s.id} className="border-b border-[rgba(29,158,117,0.04)] hover:bg-[rgba(29,158,117,0.03)] transition-colors">
                <td className="py-3 pr-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-medium ${DAY_COLORS[s.day]}`}>
                    {s.day.charAt(0) + s.day.slice(1).toLowerCase()}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span className="px-2 py-0.5 rounded-md text-[10px] bg-[rgba(29,158,117,0.08)] text-[#1D9E75]">
                    {s.woreda?.name ?? '—'}
                  </span>
                </td>
                <td className="py-3 pr-4 text-[rgba(232,244,240,0.7)] font-mono">{s.startTime}</td>
                <td className="py-3 pr-4 text-[rgba(232,244,240,0.7)] font-mono">{s.endTime}</td>
                <td className="py-3 pr-4 text-[rgba(232,244,240,0.5)]">{duration}h {duration % 60 > 0 ? `${duration % 60}m` : ''}</td>
                <td className="py-3 pr-4 text-[rgba(232,244,240,0.4)] max-w-35 truncate">{s.note || '—'}</td>
                <td className="py-3 pr-4 text-[rgba(232,244,240,0.4)]">{new Date(s.updatedAt).toLocaleDateString()}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(s)} className="px-3 py-1 rounded-lg text-[10px] bg-[rgba(29,158,117,0.08)] text-[#1D9E75] hover:bg-[rgba(29,158,117,0.18)] transition-colors">Edit</button>
                    <button onClick={() => onDelete(s)} className="px-3 py-1 rounded-lg text-[10px] bg-[rgba(226,75,74,0.08)] text-[#E24B4A] hover:bg-[rgba(226,75,74,0.18)] transition-colors">Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}