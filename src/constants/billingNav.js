export const BILLING_NAV = [
  {
    section: 'Main',
    items: [
      { label: 'Overview', icon: '⬛', href: '/billing' },
    ],
  },
  {
    section: 'Meters',
    items: [
      { label: 'Meters', icon: '📟', href: '/billing/meters' },
      { label: 'Readings', icon: '📊', href: '/billing/readings' },
    ],
  },
  {
    section: 'Bills',
    items: [
      { label: 'All Bills', icon: '📄', href: '/billing/bills' },
      { label: 'Unpaid Bills', icon: '🔴', href: '/billing/bills/unpaid' },
      { label: 'Overdue Bills', icon: '⚠️', href: '/billing/bills/overdue' },
      { label: 'Escalated Bills', icon: '🚨', href: '/billing/bills/escalated' },
    ],
  },
];

export const BILLING_PAGE_META = {
  '/billing':                { title: 'Overview',        sub: 'Welcome back, Billing Officer',        action: '' },
  '/billing/meters':         { title: 'Meters',          sub: 'View meters under your woreda',         action: '' },
  '/billing/readings':       { title: 'Readings',        sub: 'View OCR meter readings',              action: '' },
  '/billing/bills':          { title: 'All Bills',       sub: 'All bills under your woreda',           action: 'Export CSV' },
  '/billing/bills/unpaid':   { title: 'Unpaid Bills',    sub: 'Bills awaiting payment',               action: 'Export CSV' },
  '/billing/bills/overdue':  { title: 'Overdue Bills',   sub: 'Bills past due date',                  action: 'Export CSV' },
  '/billing/bills/escalated':{ title: 'Escalated Bills', sub: 'Bills flagged for legal action',       action: 'Export CSV' },
};