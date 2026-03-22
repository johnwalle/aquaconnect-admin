export const WOREDA_NAV = [
  {
    section: 'Main',
    items: [
      { label: 'Overview', icon: '⬛', href: '/woreda' },
    ],
  },
  {
    section: 'Management',
    items: [
      { label: 'Field Officers', icon: '👷', href: '/woreda/officers' },
    ],
  },
  {
    section: 'Users',
    items: [
      { label: 'Customers', icon: '👥', href: '/woreda/customers' },
    ],
  },
  {
    section: 'Reports',
    items: [
      { label: 'Billing Report', icon: '📄', href: '/woreda/reports/billing' },
      { label: 'Complaint Report', icon: '📋', href: '/woreda/reports/complaints' },
      { label: 'Customer Report', icon: '📊', href: '/woreda/reports/customers' },
    ],
  },
];

export const WOREDA_PAGE_META = {
  '/woreda':                   { title: 'Overview',          sub: 'Welcome back, Woreda Admin',              action: '' },
  '/woreda/officers':          { title: 'Field Officers',    sub: 'Manage billing and complaint officers',   action: '+ Add Officer' },
  '/woreda/customers':         { title: 'Customers',         sub: 'View customers under your woreda',        action: 'Export CSV' },
  '/woreda/reports/billing':   { title: 'Billing Report',    sub: 'Billing summary for your woreda',         action: 'Export CSV' },
  '/woreda/reports/complaints':{ title: 'Complaint Report',  sub: 'Complaint summary for your woreda',       action: '' },
  '/woreda/reports/customers': { title: 'Customer Report',   sub: 'Customer overview for your woreda',       action: '' },
};