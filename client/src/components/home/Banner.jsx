import React, { useState } from 'react'
import bannerImage from '../../assets/images/banner/Rectangle.png'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`)
    } else {
      navigate('/search')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className='bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className='container-custom py-12 md:py-16'>
        <div className='max-w-3xl mx-auto text-center'>
          <h1 className='text-3xl md:text-4xl text-white font-bold mb-3'>Find Your Perfect Stay</h1>
          <p className='text-base md:text-lg text-primary-100 mb-6'>Discover hotels, resorts, and more at the best prices</p>

          <div className='bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg flex flex-col sm:flex-row gap-2 items-center'>
            <div className='flex-1 w-full'>
              <Input type='text' placeholder='Where are you going?' value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={handleKeyPress} className='h-12' />
            </div>
            <Button variant='primary' fullWidth onClick={handleSearch} className='h-12 px-6 whitespace-nowrap sm:w-auto'>Search</Button>
          </div>

          <p className='text-xs text-primary-100 mt-4'>Popular: Paris, Tokyo, New York, Sydney</p>
        </div>
      </div>
    </div>
  )
}

export default Banner