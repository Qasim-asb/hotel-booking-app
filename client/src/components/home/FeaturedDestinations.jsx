import React from 'react'
import { destinations } from '../../data/destinations'
import Card from '../ui/Card'

const FeaturedDestinations = () => {
  return (
    <section className='container-custom py-12'>
      <h2 className='section-title'>Featured Destinations</h2>
      <div className='flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 snap-x'>
        {destinations.map(dest => (
          <Card key={dest.id} className='snap-start flex-shrink-0 dark:hover:shadow-gray-800'>
            <img src={dest.image} alt={dest.name} className='w-full h-40 object-cover' />
            <div className='p-4'>
              <h3 className='font-semibold'>{dest.name}</h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>{dest.properties} properties</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default FeaturedDestinations