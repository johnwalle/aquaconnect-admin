'use client';

import { useState } from 'react';
import { useSubcityAdmins } from '@/features/subcity-admins/hooks/useSubcityAdmins';
import SubcityAdminTable from '@/features/subcity-admins/components/SubcityAdminTable';
import SubcityAdminForm from '@/features/subcity-admins/components/SubcityAdminForm';
import Pagination from '@/features/subcity-admins/components/Pagination';
import Modal from '@/components/ui/Modal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { MOCK_SUBCITIES } from '@/features/subcity-admins/mock/subcityAdmins.mock';

const TABS = ['All Admins', 'By Subcity'];
const STATUSES = ['', 'ACTIVE', 'INACTIVE', 'SUSPENDED'];

export default function SubcityAdminsPage() {
  const [tab, setTab] = useState(0);
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const {
    admins, totalPages, page, setPage,
    search, setSearch,
    filterSubcity, setFilterSubcity,
    filterStatus, setFilterStatus,
    loading, createAdmin, updateAdmin, deleteAdmin,
    exportCSV, totalCount,
  } = useSubcityAdmins();

  const handleCreate = async (data) => {
    await createAdmin(data);
    setCreateOpen(false);
  };

  const handleUpdate = async (data) => {
    await updateAdmin(editTarget.id, data);
    setEditTarget(null);
  };

  const handleDelete = async () => {
    await deleteAdmin(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="text-[#e8f4f0]">

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          ['Total Admins', totalCount, 'across all subcities'],
          ['Active', admins.filter(a => a.status === 'ACTIVE').length, 'currently active'],
          ['Subcities', MOCK_SUBCITIES.length, 'subcities covered'],
        ].map(([label, value, sub]) => (
          <div key={label} className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-widest text-[rgba(232,244,240,0.35)] mb-2">{label}</p>
            <p className="font-syne text-3xl font-bold tracking-tight text-[#e8f4f0]">{value}</p>
            <p className="text-[10px] text-[#1D9E75] mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="bg-[#05141f] border border-[rgba(29,158,117,0.08)] rounded-2xl overflow-hidden">

        {/* Card Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(29,158,117,0.08)]">
          <div className="flex gap-1 bg-[rgba(29,158,117,0.05)] rounded-xl p-1">
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${tab === i
                    ? 'bg-[#1D9E75] text-[#020f1a]'
                    : 'text-[rgba(232,244,240,0.45)] hover:text-[#e8f4f0]'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-xl text-xs border border-[rgba(29,158,117,0.15)] text-[rgba(232,244,240,0.5)] hover:text-[#1D9E75] hover:border-[rgba(29,158,117,0.35)] transition-all"
            >
              Export CSV
            </button>
            <button
              onClick={() => setCreateOpen(true)}
              className="px-4 py-2 rounded-xl text-xs bg-[#1D9E75] text-[#020f1a] font-medium hover:bg-[#5DCAA5] transition-colors"
            >
              + Add Subcity Admin
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-[rgba(29,158,117,0.06)]">
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(232,244,240,0.2)] text-xs">🔍</span>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name or email..."
              className="w-full bg-[rgba(29,158,117,0.04)] border border-[rgba(29,158,117,0.1)] rounded-xl pl-8 pr-4 py-2 text-xs text-[#e8f4f0] placeholder-[rgba(232,244,240,0.2)] outline-none focus:border-[rgba(29,158,117,0.4)] transition-all"
            />
          </div>
          {tab === 1 && (
            <select
              value={filterSubcity}
              onChange={(e) => { setFilterSubcity(e.target.value); setPage(1); }}
              className="bg-[rgba(29,158,117,0.04)] border border-[rgba(29,158,117,0.1)] rounded-xl px-3 py-2 text-xs text-[#e8f4f0] outline-none focus:border-[rgba(29,158,117,0.4)] transition-all"
            >
              <option value="">All Subcities</option>
              {MOCK_SUBCITIES.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          )}
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            className="bg-[rgba(29,158,117,0.04)] border border-[rgba(29,158,117,0.1)] rounded-xl px-3 py-2 text-xs text-[#e8f4f0] outline-none focus:border-[rgba(29,158,117,0.4)] transition-all"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s || 'All Statuses'}</option>
            ))}
          </select>
          {(search || filterSubcity || filterStatus) && (
            <button
              onClick={() => { setSearch(''); setFilterSubcity(''); setFilterStatus(''); setPage(1); }}
              className="text-[10px] text-[rgba(232,244,240,0.3)] hover:text-[#E24B4A] transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="px-6 py-4">
          <SubcityAdminTable
            admins={admins}
            onEdit={setEditTarget}
            onDelete={setDeleteTarget}
          />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>

      </div>

      {/* Create Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Add Subcity Admin">
        <SubcityAdminForm onSubmit={handleCreate} loading={loading} />
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Subcity Admin">
        <SubcityAdminForm
          onSubmit={handleUpdate}
          defaultValues={editTarget}
          loading={loading}
        />
      </Modal>

      {/* Delete Modal */}
      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={loading}
        title="Delete Subcity Admin"
        message={`Are you sure you want to delete ${deleteTarget?.fullName}? This action cannot be undone.`}
      />

    </div>
  );
}