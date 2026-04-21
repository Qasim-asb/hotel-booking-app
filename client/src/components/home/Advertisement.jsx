import React from 'react'
import backgroundImage from '../../assets/images/advertisement/Rectangle 18.png'
import smartphoneImage from '../../assets/images/advertisement/Isolated_right_hand_with_smartphone 2.png'
import Button from '../ui/Button'

const Advertisement = () => {
  return (
    <div className='relative bg-cover bg-center bg-no-repeat overflow-hidden' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='absolute inset-0 bg-black/50 dark:bg-black/70' />

      <div className='relative container-custom py-12 md:py-16'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
          <div className='text-center md:text-left text-white'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-pretty'>Download the mobile application for bonus coupons and travel codes</h2>
            <Button variant='primary' size='lg' className='focus-visible:ring-offset-gray-900'>Download mobile app</Button>
          </div>

          <div className='flex justify-center md:justify-end'>
            <img src={smartphoneImage} alt='Smartphone showing app' className='max-w-full h-auto object-contain drop-shadow-2xl' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advertisement