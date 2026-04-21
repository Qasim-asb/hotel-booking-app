const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Hotels' },
  { to: '/cart', label: 'Cart' }
]

const userNavlinks = [
  { to: '/user', label: 'Dashboard' },
  { to: '/user/orders', label: 'Orders' },
  { to: '/user/contribute', label: 'Contribute' }
]

const adminNavlinks = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/create-category', label: 'Create Category' },
  { to: '/admin/all-categories', label: 'All Categories' },
  { to: '/admin/create-post', label: 'Create Post' },
  { to: '/admin/all-posts', label: 'All Posts' },
  { to: '/admin/all-trips', label: 'All Trips' },
  { to: '/admin/all-users', label: 'All Users' },
  { to: '/admin/pending-reviews', label: 'Pending Reviews' }
]

export { navLinks, userNavlinks, adminNavlinks }