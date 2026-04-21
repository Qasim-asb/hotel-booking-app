import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png'
import { FaBars, FaTimes } from 'react-icons/fa'
import Button from '../ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import NavItem from '../ui/NavItem'
import { navLinks } from '../../utils/navigation'
import { useAuth } from '../../context/AuthProvider'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setIsOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => document.body.style.overflow = 'unset'
  }, [isOpen])

  return (
    <nav className='bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50'>
      <div className='container-custom'>
        <div className='flex justify-between items-center h-16'>
          <Link to={'/'} className='dark:bg-gray-300 p-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 dark:focus-visible:ring-offset-gray-900'>
            <img src={logo} alt='logo' className='h-6 sm:h-7 w-auto' />
          </Link>

          <div className='hidden md:flex items-center space-x-6'>
            {navLinks.map(link => <NavItem key={link.to} to={link.to} className='relative hover:text-primary-600 dark:hover:text-primary-400' activeClassName='text-primary-600 dark:text-primary-400' showUnderline>{link.label}</NavItem>)}
            {user ? (
              <>
                <NavItem to={user.role === 'admin' ? '/admin' : '/user'} className='relative hover:text-primary-600 dark:hover:text-primary-400' activeClassName='text-primary-600 dark:text-primary-400' showUnderline>Dashboard</NavItem>
                <Button variant='outline' size='sm' onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to={'/auth?mode=login'} className='text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1.5 text-sm rounded font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-offset-gray-900'>Sign In</Link>
                <Link to={'/auth?mode=signup'} className='bg-primary-600 px-3 py-1.5 text-sm text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 dark:focus-visible:ring-offset-gray-900'>Sign Up</Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-color duration-300 z-45 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-gray-900 ${isOpen ? 'focus:ring-offset-black/20' : ''}`}>
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>


      {isOpen && (
        <div className='fixed inset-0 z-40 md:hidden' onClick={() => setIsOpen(false)}>
          <div className='absolute inset-0 bg-black/50' />
          <nav onClick={(e) => e.stopPropagation()} className='absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 space-y-2'>
            {navLinks.map(link => <NavItem key={link.to} to={link.to} onClick={() => setIsOpen(false)} className='block py-2 px-3 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700' activeClassName='text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-700'>{link.label}</NavItem>)}
            {user ? (
              <>
                <NavItem to={user.role === 'admin' ? '/admin' : '/user'} onClick={() => setIsOpen(false)} className='block py-2 px-3 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700' activeClassName='text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-700'>Dashboard</NavItem>
                <Button variant='outline' size='sm' fullWidth onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <div className='text-center '>
                <Link to={'/auth?mode=login'} onClick={() => setIsOpen(false)} className='text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1.5 text-sm rounded font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-offset-gray-900 w-full block mb-2'>Sign In</Link>
                <Link to={'/auth?mode=signup'} onClick={() => setIsOpen(false)} className='bg-primary-600 px-3 py-1.5 text-sm text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 dark:focus-visible:ring-offset-gray-900 w-full block'>Sign Up</Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </nav>
  )
}

export default Navbar
