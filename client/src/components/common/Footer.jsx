import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-100 dark:bg-gray-800 mt-auto'>
      <div className='container-custom py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div>
            <h3 className='font-semibold mb-4'>About</h3>
            <ul className='space-y-2 text-sm'>
              <li><a href='#' className='hover:underline'>How it works</a></li>
              <li><a href='#' className='hover:underline'>Careers</a></li>
              <li><a href='#' className='hover:underline'>Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-4'>Support</h3>
            <ul className='space-y-2 text-sm'>
              <li><a href='#' className='hover:underline'>Help Center</a></li>
              <li><a href='#' className='hover:underline'>Safety information</a></li>
              <li><a href='#' className='hover:underline'>Cancellation options</a></li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-4'>Terms</h3>
            <ul className='space-y-2 text-sm'>
              <li><a href='#' className='hover:underline'>Privacy Policy</a></li>
              <li><a href='#' className='hover:underline'>Terms of Service</a></li>
              <li><a href='#' className='hover:underline'>Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-4'>Follow us</h3>
            <div className='flex space-x-4'>
              <a href='#' className='hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 '>Facebook</a>
              <a href='#' className='hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300'>Twitter</a>
              <a href='#' className='hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300'>Instagram</a>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-300 dark:border-gray-700 mt-8 pt-4 text-center text-sm'>
          © 2025 my Dream Place. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer