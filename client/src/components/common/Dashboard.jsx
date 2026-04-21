import React from 'react'

const Dashboard = ({ title, stats }) => {
  return (
    <>
      <h2 className='text-2xl font-bold mb-6'>{title}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        {stats.map((stat, i) => (
          <div key={i} className='bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm'>
            <h3 className='text-base sm:text-lg font-semibold'>{stat.label}</h3>
            <p className='text-2xl sm:text-3xl font-bold text-primary-600'>{stat.value}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Dashboard
