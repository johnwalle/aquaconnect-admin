'use client';

import { useState, useMemo } from 'react';
import { MOCK_USERS } from '../mock/user.mock';

const PAGE_SIZE = 6;

export function useUsers({ subcityId = '', woredaId = '' } = {}) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterFlag, setFilterFlag] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return MOCK_USERS.filter((u) => {
      const matchSearch =
        !search ||
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.meter?.meterNumber.toLowerCase().includes(search.toLowerCase());
      const matchSubcity = !subcityId || u.subCity?.id === subcityId;
      const matchWoreda = !woredaId || u.woreda?.id === woredaId;
      const matchStatus = !filterStatus || u.status === filterStatus;
      const matchFlag = !filterFlag || u.paymentFlag === filterFlag;
      return matchSearch && matchSubcity && matchWoreda && matchStatus && matchFlag;
    });
  }, [search, subcityId, woredaId, filterStatus, filterFlag]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'National ID', 'Subcity', 'Woreda', 'Meter', 'Status', 'Payment Flag', 'Email Verified', 'Created'];
    const rows = filtered.map((u) => [
      u.fullName, u.email, u.phoneE164, u.nationalId,
      u.subCity?.name, u.woreda?.name,
      u.meter?.meterNumber ?? 'No Meter',
      u.status, u.paymentFlag,
      u.emailVerified ? 'Yes' : 'No',
      new Date(u.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'users.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    users: paginated,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    filterFlag,
    setFilterFlag,
    exportCSV,
    totalCount: filtered.length,
    allUsers: MOCK_USERS,
  };
}