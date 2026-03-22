'use client';

import { useState, useMemo } from 'react';
import { MOCK_SCHEDULES } from '../mock/schedules.mock';
import { MOCK_WOREDAS } from '../mock/woredaAdmins.mock';

const DAYS_ORDER = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];
const PAGE_SIZE = 5;

export function useSchedules() {
  const [schedules, setSchedules] = useState(MOCK_SCHEDULES);
  const [filterWoreda, setFilterWoreda] = useState('');
  const [filterDay, setFilterDay] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    return schedules
      .filter((s) => {
        const matchWoreda = !filterWoreda || s.woreda?.id === filterWoreda;
        const matchDay = !filterDay || s.day === filterDay;
        return matchWoreda && matchDay;
      })
      .sort((a, b) => DAYS_ORDER.indexOf(a.day) - DAYS_ORDER.indexOf(b.day));
  }, [schedules, filterWoreda, filterDay]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const createSchedule = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const woreda = MOCK_WOREDAS.find((w) => w.id === data.woredaId);
    setSchedules((prev) => [...prev, {
      id: Date.now().toString(),
      day: data.day,
      startTime: data.startTime,
      endTime: data.endTime,
      note: data.note ?? '',
      woreda,
      createdBy: { id: 'sa1', fullName: 'Selam Girma' },
      updatedBy: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }]);
    setLoading(false);
  };

  const updateSchedule = async (id, data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setSchedules((prev) => prev.map((s) =>
      s.id === id ? {
        ...s,
        day: data.day ?? s.day,
        startTime: data.startTime ?? s.startTime,
        endTime: data.endTime ?? s.endTime,
        note: data.note ?? s.note,
        updatedBy: { id: 'sa1', fullName: 'Selam Girma' },
        updatedAt: new Date().toISOString(),
      } : s
    ));
    setLoading(false);
  };

  const deleteSchedule = async (id) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    setLoading(false);
  };

  return {
    schedules: paginated,
    totalPages, page, setPage,
    filterWoreda, setFilterWoreda,
    filterDay, setFilterDay,
    loading, createSchedule, updateSchedule, deleteSchedule,
    totalCount: filtered.length,
  };
}