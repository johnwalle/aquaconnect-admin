'use client';

import { useState, useMemo } from 'react';
import { MOCK_BILLS } from '../mock/billing.mock';

const PAGE_SIZE = 5;

export function useBills({ statusFilter = '' } = {}) {
  const [bills, setBills] = useState(MOCK_BILLS);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [payTarget, setPayTarget] = useState(null);
  const [waiveTarget, setWaiveTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    return bills.filter((b) => {
      const matchSearch = !search ||
        b.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
        b.customer.email.toLowerCase().includes(search.toLowerCase()) ||
        b.monthYear.includes(search);
      const matchStatus = !statusFilter || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bills, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const markAsPaid = async (id, amount) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setBills((prev) => prev.map((b) =>
      b.id === id ? {
        ...b,
        status: 'PAID',
        payment: { id: Date.now().toString(), amount, status: 'COMPLETED', paymentDate: new Date().toISOString() },
      } : b
    ));
    setLoading(false);
    setPayTarget(null);
  };

  const waivePenalty = async (id) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setBills((prev) => prev.map((b) =>
      b.id === id ? {
        ...b,
        amount: b.originalAmount,
        penaltyAmount: 0,
        penaltyApplied: false,
        penaltyCount: 0,
        status: 'UNPAID',
      } : b
    ));
    setLoading(false);
    setWaiveTarget(null);
  };

  const exportCSV = () => {
    const headers = ['Customer', 'Email', 'Month', 'Consumption', 'Amount', 'Penalty', 'Status', 'Due Date'];
    const rows = filtered.map((b) => [
      b.customer.fullName, b.customer.email,
      b.monthYear, b.consumption,
      b.amount, b.penaltyAmount,
      b.status, new Date(b.dueDate).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bills-${statusFilter || 'all'}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    bills: paginated,
    totalPages, page, setPage,
    search, setSearch,
    loading,
    payTarget, setPayTarget,
    waiveTarget, setWaiveTarget,
    markAsPaid, waivePenalty,
    exportCSV,
    totalCount: filtered.length,
    allBills: bills,
  };
}