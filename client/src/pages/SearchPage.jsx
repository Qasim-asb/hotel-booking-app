import React, { useEffect, useRef, useState } from 'react'
import FilterSidebar from '../components/search/FilterSidebar'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { Link, useSearchParams } from 'react-router-dom'
import { useInfiniteFilteredPosts } from '../hooks/useInfiniteFilteredPosts'
import Spinner from '../components/common/Spinner'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const urlKeyword = searchParams.get('keyword') || ''
  const [filters, setFilters] = useState({ keyword: urlKeyword })

  useEffect(() => {
    setFilters(prev => ({ ...prev, keyword: urlKeyword }))
  }, [urlKeyword])

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteFilteredPosts(filters)

  const hotels = data?.pages.flatMap(page => page.posts) || []

  const loadMoreRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const first = entries[0]

      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }, { rootMargin: '200px' })

    const current = loadMoreRef.current

    if (current) observer.observe(current)

    return () => { if (current) observer.unobserve(current) }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className='container-custom py-8'>
      <div className='flex flex-col lg:flex-row gap-8'>
        <aside className='lg:w-1/4'>
          <FilterSidebar setFilters={setFilters} initialKeyword={urlKeyword} />
        </aside>
        <main className='lg:w-3/4'>
          <h1 className='text-2xl font-bold mb-6'>
            {urlKeyword ? `Search results for "${urlKeyword}"` : 'Search Results'}
          </h1>
          {isLoading && <Spinner className='min-h-full' />}
          {!isLoading && hotels.length === 0 && <p className='mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm text-center'>No hotels found.</p>}
          <div className='space-y-4'>
            {hotels.map(hotel => (
              <Card key={hotel._id} className='flex flex-col md:flex-row overflow-hidden'>
                <img src={hotel.images[0]?.url} alt={hotel.title} className='w-full md:w-48 h-48 object-cover' />
                <div className='p-4 flex-1'>
                  <div className='flex justify-between items-start gap-6'>
                    <h3 className='font-semibold text-lg'>{hotel.title}</h3>
                    <Badge variant='primary'>${hotel.price}/night</Badge>
                  </div>
                  <p className='text-gray-600 dark:text-gray-400'>{hotel.hotelLocation}</p>
                  <Link to={`/hotel/${hotel.slug}`} className='inline-block px-3 py-1.5 text-sm font-medium border rounded border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 mt-4'>
                    View Details
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div ref={loadMoreRef} className='h-10' />
          {isFetchingNextPage && <Spinner className='min-h-full' />}
        </main>
      </div>
    </div>
  )
}

export default SearchPage