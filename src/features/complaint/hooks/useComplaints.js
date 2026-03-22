'use client';

import { useState, useMemo } from 'react';
import { MOCK_COMPLAINTS, MY_OFFICER_ID } from '../mock/complaints.mock';

const PAGE_SIZE = 5;
const STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

export function useComplaints({ assignedOnly = false, statusFilter = '' } = {}) {
  const [complaints, setComplaints] = useState(MOCK_COMPLAINTS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState(statusFilter);
  const [page, setPage] = useState(1);
  const [updateTarget, setUpdateTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      const matchSearch = !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.submittedBy.fullName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !filterStatus || c.status === filterStatus;
      const matchAssigned = !assignedOnly || c.assignedTo?.id === MY_OFFICER_ID;
      return matchSearch && matchStatus && matchAssigned;
    });
  }, [complaints, search, filterStatus, assignedOnly]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateStatus = async (id, status) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setComplaints((prev) => prev.map((c) =>
      c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c
    ));
    setLoading(false);
    setUpdateTarget(null);
  };

  return {
    complaints: paginated,
    totalPages, page, setPage,
    search, setSearch,
    filterStatus, setFilterStatus,
    loading,
    updateTarget, setUpdateTarget,
    updateStatus,
    totalCount: filtered.length,
    allComplaints: complaints,
    STATUSES,
  };
}