import React from 'react'
import NavItem from '../ui/NavItem'

const DashboardNavbar = ({ links }) => {

  return (
    <aside className='w-full md:w-64 bg-gray-100 dark:bg-gray-800 md:min-h-screen'>
      <nav className='flex md:flex-col space-x-4 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-visible snap-x md:snap-none p-2 md:p-4 scroll-pl-2 scroll-pr-2'>
        {links.map(link => (
          <NavItem key={link.to} to={link.to} className='block px-4 py-2 whitespace-nowrap md:whitespace-normal focus-visible:ring-offset-gray-100 snap-start flex-shrink-0' activeClassName='bg-primary-600 text-white' inactiveClassName='hover:bg-gray-200 dark:hover:bg-gray-700'>
            {link.label}
          </NavItem>
        ))}
      </nav>
    </aside>
  )
}

export default DashboardNavbar