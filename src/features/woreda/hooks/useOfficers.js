'use client';

import { useState, useMemo } from 'react';
import { MOCK_OFFICERS } from '../mock/officers.mock';

const PAGE_SIZE = 5;

export function useOfficers() {
  const [officers, setOfficers] = useState(MOCK_OFFICERS);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    return officers.filter((o) => {
      const matchSearch = !search ||
        o.fullName.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase());
      const matchType = !filterType || o.fieldOfficerType === filterType;
      const matchStatus = !filterStatus || o.status === filterStatus;
      return matchSearch && matchType && matchStatus;
    });
  }, [officers, search, filterType, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const createOfficer = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setOfficers((prev) => [{
      id: Date.now().toString(),
      fullName: data.fullName,
      email: data.email,
      phoneE164: data.phoneNumber,
      nationalId: data.nationalId,
      role: 'FIELD_OFFICER',
      fieldOfficerType: data.fieldOfficerType,
      status: 'ACTIVE',
      woreda: { id: 'w1', name: 'Woreda 01' },
      subCity: { id: 'sc1', name: 'Bole' },
      createdAt: new Date().toISOString(),
    }, ...prev]);
    setLoading(false);
  };

  const updateOfficer = async (id, data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setOfficers((prev) => prev.map((o) =>
      o.id === id ? {
        ...o,
        fullName: data.fullName,
        email: data.email,
        phoneE164: data.phoneNumber,
        nationalId: data.nationalId,
      } : o
    ));
    setLoading(false);
  };

  const deleteOfficer = async (id) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setOfficers((prev) => prev.filter((o) => o.id !== id));
    setLoading(false);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'National ID', 'Type', 'Status', 'Created'];
    const rows = filtered.map((o) => [
      o.fullName, o.email, o.phoneE164, o.nationalId,
      o.fieldOfficerType, o.status,
      new Date(o.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'field-officers.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    officers: paginated,
    totalPages, page, setPage,
    search, setSearch,
    filterType, setFilterType,
    filterStatus, setFilterStatus,
    loading, createOfficer, updateOfficer, deleteOfficer,
    exportCSV, totalCount: filtered.length,
    allOfficers: MOCK_OFFICERS,
  };
}