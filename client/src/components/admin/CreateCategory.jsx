import React, { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useCreateCategory } from '../../hooks/useCategoryMutations'

const CreateCategory = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const createMutation = useCreateCategory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim()) {
      setError('Category name required')
      setName('')
      return
    }

    createMutation.mutate(name, {
      onSuccess: () => {
        setSuccess(`Category "${name}" created successfully!`)
        setName('')
      },
      onError: (err) => setError(err.response?.data?.message || 'Failed to create category')
    })
  }

  return (
    <div className='sm:max-w-xl md:max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6'>Create Category</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input label='Category Name' id='name' type='text' value={name} onChange={e => setName(e.target.value)} placeholder='e.g., luxury, budget' className='bg-white dark:bg-gray-800' />
        <Button type='submit' disabled={createMutation.isPending} className='w-full sm:w-auto'>{createMutation.isPending ? 'Creating...' : 'Create Category'}</Button>
      </form>
      {error && <div className='mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-center'>{error}</div>}
      {success && <div className='mt-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-center'>{success}</div>}
    </div>
  )
}

export default CreateCategory