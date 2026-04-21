import React, { useState } from 'react'
import Badge from '../ui/Badge'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthProvider'
import { useAddToCart } from '../../hooks/useCart'
import { usePostReviews } from '../../hooks/usePostReviews'

const ProductDetails = ({ post }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const { user } = useAuth()
  const addToCartMutation = useAddToCart()
  const { data: reviews = [], isLoading: reviewsLoading } = usePostReviews(post._id)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const averageRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 'No ratings'
  const reviewCount = reviews.length

  const handleAddToCart = () => {
    setError('')
    setSuccess('')
    if (!user) return setError('Please login first')

    if (!selectedDate) return setError('Please select check-in date')

    addToCartMutation.mutate({
      postId: post._id,
      nights: 1,
      checkInDate: selectedDate
    }, {
      onSuccess: () => setSuccess('Added to cart'),
      onError: (err) => setError(err.response?.data?.message || 'Failed to add to cart')
    })
  }

  return (
    <div className='bg-white dark:bg-gray-900'>
      <div className='container-custom py-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div>
          <div className='grid grid-cols-2 gap-2'>
            {post.images.map((img, i) => (
              <img key={i} src={img.url} alt={`${post.title} ${i + 1}`} className={`w-full h-48 object-cover rounded-lg ${i === 0 ? 'col-span-2' : ''}`} />
            ))}
          </div>
        </div>
        <div>
          <h1 className='text-3xl font-bold mb-2'>{post.title}</h1>
          <p className='text-gray-600 dark:text-gray-400 mb-4'>{post.hotelLocation}</p>
          <div className='flex items-center mb-4'>
            <Badge variant='success'>
              {reviewsLoading ? 'Loading...' : `${averageRating} ★`}
            </Badge>
            <span className='ml-2 text-sm'>
              ({reviewsLoading ? '...' : `${reviewCount} reviews`})
            </span>
          </div>
          <p className='mb-6'>{post.description}</p>
          <div className='mb-6'>
            <h3 className='font-semibold mb-2'>Facilities</h3>
            <div className='flex flex-wrap gap-2'>
              {post.facilities.map(facility => (
                <Badge key={facility} variant='primary'>{facility}</Badge>
              ))}
            </div>
          </div>
          <div className='mb-6'>
            <h3 className='font-semibold mb-2'>Nearby</h3>
            <ul className='list-disc list-inside text-sm'>
              {post.nearArea.map(place => (
                <li key={place}>{place}</li>
              ))}
            </ul>
          </div>
          <div className='mb-6'>
            <Input label='Check-in Date' id='date' type='date' value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <span className='text-2xl font-bold'>${post.price}</span>
              <span className='text-sm text-gray-600'>/night</span>
            </div>
            <Button variant='primary' size='lg' onClick={handleAddToCart} disabled={!post.isAvailable || addToCartMutation.isPending}>
              {addToCartMutation.isPending ? 'Adding...' : (post.isAvailable ? 'Book Now' : 'Not Available')}
            </Button>
          </div>
          {error && <div className='mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-center'>{error}</div>}
          {success && <div className='mt-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-center'>{success}</div>}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
