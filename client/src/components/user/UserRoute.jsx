import React from 'react'
import DashboardNavbar from '../common/DashboardNavbar'
import { userNavlinks } from '../../utils/navigation'
import { Outlet } from 'react-router-dom'

const UserRoute = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <DashboardNavbar links={userNavlinks} />
      <div className='flex-1 p-4 md:p-6'>
        <Outlet />
      </div>
    </div>
  )
}

export default UserRoute