import React, { useState } from 'react'
import Button from '../ui/Button'
import HotelCard from '../ui/HotelCard'
import Spinner from '../common/Spinner'
import { usePosts } from '../../hooks/usePosts'

const Hotels = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isPending } = usePosts(currentPage)

  if (isPending) return <Spinner className=' min-h-full' />

  const hotels = data?.posts || []
  const totalPages = data?.totalPages

  return (
    <section className='container-custom py-12'>
      <h2 className='section-title'>Popular Hotels</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16'>
        {hotels.map(hotel => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>

      {totalPages > 0 && (
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-8'>
          <div className='text-sm text-gray-600 dark:text-gray-400'>
            Page {currentPage} of {totalPages}
          </div>
          <div className='flex gap-2'>
            {currentPage > 1 && <Button variant='outline' onClick={() => setCurrentPage(p => p - 1)} className='focus-visible:ring-offset-gray-50'>Previous</Button>}
            {currentPage < totalPages && <Button variant='outline' onClick={() => setCurrentPage(p => p + 1)} className='focus-visible:ring-offset-gray-50'>Next</Button>}
          </div>
        </div>
      )}
      {totalPages === 0 && <p className='text-center text-gray-500 mt-4'>No hotels to display</p>}
    </section>
  )
}

export default Hotels
