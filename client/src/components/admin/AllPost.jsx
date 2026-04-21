import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import { useAllPosts } from '../../hooks/useAllPosts'
import Spinner from '../common/Spinner'
import { useDeletePost } from '../../hooks/usePostMutations'
import ConfirmModal from '../ui/ConfirmModal'

const AllPost = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [deleteItem, setDeleteItem] = useState(null)
  const { data: posts = [], isPending } = useAllPosts()
  const deleteMutation = useDeletePost()

  const confirmDelete = () => {
    setError('')
    setSuccess('')
    deleteMutation.mutate(deleteItem, {
      onSuccess: () => {
        setDeleteItem(null)
        setSuccess('Post deleted successfully')
      },
      onError: (err) => {
        setDeleteItem(null)
        setError(err.response?.data?.message || 'Failed to delete post')
      }
    })
  }

  if (isPending) return <Spinner className=' min-h-full' />

  return (
    <>
      <h2 className='text-2xl font-bold mb-6'>All Posts</h2>
      <div className='overflow-x-auto rounded-lg shadow-sm'>
        {!posts?.length ? (
          <div className='p-3 bg-red-100 text-red-700 rounded text-center'>No post exists</div>
        ) : (
          <table className='min-w-full bg-white dark:bg-gray-800'>
            <thead className='bg-gray-100 dark:bg-gray-700'>
              <tr>
                {['Title', 'Category', 'Date', 'Status', 'Actions'].map((item, i) => (
                  <th key={i} className='px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium'>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
              {posts.map(post => (
                <tr key={post._id}>
                  <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm'>{post.title}</td>
                  <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm'>{post.category?.category || '------'}</td>
                  <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm'>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className='px-4 sm:px-6 py-4 whitespace-nowrap'>
                    <Badge variant={`${post.isAvailable ? 'success' : 'warning'}`} className='rounded-full'>{post.isAvailable ? 'Published' : 'Draft'}</Badge>
                  </td>
                  <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm space-x-2'>
                    <Link to={`/admin/edit-post/${post.slug}`} className='text-primary-600 hover:underline'>Edit</Link>
                    <button onClick={() => setDeleteItem(post.slug)} className='text-red-600 hover:underline'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {error && <div className='mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-center'>{error}</div>}
      {success && <div className='mt-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-center'>{success}</div>}

      <ConfirmModal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={confirmDelete} item='post' loading={deleteMutation.isPending} />
    </>
  )
}

export default AllPost
