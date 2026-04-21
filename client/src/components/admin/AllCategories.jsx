import React, { useState } from 'react'
import Input from '../ui/Input'
import Spinner from '../common/Spinner'
import { useCategories } from '../../hooks/useCategories'
import { useDeleteCategory, useUpdateCategory } from '../../hooks/useCategoryMutations'
import ConfirmModal from '../ui/ConfirmModal'

const AllCategories = () => {
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [deleteItem, setDeleteItem] = useState(null)
  const { data: categories = [], isPending } = useCategories()
  const deleteMutation = useDeleteCategory()
  const updateMutation = useUpdateCategory()

  const confirmDelete = async () => {
    setError('')
    setSuccess('')
    deleteMutation.mutate(deleteItem, {
      onSuccess: () => {
        setDeleteItem(null)
        setSuccess('Category deleted successfully')
      },
      onError: (err) => {
        setDeleteItem(null)
        setError(err.response?.data?.message || 'Failed to delete category')
      }
    })
  }

  const startEdit = (cat) => {
    setEditingId(cat._id)
    setEditValue(cat.category)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
    setError('')
    setSuccess('')
  }

  const handleUpdate = (slug) => {
    setError('')
    setSuccess('')

    if (!editValue.trim()) return setError('Category name cannot be empty')

    updateMutation.mutate(
      { slug, category: editValue },
      {
        onSuccess: () => {
          cancelEdit()
          setSuccess('Category updated successfully')
        },
        onError: (err) => setError(err.response?.data?.message || 'Failed to update')
      }
    )
  }

  if (isPending) return <Spinner className=' min-h-full' />

  return (
    <>
      <h2 className='text-2xl font-bold mb-6'>All Categories</h2>
      <div className='overflow-x-auto rounded-lg shadow-sm'>
        {!categories?.length ? (
          <div className='p-3 bg-red-100 text-red-700 rounded text-center'>No category exists</div>
        ) : (
          <table className='min-w-full bg-white dark:bg-gray-800'>
            <thead className='bg-gray-100 dark:bg-gray-700'>
              <tr>
                {['Name', 'Slug', 'Actions'].map((item, i) => (
                  <th key={i} className='px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium'>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
              {categories.map(cat => (
                <tr key={cat._id}>
                  <td className='px-4 sm:px-6 py-4 whitespace-nowrap'>
                    {editingId === cat._id ? (
                      <Input type='text' value={editValue} onChange={(e) => setEditValue(e.target.value)} className='w-40 sm:w-60' autoFocus />
                    ) : (
                      <span className='text-sm'>{cat.category}</span>
                    )}
                  </td>
                  <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>{cat.slug}</td>
                  <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm space-x-2'>
                    {editingId === cat._id ? (
                      <>
                        <button onClick={() => handleUpdate(cat.slug)} className='text-green-600 hover:underline'>Save</button>
                        <button onClick={cancelEdit} className='text-gray-500 dark:text-gray-400 hover:underline'>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(cat)} className='text-primary-600 hover:underline'>Edit</button>
                        <button onClick={() => setDeleteItem(cat.slug)} className='text-red-600 hover:underline'>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {error && <div className='mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-center'>{error}</div>}
      {success && <div className='mt-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-center'>{success}</div>}

      <ConfirmModal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={confirmDelete} item='category' loading={deleteMutation.isPending} />
    </>
  )
}

export default AllCategories
