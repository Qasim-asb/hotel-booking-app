import React, { memo, useEffect, useRef, useState } from 'react'
import Card from './Card'
import Badge from './Badge'
import { Link } from 'react-router-dom'
import { subscribe } from '../../utils/useGlobalTicker'

const useIsVisible = () => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0, rootMargin: '200px' })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, isVisible]
}

const HotelCard = ({ hotel }) => {
  const [ref, isVisible] = useIsVisible()
  const imgRef = useRef(null)
  const indexRef = useRef(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef(0)

  const images = hotel.images
  const length = images.length

  useEffect(() => {
    if (!isVisible || isHovered) return

    const unsubscribe = subscribe(() => {
      indexRef.current = (indexRef.current + 1) % length
      if (imgRef.current) imgRef.current.src = images[indexRef.current].url
    })

    return unsubscribe
  }, [isVisible, isHovered, images])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX

    if (Math.abs(diff) < 50) return

    if (diff > 0) {
      indexRef.current = (indexRef.current + 1) % length
    } else {
      indexRef.current = (indexRef.current - 1 + length) % length
    }

    if (imgRef.current) imgRef.current.src = images[indexRef.current].url
  }

  return (
    <Card ref={ref} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className='dark:hover:shadow-gray-800'>
      <div className='relative w-full h-56'>
        <img ref={imgRef} src={images[0].url} alt={hotel.title} className='w-full h-full object-cover rounded-t-lg' loading='lazy' />
      </div>
      <div className='p-4'>
        <h3 className='font-semibold text-lg mb-2'>{hotel.title}</h3>
        <p className='text-gray-600 dark:text-gray-400 text-sm mb-3'>{hotel.hotelLocation}</p>
        <div className='flex items-center justify-between mt-6'>
          <Badge variant='primary'>${hotel.price}/night</Badge>
          <Link to={`/hotel/${hotel.slug}`} className='text-primary-600 hover:underline text-sm font-medium'>
            View Details →
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default memo(HotelCard)