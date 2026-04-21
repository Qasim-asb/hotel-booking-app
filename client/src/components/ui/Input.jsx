import React from 'react'

const Input = ({ label, id, error, className = '', ...props }) => {
  return (
    <div>
      {label && <label htmlFor={id} className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 inline-block'>{label}</label>}
      <input id={id} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary-500 focus:border-primary-500 ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} ${className}`} {...props} />
      {error && <p className='mt-1 text-sm text-red-600 dark:text-red-400'>{error}</p>}
    </div>
  )
}

export default Input