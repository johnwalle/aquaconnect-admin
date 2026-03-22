export const NAV = [
  {
    section: 'Main',
    items: [
      { label: 'Overview', icon: '⬛', href: '/dashboard' },
    ],
  },
  {
    section: 'Admin Management',
    items: [
      { label: 'Super Admins', icon: '👑', href: '/dashboard/super-admins' },
      { label: 'Subcity Admins', icon: '🏙️', href: '/dashboard/subcity-admins' },
    ],
  },
  {
    section: 'Users',
    items: [
      { label: 'All Users', icon: '👥', href: '/dashboard/users' },
      { label: 'Users By Location', icon: '📍', href: '/dashboard/users/location' },
    ],
  },
  {
    section: 'Finance',
    items: [
      { label: 'Billing Reports', icon: '📄', href: '/dashboard/billing' },
      { label: 'Tariff', icon: '💰', href: '/dashboard/tariff' },
    ],
  },
];

export const PAGE_META = {
  '/dashboard': { title: 'Overview', sub: 'Welcome back, System Admin', action: '+ Add Admin' },
  '/dashboard/super-admins': { title: 'Super Admins', sub: 'Manage system administrators', action: '+ Add Super Admin' },
  '/dashboard/subcity-admins': { title: 'Subcity Admins', sub: 'Manage subcity administrators', action: '+ Add Subcity Admin' },
  '/dashboard/users': { title: 'All Users', sub: 'View all registered customers', action: 'Export CSV' },
  '/dashboard/users/location': { title: 'Users By Location', sub: 'Filter users by subcity and woreda', action: 'Export CSV' },
  '/dashboard/billing': { title: 'Billing Reports', sub: 'View billing summaries', action: 'Export CSV' },
  '/dashboard/tariff': { title: 'Tariff', sub: 'Manage water tariff pricing', action: '+ Set Tariff' },
};