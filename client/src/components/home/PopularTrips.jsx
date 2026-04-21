import { trips } from '../../data/trips'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

const PopularTrips = () => {
  return (
    <section className='bg-gray-100 dark:bg-gray-800'>
      <div className='container-custom py-12'>
        <h2 className='section-title'>Popular Trips</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {trips.map((trip, i) => (
            <Card key={trip.id} className={`dark:bg-gray-900 dark:hover:shadow-gray-900 ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
              <img src={trip.image} alt={trip.name} className='w-full h-56 object-cover' />
              <div className='p-4'>
                <div className='flex justify-between items-start'>
                  <h3 className='font-semibold text-lg'>{trip.name}</h3>
                  <Badge variant='primary'>${trip.price}</Badge>
                </div>
                <p className='text-gray-600 dark:text-gray-400 text-sm mt-1'>{trip.location}</p>
                <p className='mt-2 text-sm'>{trip.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularTrips