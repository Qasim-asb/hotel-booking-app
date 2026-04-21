import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useAuth } from '../context/AuthProvider'
import { useCart, useClearCart, useRemoveFromCart } from '../hooks/useCart'
import Spinner from '../components/common/Spinner'

const CartPage = () => {
  const { user } = useAuth()
  const { data: items = [], isLoading } = useCart(!!user)
  const removeMutation = useRemoveFromCart()
  const clearMutation = useClearCart()

  const total = items.reduce((sum, item) => sum + item.post.price * item.nights, 0)
  const tax = Math.round(total * 0.1)
  const grandTotal = total + tax

  if (!user) return (
    <div className='container-custom'>
      <p className='mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-center'>Please login first. <Link to='/auth?mode=login' className='text-primary-600'>Login</Link></p>
    </div>
  )

  if (isLoading) return <Spinner className=' min-h-full' />

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      clearMutation.mutate()
    }
  }

  return (
    <div className='container-custom py-8'>
      <h1 className='text-2xl font-bold mb-6'>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty. <Link to='/search' className='text-primary-600'>Browse hotels</Link></p>
      ) : (
        <>
          <div className='flex justify-end mb-4'>
            <Button variant='outline' size='sm' onClick={handleClearCart} disabled={clearMutation.isPending}>
              {clearMutation.isPending ? 'Clearing...' : 'Clear Cart'}
            </Button>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-4'>
              {items.map(item => (
                <Card key={item.post._id} className='p-4 flex justify-between items-center dark:hover:shadow-gray-800'>
                  <div>
                    <h3 className='font-semibold'>{item.post.title}</h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Nights: {item.nights}</p>
                    <p className='text-sm text-gray-600'>Check-in: {new Date(item.checkInDate).toLocaleDateString()}</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold'>${item.post.price * item.nights}</p>
                    <button onClick={() => removeMutation.mutate(item.post._id)} className='text-sm text-red-600 hover:underline'>Remove</button>
                  </div>
                </Card>
              ))}
            </div>
            <div>
              <Card className='p-6 dark:hover:shadow-gray-800'>
                <h3 className='font-semibold text-lg mb-4'>Summary</h3>
                <div className='flex justify-between mb-2'>
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className='flex justify-between mb-4'>
                  <span>Taxes (10%)</span>
                  <span>${tax}</span>
                </div>
                <div className='border-t pt-4 flex justify-between font-bold'>
                  <span>Total</span>
                  <span>${grandTotal}</span>
                </div>
                <Link to='/payment' className='bg-primary-600 px-4 py-2 mt-6 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 w-full block text-center'>Proceed to Payment</Link>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage