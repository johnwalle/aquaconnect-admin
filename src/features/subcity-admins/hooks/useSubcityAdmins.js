'use client';

import { useState, useMemo } from 'react';
import { MOCK_SUBCITY_ADMINS, MOCK_SUBCITIES } from '../mock/subcityAdmins.mock';

const PAGE_SIZE = 5;

export function useSubcityAdmins() {
  const [admins, setAdmins] = useState(MOCK_SUBCITY_ADMINS);
  const [search, setSearch] = useState('');
  const [filterSubcity, setFilterSubcity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    return admins.filter((a) => {
      const matchSearch =
        !search ||
        a.fullName.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase());
      const matchSubcity = !filterSubcity || a.subCity?.id === filterSubcity;
      const matchStatus = !filterStatus || a.status === filterStatus;
      return matchSearch && matchSubcity && matchStatus;
    });
  }, [admins, search, filterSubcity, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const createAdmin = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const subcity = MOCK_SUBCITIES.find((s) => s.id === data.subcityId);
    const newAdmin = {
      id: Date.now().toString(),
      fullName: data.fullName,
      email: data.email,
      phoneE164: data.phoneNumber,
      nationalId: data.nationalId,
      role: 'SUBCITY_ADMIN',
      status: 'ACTIVE',
      subCity: subcity,
      createdAt: new Date().toISOString(),
    };
    setAdmins((prev) => [newAdmin, ...prev]);
    setLoading(false);
  };

  const updateAdmin = async (id, data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const subcity = MOCK_SUBCITIES.find((s) => s.id === data.subcityId);
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, fullName: data.fullName, email: data.email, phoneE164: data.phoneNumber, nationalId: data.nationalId, subCity: subcity ?? a.subCity }
          : a
      )
    );
    setLoading(false);
  };

  const deleteAdmin = async (id) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setAdmins((prev) => prev.filter((a) => a.id !== id));
    setLoading(false);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'National ID', 'Subcity', 'Status', 'Created At'];
    const rows = filtered.map((a) => [
      a.fullName, a.email, a.phoneE164, a.nationalId,
      a.subCity?.name, a.status, new Date(a.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'subcity-admins.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    admins: paginated,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    filterSubcity,
    setFilterSubcity,
    filterStatus,
    setFilterStatus,
    loading,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    exportCSV,
    totalCount: filtered.length,
  };
}