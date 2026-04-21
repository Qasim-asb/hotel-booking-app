import React from 'react'
import { NavLink } from 'react-router-dom'

const baseClasses = 'transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 dark:focus-visible:ring-offset-gray-900 rounded'

const NavItem = ({ children, to, onClick, className = '', activeClassName = '', inactiveClassName = '', showUnderline = false }) => {

  return (
    <NavLink to={to} onClick={onClick} className={({ isActive }) => `${baseClasses} ${className} ${isActive ? activeClassName : inactiveClassName}`}>
      {({ isActive }) => (
        <>
          {children}
          {showUnderline && <span className={`absolute left-0 -bottom-1 h-[2px] bg-primary-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />}
        </>
      )}
    </NavLink>
  )
}

export default NavItem
