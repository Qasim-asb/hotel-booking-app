import React from 'react'
import { Link } from 'react-router-dom'

const ThankYou = () => {
  return (
    <div className='container-custom py-16 text-center'>
      <div className='max-w-md mx-auto'>
        <div className='text-6xl mb-4'>🎉</div>
        <h1 className='text-3xl font-bold mb-4'>Thank You!</h1>
        <p className='text-gray-600 dark:text-gray-400 mb-8'>Your booking has been confirmed. A confirmation email has been sent.</p>
        <Link to='/' className='bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900'>Back to Home</Link>
      </div>
    </div>
  )
}

export default ThankYou