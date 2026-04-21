import React, { useState } from 'react'
import Badge from '../ui/Badge';
import { useAllUsers, useUpdateUserRole } from '../../hooks/useUsers'
import Spinner from '../common/Spinner';

const AllUsers = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { data: users = [], isLoading } = useAllUsers()
  const updateMutation = useUpdateUserRole()

  const handleRoleChange = (userId, role) => {
    setError('')
    setSuccess('')
    updateMutation.mutate({ userId, role }, {
      onSuccess: () => setSuccess(`User role updated to "${role}"`),
      onError: (err) => setError(err.response?.data?.message || 'Failed to updated user role')
    })
  }

  if (isLoading) return <Spinner className=' min-h-full' />

  return (
    <>
      <h2 className='text-2xl font-bold mb-6'>All Users</h2>
      <div className='overflow-x-auto rounded-lg shadow-sm'>
        <table className='min-w-full bg-white dark:bg-gray-800'>
          <thead className='bg-gray-100 dark:bg-gray-700'>
            <tr>
              {['Name', 'Email', 'Role', 'Joined', 'Actions'].map((item, i) => (
                <th key={i} className='px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium'>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
            {users.map(user => (
              <tr key={user._id}>
                <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm'>{user.name}</td>
                <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm'>{user.email}</td>
                <td className='px-4 sm:px-6 py-4 whitespace-nowrap'>
                  <Badge variant={`${user.role === 'admin' ? 'purple' : 'default'}`} className='rounded-full'>{user.role}</Badge>
                </td>
                <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm'>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm'>
                  {user.role === 'admin' ? (
                    <button onClick={() => handleRoleChange(user._id, 'user')} className='text-yellow-600 hover:underline'>Demote to User</button>
                  ) : (
                    <button onClick={() => handleRoleChange(user._id, 'admin')} className='text-green-600 hover:underline'>Promote to Admin</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <div className='mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-center'>{error}</div>}
      {success && <div className='mt-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-center'>{success}</div>}
    </>
  )
}

export default AllUsers