import React, { useState } from 'react'
import Badge from '../ui/Badge'
import ConfirmModal from '../ui/ConfirmModal'
import { usePendingReviews, useApproveReview, useDeleteReview } from '../../hooks/useReviews'
import Spinner from '../common/Spinner'

const PendingReviews = () => {
  const [deleteItem, setDeleteItem] = useState(null)
  const { data: reviews = [], isLoading } = usePendingReviews()
  const approveMutation = useApproveReview()
  const deleteMutation = useDeleteReview()


  const handleApprove = (reviewId) => {
    if (confirm('Approve this review? It will become visible on the hotel page.')) {
      approveMutation.mutate(reviewId)
    }
  }

  const confirmDelete = () => {
    if (deleteItem) {
      deleteMutation.mutate(deleteItem)
      setDeleteItem(null)
    }
  }

  if (isLoading) return <Spinner className='min-h-full' />

  return (
    <>
      <h2 className='text-2xl font-bold mb-6'>Pending Reviews</h2>
      {reviews.length === 0 ? (
        <p className='p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-center'>No pending reviews.</p>
      ) : (
        <div className='space-y-4'>
          {reviews.map(review => (
            <div key={review._id} className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm'>
              <div className='flex justify-between items-start flex-wrap'>
                <div>
                  <p className='font-semibold'>Hotel: {review.post?.title || 'Deleted hotel'}</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>User: {review.user?.name || 'Unknown'} ({review.user?.email})</p>
                  <p className='text-sm mt-1'>Rating: <Badge variant='primary'>{review.rating} ★</Badge></p>
                  <p className='mt-2'>{review.content}</p>
                  <p className='text-xs text-gray-500 mt-1'>Submitted: {new Date(review.createdAt).toLocaleString()}</p>
                </div>
                <div className='text-sm space-x-2'>
                  <button onClick={() => handleApprove(review._id)} disabled={approveMutation.isPending} className='text-green-600 hover:underline'>Approve</button>
                  <button onClick={() => setDeleteItem(review._id)} disabled={deleteMutation.isPending} className='text-red-600 hover:underline'>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmModal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={confirmDelete} item='review' loading={deleteMutation.isPending} />
    </>
  )
}

export default PendingReviews