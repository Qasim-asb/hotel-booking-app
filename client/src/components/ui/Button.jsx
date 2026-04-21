import React from 'react'

const baseClasses = 'rounded font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus-visible:ring-primary-500',
  secondary: 'text-gray-800 dark:text-gray-200 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 focus-visible:ring-gray-500',
  danger: 'text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 focus-visible:ring-red-500',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 focus-visible:ring-gray-400',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
}

const Button = ({ children, variant = 'primary', size = 'md', fullWidth = false, className = '', ...props }) => {

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button