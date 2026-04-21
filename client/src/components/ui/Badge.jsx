import React from 'react'

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  }

  return (
    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
