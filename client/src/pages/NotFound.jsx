import React, { useEffect } from 'react'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  const canGoBack = window.history.length > 1

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/', { replace: true })
    }
  }

  useEffect(() => {
    if (window.history.length === 1) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true })
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className='container-custom py-16 text-center'>
      <div className='max-w-md mx-auto'>
        <div className='text-7xl mb-4'>🔍</div>
        <h1 className='text-4xl font-bold mb-4'>404</h1>
        <h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
        <p className='text-gray-600 dark:text-gray-400 mb-4'>
          The page you are looking for does not exist or has been moved.
        </p>
        <p className='text-sm text-gray-500 mb-8'>
          You will be redirected to the homepage in 3 seconds...
        </p>

        <Button variant='primary' onClick={handleGoBack}>
          {canGoBack ? 'Go Back' : 'Back to Home'}
        </Button>
      </div>
    </div>
  )
}

export default NotFound