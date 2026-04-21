import React, { useEffect, useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'

const FilterSidebar = ({ setFilters, initialKeyword = '' }) => {
  const [localFilters, setLocalFilters] = useState({
    keyword: initialKeyword,
    minPrice: '',
    maxPrice: '',
    amenities: []
  })

  useEffect(() => {
    setLocalFilters(prev => ({ ...prev, keyword: initialKeyword }))
  }, [initialKeyword])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLocalFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleApply = () => {
    const params = {}
    if (localFilters.keyword) params.keyword = localFilters.keyword
    if (localFilters.minPrice) params.minPrice = localFilters.minPrice
    if (localFilters.maxPrice) params.maxPrice = localFilters.maxPrice
    if (localFilters.amenities.length) params.amenities = localFilters.amenities.join(',')
    setFilters(params)
  }

  const toggleAmenity = (amenity) => {
    setLocalFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity) ? prev.amenities.filter(a => a !== amenity) : [...prev.amenities, amenity]
    }))
  }

  return (
    <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm sticky top-20'>
      <h3 className='font-semibold text-lg mb-4'>Filters</h3>
      <div className='space-y-4'>
        <Input label='Keyword' id='keyword' name='keyword' type='text' placeholder='Search by name or description' value={localFilters.keyword} onChange={handleInputChange} />
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Price Range</label>
          <div className='flex gap-2'>
            <Input name='minPrice' type='number' placeholder='Min' value={localFilters.minPrice} onChange={handleInputChange} className='w-1/2' />
            <Input name='maxPrice' type='number' placeholder='Max' value={localFilters.maxPrice} onChange={handleInputChange} className='w-1/2' />
          </div>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Amenities</label>
          <div className='space-y-2'>
            {['WiFi', 'Pool', 'Spa', 'Restaurant'].map(item => (
              <label key={item} className='flex items-center'>
                <input type='checkbox' checked={localFilters.amenities.includes(item)} onChange={() => toggleAmenity(item)} className='mr-2' />
                <span className='text-sm'>{item}</span>
              </label>
            ))}
          </div>
        </div>
        <Button variant='primary' size='sm' fullWidth onClick={handleApply}>Apply Filters</Button>
      </div>
    </div>
  )
}

export default FilterSidebar