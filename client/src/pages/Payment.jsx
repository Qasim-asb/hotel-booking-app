import React, { useState } from 'react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { useCreateOrder } from '../hooks/useOrders'

const Payment = () => {
  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()
  const createMutation = useCreateOrder()

  const handleInputChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!user) return setError('Please login first')

    if (!form.cardNumber || !form.expiry || !form.cvc || !form.name) return setError('All fields required')

    createMutation.mutate(form, {
      onSuccess: () => navigate('/thank-you'),
      onError: (err) => setError(err.response?.data?.message || 'Payment failed')
    })
  }

  return (
    <div className='max-w-sm mx-auto px-4 py-8'>
      <Card className='p-6 dark:hover:shadow-gray-800'>
        <h2 className='text-2xl font-bold mb-6'>Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <Input label='Card Number' id='cardNumber' name='cardNumber' type='text' placeholder='1234 5678 9012 3456' value={form.cardNumber} onChange={handleInputChange} />
          <div className='flex gap-4'>
            <Input label='Expiry' id='expiry' name='expiry' type='date' value={form.expiry} onChange={handleInputChange} />
            <Input label='CVC' id='cvc' name='cvc' type='number' placeholder='123' value={form.cvc} onChange={handleInputChange} />
          </div>
          <Input label='Name on Card' id='name' name='name' type='text' placeholder='Enter your name' value={form.name} onChange={handleInputChange} />
          <Button type='submit' variant='primary' fullWidth disabled={createMutation.isPending} className='mt-4'>
            {createMutation.isPending ? 'Processing...' : 'Pay Now'}
          </Button>
        </form>
      </Card>
      {error && <div className='mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-center'>{error}</div>}
    </div>
  )
}

export default Payment