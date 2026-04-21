import React, { useEffect, useState } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../context/AuthProvider'

const Auth = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSecretKey, setShowSecretKey] = useState(false)
  const [searchParams] = useSearchParams()
  const isLogin = searchParams.get('mode') === 'login'
  const [error, setError] = useState('')
  const { login, register, user, isLoggingIn, isRegistering } = useAuth()
  const navigate = useNavigate()
  const isSubmitting = isLoggingIn || isRegistering

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }

        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }

        if (formData.secretKey) userData.secretKey = formData.secretKey

        await register(userData)
      } else {
        await login({
          email: formData.email,
          password: formData.password
        })
      }
      navigate('/')
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      secretKey: ''
    })
    setError('')
  }, [isLogin])

  if (user) return <Navigate to='/' replace />

  return (
    <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4'>
      <div className='max-w-sm w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>{isLogin ? 'Sign In' : 'Create Account'}</h2>

        {error && <div className='mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm text-center'>{error}</div>}

        <form onSubmit={handleSubmit} className='space-y-4'>
          {!isLogin && (
            <Input label='Full Name' id='name' name='name' type='text' placeholder='Enter your full name' value={formData.name} onChange={handleChange} required />
          )}
          <Input label='Email' id='email' name='email' type='email' placeholder='Enter your email' value={formData.email} onChange={handleChange} required />
          <div className='relative'>
            <Input label='Password' id='password' name='password' type={showPassword ? 'text' : 'password'} placeholder='Enter your password' value={formData.password} onChange={handleChange} required />
            <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300'>
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          {!isLogin && (
            <>
              <div className='relative'>
                <Input label='Confirm Password' id='confirmPassword' name='confirmPassword' type={showConfirmPassword ? 'text' : 'password'} placeholder='Enter the same password' value={formData.confirmPassword} onChange={handleChange} required />
                <button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300'>
                  {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              <div className='relative'>
                <label htmlFor='secretKey' className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 inline-block'>
                  Secret Key <span className='text-gray-500'>(optional, for admin)</span>
                </label>
                <Input id='secretKey' name='secretKey' type={showSecretKey ? 'text' : 'password'} placeholder='Enter secret key' value={formData.secretKey} onChange={handleChange} />
                <button type='button' onClick={() => setShowSecretKey(!showSecretKey)} className='absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300'>
                  {showSecretKey ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </>
          )}
          <Button type='submit' variant='primary' fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <p className='mt-4 text-center text-sm text-gray-600 dark:text-gray-400'>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <Link to={isLogin ? '/auth?mode=signup' : '/auth?mode=login'} className='text-primary-600 hover:underline dark:text-primary-400'>
            {isLogin ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Auth
