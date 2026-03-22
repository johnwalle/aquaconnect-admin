'use client';

import { useState, useMemo } from 'react';
import { MOCK_WOREDA_ADMINS, MOCK_WOREDAS } from '../mock/woredaAdmins.mock';

const PAGE_SIZE = 5;

export function useWoredaAdmins() {
  const [admins, setAdmins] = useState(MOCK_WOREDA_ADMINS);
  const [search, setSearch] = useState('');
  const [filterWoreda, setFilterWoreda] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    return admins.filter((a) => {
      const matchSearch = !search ||
        a.fullName.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase());
      const matchWoreda = !filterWoreda || a.woreda?.id === filterWoreda;
      const matchStatus = !filterStatus || a.status === filterStatus;
      return matchSearch && matchWoreda && matchStatus;
    });
  }, [admins, search, filterWoreda, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const createAdmin = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const woreda = MOCK_WOREDAS.find((w) => w.id === data.woredaId);
    setAdmins((prev) => [{
      id: Date.now().toString(),
      fullName: data.fullName,
      email: data.email,
      phoneE164: data.phoneNumber,
      nationalId: data.nationalId,
      role: 'WOREDA_ADMIN',
      status: 'ACTIVE',
      woreda,
      subCity: { id: 'sc1', name: 'Bole' },
      createdAt: new Date().toISOString(),
    }, ...prev]);
    setLoading(false);
  };

  const updateAdmin = async (id, data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const woreda = MOCK_WOREDAS.find((w) => w.id === data.woredaId);
    setAdmins((prev) => prev.map((a) =>
      a.id === id ? {
        ...a,
        fullName: data.fullName,
        email: data.email,
        phoneE164: data.phoneNumber,
        nationalId: data.nationalId,
        woreda: woreda ?? a.woreda,
      } : a
    ));
    setLoading(false);
  };

  const deleteAdmin = async (id) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setAdmins((prev) => prev.filter((a) => a.id !== id));
    setLoading(false);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'National ID', 'Woreda', 'Status', 'Created'];
    const rows = filtered.map((a) => [
      a.fullName, a.email, a.phoneE164, a.nationalId,
      a.woreda?.name, a.status,
      new Date(a.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'woreda-admins.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    admins: paginated,
    totalPages, page, setPage,
    search, setSearch,
    filterWoreda, setFilterWoreda,
    filterStatus, setFilterStatus,
    loading, createAdmin, updateAdmin, deleteAdmin,
    exportCSV, totalCount: filtered.length,
  };
}