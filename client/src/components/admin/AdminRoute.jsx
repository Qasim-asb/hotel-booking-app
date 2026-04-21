import React from 'react'
import DashboardNavbar from '../common/DashboardNavbar'
import { adminNavlinks } from '../../utils/navigation'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'

const AdminRoute = () => {
  const { user } = useAuth()

  if (!user) return <Navigate to='/auth?mode=login' replace />
  if (user.role !== 'admin') return <Navigate to='/' replace />

  return (
    <div className='flex flex-col md:flex-row'>
      <DashboardNavbar links={adminNavlinks} />
      <div className='flex-1 p-4 md:p-6'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminRoute