import React from 'react'
import Card from './Card'
import Button from './Button'

const ConfirmModal = ({ isOpen, onClose, onConfirm, item, loading = false }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <Card className='max-w-md mx-4 p-6 dark:hover:shadow-gray-800'>
        <h3 className='text-lg font-semibold mb-4'>Confirm Delete</h3>
        <p className='text-gray-700 dark:text-gray-300 mb-6 text-pretty'>
          Are you sure you want to delete this {item}? This action cannot be undone.
        </p>

        <div className='flex justify-end gap-3'>
          <Button variant='secondary' size='sm' onClick={onClose} disabled={loading}>Cancel</Button>
          <Button variant='danger' size='sm' onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>

      </Card>
    </div>
  )
}

export default ConfirmModal