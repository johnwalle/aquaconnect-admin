'use client';

import { useState, useMemo } from 'react';
import { MOCK_BILLING_REPORTS, MOCK_TARIFFS } from '../mock/billing.mock';

export function useBilling() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return MOCK_BILLING_REPORTS.filter((r) =>
      !search || r.woreda.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totals = useMemo(() => ({
    totalBills: MOCK_BILLING_REPORTS.reduce((s, r) => s + r.totalBills, 0),
    totalAmount: MOCK_BILLING_REPORTS.reduce((s, r) => s + r.totalAmount, 0),
    totalPaid: MOCK_BILLING_REPORTS.reduce((s, r) => s + r.paidBills, 0),
    totalUnpaid: MOCK_BILLING_REPORTS.reduce((s, r) => s + r.unpaidBills, 0),
    totalConsumption: MOCK_BILLING_REPORTS.reduce((s, r) => s + r.totalConsumption, 0),
  }), []);

  const exportCSV = () => {
    const headers = ['Woreda', 'Total Bills', 'Paid', 'Unpaid', 'Total Amount (ETB)', 'Total Consumption (m³)', 'Collection Rate'];
    const rows = filtered.map((r) => [
      r.woreda, r.totalBills, r.paidBills, r.unpaidBills,
      r.totalAmount.toFixed(2),
      r.totalConsumption.toFixed(2),
      `${((r.paidBills / r.totalBills) * 100).toFixed(1)}%`,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'billing-reports.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return { reports: filtered, totals, search, setSearch, exportCSV };
}

export function useTariff() {
  const [tariffs, setTariffs] = useState(MOCK_TARIFFS);
  const [loading, setLoading] = useState(false);

  const effectiveTariff = useMemo(() => {
    const now = new Date();
    return [...tariffs]
      .filter((t) => new Date(t.effectiveFrom) <= now)
      .sort((a, b) => new Date(b.effectiveFrom) - new Date(a.effectiveFrom))[0] ?? null;
  }, [tariffs]);

  const setTariff = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const newTariff = {
      id: Date.now().toString(),
      pricePerCubicMeter: parseFloat(data.pricePerM3),
      effectiveFrom: data.effectiveFrom,
      createdAt: new Date().toISOString(),
    };
    setTariffs((prev) => [...prev, newTariff]);
    setLoading(false);
  };

  return { tariffs, effectiveTariff, loading, setTariff };
}