import React, { forwardRef } from 'react'

const Card = ({ children, className = '', ...props }, ref) => {

  return (
    <div ref={ref} className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg overflow-hidden transition-shadow duration-300 ${className}`} {...props}>
      {children}
    </div>
  )
}

export default forwardRef(Card)