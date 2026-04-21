import React, { useCallback, useEffect, useRef, useState } from 'react'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { FaImage, FaTrash } from 'react-icons/fa'
import { useCategories } from '../../hooks/useCategories'
import { useCreatePost } from '../../hooks/usePostMutations'

const guestOptions = Array.from({ length: 6 }, (_, i) => {
  const n = i + 1
  return {
    value: n,
    label: `${n} ${n === 1 ? 'Guest' : 'Guests'}`
  }
})

const availabilityOptions = [
  { value: true, label: 'Available' },
  { value: false, label: 'Not Available' }
]

const getCategoryValue = opt => opt._id
const getCategoryLabel = opt => opt.category

const CreatePost = () => {
  const [form, setForm] = useState({
    title: '',
    hotelLocation: '',
    description: '',
    facilities: '',
    price: '',
    nearArea: '',
    category: '',
    guest: null,
    isAvailable: null
  })
  const [images, setImages] = useState([])
  const imagesRef = useRef(images)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [warning, setWarning] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const { data: categories = [], isLoading } = useCategories()
  const { mutate: createPostMutation, isPending } = useCreatePost()

  const setField = useCallback((name, value) => setForm(prev => ({ ...prev, [name]: value })), [])

  const handleCategoryChange = useCallback(val => setField('category', val), [setField])
  const handleGuestChange = useCallback(val => setField('guest', val), [setField])
  const handleAvailabilityChange = useCallback(val => setField('isAvailable', val), [setField])

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setField(name, value)
  }, [setField])

  const handleImageChange = useCallback((e) => {
    setError('')
    setSuccess('')
    setWarning('')

    const files = Array.from(e.target.files)

    setImages(prev => {
      const remainingSlots = 3 - prev.length

      if (remainingSlots <= 0) {
        setWarning('You can only upload up to 3 images.')
        e.target.value = ''
        return prev
      }

      const newImages = files.slice(0, remainingSlots).map(file => ({ file, preview: URL.createObjectURL(file) }))

      if (files.length > remainingSlots) {
        setWarning('Only 3 images added. Maximum 3 images allowed.')
      }

      return [...prev, ...newImages]
    })

    e.target.value = ''
  }, [])

  const handleRemoveImage = useCallback((i) => {
    setWarning('')
    setImages(prev => {
      URL.revokeObjectURL(prev[i].preview)
      return prev.filter((_, ind) => ind !== i)
    })
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setDragActive(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (!files.length) return

    setError('')
    setSuccess('')
    setWarning('')

    const imageFiles = files.filter(file => file.type.startsWith('image/'))

    if (!imageFiles.length) {
      setWarning('Only image files are allowed.')
      return
    }

    setImages(prev => {
      const remainingSlots = 3 - prev.length

      if (remainingSlots <= 0) {
        setWarning('You can only upload up to 3 images.')
        return prev
      }

      const newImages = imageFiles.slice(0, remainingSlots).map(file => ({ file, preview: URL.createObjectURL(file) }))

      if (imageFiles.length > remainingSlots) {
        setWarning('Only 3 images added. Maximum 3 images allowed.')
      }

      return [...prev, ...newImages]
    })
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setWarning('')

    if (!form.title || !form.hotelLocation || !form.description || !form.facilities || !form.price || !form.nearArea || !form.category || form.guest === null || form.isAvailable === null || !images.length) {
      setError('All fields required')
      return
    }

    if (images.length !== 3) {
      setWarning('You must upload exactly 3 images.')
      return
    }

    const facilitiesArray = form.facilities.split(',').map(f => f.trim()).filter(Boolean)
    const nearAreaArray = form.nearArea.split(',').map(n => n.trim()).filter(Boolean)

    if (!facilitiesArray.length) {
      setError('Wrong entry in Facilities')
      return
    }

    if (!nearAreaArray.length) {
      setError('Wrong entry in Near Area ')
      return
    }

    const formData = new FormData()

    formData.append('title', form.title)
    formData.append('hotelLocation', form.hotelLocation)
    formData.append('description', form.description)
    formData.append('price', form.price)
    formData.append('category', form.category)
    formData.append('guest', form.guest)
    formData.append('isAvailable', JSON.stringify(form.isAvailable))
    formData.append('facilities', JSON.stringify(facilitiesArray))
    formData.append('nearArea', JSON.stringify(nearAreaArray))
    images.forEach(img => formData.append('images', img.file))

    createPostMutation(formData, {
      onSuccess: () => {
        setSuccess('Post created successfully!')
        setForm({ title: '', hotelLocation: '', description: '', facilities: '', price: '', nearArea: '', category: '', guest: null, isAvailable: null })
        images.forEach(img => URL.revokeObjectURL(img.preview))
        setImages([])
      },
      onError: (err) => setError(err.response?.data?.message || 'Failed to create post')
    })
  }, [form, images, createPostMutation])

  useEffect(() => { imagesRef.current = images }, [images])

  useEffect(() => {
    return () => imagesRef.current.forEach(img => URL.revokeObjectURL(img.preview))
  }, [])

  return (
    <div className='sm:max-w-xl md:max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6'>Create New Hotel Post</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input label='Title' id='title' name='title' type='text' value={form.title} onChange={handleInputChange} className='bg-white dark:bg-gray-800' />
        <Input label='Hotel Location' id='hotelLocation' name='hotelLocation' type='text' value={form.hotelLocation} onChange={handleInputChange} className='bg-white dark:bg-gray-800' />
        <div>
          <label htmlFor='description' className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 inline-block'>Description</label>
          <textarea id='description' name='description' value={form.description} onChange={handleInputChange} rows='4' className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary-500 focus:border-primary-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'></textarea>
        </div>
        <Input label='Facilities (comma separated)' id='facilities' name='facilities' type='text' value={form.facilities} onChange={handleInputChange} placeholder='e.g., Free WiFi, Pool, Spa' className='bg-white dark:bg-gray-800' />
        <Input label='Price per night ($)' id='price' name='price' type='number' value={form.price} onChange={handleInputChange} min='100' max='1000' className='bg-white dark:bg-gray-800' />
        <Input label='Near Area (comma separated)' id='nearArea' name='nearArea' type='text' value={form.nearArea} onChange={handleInputChange} placeholder='e.g., Eiffel Tower, Louvre' className='bg-white dark:bg-gray-800' />
        <Select label='Category' value={form.category} onChange={handleCategoryChange} options={categories} placeholder={isLoading ? 'Loadind categories...' : 'Select a category'} getValue={getCategoryValue} getLabel={getCategoryLabel} />
        <Select label='Guests' value={form.guest} onChange={handleGuestChange} options={guestOptions} placeholder='Select number of guests' />
        <Select label='Availability' value={form.isAvailable} onChange={handleAvailabilityChange} options={availabilityOptions} placeholder='Select availability' />
        <div>
          <label className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 inline-block'>Images (Exactly 3)</label>
          <span className='text-xs text-gray-500 ml-2'>{images.length}/3 selected</span>

          <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`relative border-2 border-dashed rounded-lg transition-colors duration-200 ${dragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600'}`}>
            <label className='flex flex-col items-center py-5 rounded-lg cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-color duration-300'>
              <FaImage size={30} className='text-gray-400 mb-2' />
              <p className='mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400'>Click to upload</p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>PNG, JPG, GIF (Max 3 images)</p>
              <input type='file' accept='image/*' multiple className='hidden' onChange={handleImageChange} />
            </label>
          </div>

          {images.length > 0 && (
            <div className='mt-4'>
              <p className='text-sm font-medium mb-2'>Image Previews:</p>
              <div className='grid grid-cols-3 gap-4'>
                {images.map((image, i) => (
                  <div key={i} className='relative'>
                    <img src={image.preview} alt={`Preview ${i + 1}`} className='w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700' />
                    <button type='button' onClick={() => handleRemoveImage(i)} className='absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full'><FaTrash size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Button type='submit' variant='primary' fullWidth className='sm:w-auto' disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
      {error && <div className='mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-center'>{error}</div>}
      {success && <div className='mt-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-center'>{success}</div>}
      {warning && <div className='mt-4 p-3 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded text-center'>{warning}</div>}
    </div>
  )
}

export default CreatePost
