import React from 'react'
import Badge from '../ui/Badge'
import { useAuth } from '../../context/AuthProvider'
import { useOrders } from '../../hooks/useOrders'
import Spinner from '../common/Spinner'

const YourOrder = () => {
  const { user } = useAuth()
  const { data: orders = [], isLoading } = useOrders(!!user)

  if (!user) return (
    <div className='container-custom'>
      <p className='mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-center'>Please login first. <Link to='/auth?mode=login' className='text-primary-600'>Login</Link></p>
    </div>
  )

  if (isLoading) return <Spinner className=' min-h-full' />

  return (
    <>
      <h2 className='text-2xl font-bold mb-6'>Your Orders</h2>
      <div className='space-y-4'>
        {orders.map(order => (
          <div key={order._id} className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm'>
            <div className='flex justify-between items-start flex-wrap'>
              <div>
                <p className='text-xs sm:text-sm font-medium mt-1'>Order #{order._id.slice(-6)}</p>
                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <Badge variant={`${order.status === 'paid' ? 'success' : order.status === 'pending' ? 'warning' : 'default'}`} className='mt-2 sm:mt-0 rounded-full px-3'>{order.status}</Badge>
            </div>
            {order.items.map(item => (
              <div key={item._id} className='mt-2 border-t pt-2'>
                <p className='font-semibold'>{item.title}</p>
                <p className='text-sm'>Nights: {item.nights} | Check-in: {new Date(item.checkInDate).toLocaleDateString()}</p>
                <p className='text-sm'>Price: ${item.price}/night → Total: ${item.price * item.nights}</p>
              </div>
            ))}
            <div className='mt-2 text-right font-bold'>Total: ${order.total}</div>
          </div>
        ))}
        {orders.length === 0 && <p className='mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-center'>No orders yet.</p>}
      </div>
    </>
  )
}

export default YourOrder