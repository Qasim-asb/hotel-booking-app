import React, { useCallback, useState } from 'react'
import SearchableSelect from '../ui/SearchableSelect'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { useAllPosts } from '../../hooks/useAllPosts'
import { useAuth } from '../../context/AuthProvider'
import { useCreateReview } from '../../hooks/useReviews'

const ratingOptions = Array.from({ length: 5 }, (_, i) => {
  const n = 5 - i
  return {
    value: n,
    label: `${n} ★`
  }
})

const ContributePost = () => {
  const [form, setForm] = useState({
    postId: '',
    rating: 5,
    content: ''
  })
  const { user } = useAuth()
  const { data: posts = [], isLoading } = useAllPosts()
  const createMutation = useCreateReview()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const setField = useCallback((name, value) => setForm(prev => ({ ...prev, [name]: value })), [])
  const handlePostIdChange = useCallback(val => setField('postId', val), [setField])
  const handleRatingChange = useCallback(val => setField('rating', val), [setField])
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setField(name, value)
  }, [setField])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!user) return setError('Please login first')

    if (!form.postId || !form.content) return setError('All fields required')

    createMutation.mutate(form, {
      onSuccess: () => {
        setSuccess('Thank you! Your review will be published after moderation.')
        setForm({ postId: '', rating: 5, content: '' })
      },
      onError: (err) => setError(err.response?.data?.message || 'Failed to submit')
    })
  }

  return (
    <div className='sm:max-w-xl md:max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6'>Write a Review</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <SearchableSelect label='Hotel' value={form.postId} onChange={handlePostIdChange} options={posts} placeholder={isLoading ? 'Loadind hotels...' : 'Search hotel...'} />
        <Select label='Rating' value={form.rating} onChange={handleRatingChange} options={ratingOptions} />
        <div>
          <label htmlFor='content' className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 inline-block'>Your Review</label>
          <textarea id='content' name='content' value={form.content} onChange={handleInputChange} placeholder='Share your experience...' rows='5' className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary-500 focus:border-primary-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'></textarea>
        </div>
        <Button type='submit' variant='primary' fullWidth disabled={createMutation.isPending} className='sm:w-auto'>
          {createMutation.isPending ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
      {error && <div className='mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-center'>{error}</div>}
      {success && <div className='mt-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-center'>{success}</div>}
    </div>
  )
}

export default ContributePost