export const SUBCITY_NAV = [
  {
    section: 'Main',
    items: [
      { label: 'Overview', icon: '⬛', href: '/subcity' },
    ],
  },
  {
    section: 'Management',
    items: [
      { label: 'Woreda Admins', icon: '🏛️', href: '/subcity/woreda-admins' },
      { label: 'Schedules', icon: '📅', href: '/subcity/schedules' },
    ],
  },
  {
    section: 'Users',
    items: [
      { label: 'Subcity Users', icon: '👥', href: '/subcity/users' },
      { label: 'Woreda Users', icon: '📍', href: '/subcity/users/woreda' },
    ],
  },
  {
    section: 'Reports',
    items: [
      { label: 'Reports', icon: '📊', href: '/subcity/reports' },
    ],
  },
];

export const SUBCITY_PAGE_META = {
  '/subcity':               { title: 'Overview',      sub: 'Welcome back, Subcity Admin',          action: '' },
  '/subcity/woreda-admins': { title: 'Woreda Admins', sub: 'Manage woreda administrators',          action: '+ Add Woreda Admin' },
  '/subcity/schedules':     { title: 'Schedules',     sub: 'Manage water distribution schedules',  action: '+ Add Schedule' },
  '/subcity/users':         { title: 'Subcity Users', sub: 'All users under your subcity',          action: 'Export CSV' },
  '/subcity/users/woreda':  { title: 'Woreda Users',  sub: 'Filter users by woreda',               action: 'Export CSV' },
  '/subcity/reports':       { title: 'Reports',       sub: 'Billing summary for your subcity',     action: 'Export CSV' },
};