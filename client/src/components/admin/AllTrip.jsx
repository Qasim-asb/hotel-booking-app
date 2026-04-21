import React, { useEffect, useState } from 'react'
import Input from '../ui/Input'
import { FaImage, FaTrash } from 'react-icons/fa'
import Button from '../ui/Button'
import ConfirmModal from '../ui/ConfirmModal'
import { useCreateTrip, useDeleteTrip, useTrips, useUpdateTrip } from '../../hooks/useTrips'
import Spinner from '../common/Spinner'

const AllTrip = () => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    price: '',
    duration: '',
    description: '',
    removeImage: false
  })
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [deleteItem, setDeleteItem] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const createMutation = useCreateTrip()
  const { data: trips = [], isLoading } = useTrips()
  const deleteMutation = useDeleteTrip()
  const updateMutation = useUpdateTrip()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (image?.file) URL.revokeObjectURL(image.preview)

    const preview = URL.createObjectURL(file)

    setImage({ file, preview })
    setForm(prev => ({ ...prev, removeImage: false }))
    e.target.value = ''
  }

  const handleRemoveImage = () => {
    if (image?.file) URL.revokeObjectURL(image.preview)
    setImage(null)
    setForm(prev => ({ ...prev, removeImage: true }))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)

    const file = e.dataTransfer.files[0]
    if (!file || !file.type.startsWith('image/')) return

    if (image?.file) URL.revokeObjectURL(image.preview)

    const preview = URL.createObjectURL(file)
    setImage({ file, preview })
    setForm(prev => ({ ...prev, removeImage: false }))
  }

  const confirmDelete = () => {
    setError('')
    setSuccess('')
    deleteMutation.mutate(deleteItem, {
      onSuccess: () => {
        setDeleteItem(null)
        setSuccess('Trip deleted successfully')
      },
      onError: (err) => {
        setDeleteItem(null)
        setError(err.response?.data?.message || 'Failed to delete trip')
      }
    })
  }

  const startEdit = (trip) => {
    setEditingId(trip._id)
    setForm({
      name: trip.name,
      location: trip.location,
      price: trip.price,
      duration: trip.duration,
      description: trip.description || '',
      removeImage: false
    })

    if (trip.image) {
      setImage({ preview: trip.image.url })
    } else {
      setImage(null)
    }
  }

  const resetForm = () => {
    setForm({ name: '', location: '', price: '', duration: '', description: '', removeImage: false })
    if (image?.file) URL.revokeObjectURL(image.preview)
    setImage(null)
    setEditingId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.name || !form.location || !form.price || !form.duration) {
      setError('Missing fields')
      return
    }

    const formData = new FormData()

    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val)
    })

    if (image?.file) formData.append('image', image.file)

    if (editingId) {
      updateMutation.mutate(
        { id: editingId, formData },
        {
          onSuccess: () => {
            setSuccess('Trip updated successfully!')
            resetForm()
          },
          onError: (err) => setError(err.response?.data?.message || 'Failed to update Trip')
        })
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          setSuccess('Trip created successfully!')
          resetForm()
        },
        onError: (err) => setError(err.response?.data?.message || 'Failed to create trip')
      })
    }
  }

  useEffect(() => {
    return () => {
      if (image?.file) URL.revokeObjectURL(image.preview)
    }
  }, [image])

  return (
    <>
      <h2 className='text-2xl font-bold mb-6'>All Trips</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input name='name' placeholder='Name' type='text' value={form.name} onChange={handleInputChange} className='bg-white dark:bg-gray-800' />
        <Input name='location' placeholder='Location' type='text' value={form.location} onChange={handleInputChange} className='bg-white dark:bg-gray-800' />
        <Input name='price' placeholder='Price' type='number' value={form.price} onChange={handleInputChange} className='bg-white dark:bg-gray-800' />
        <Input name='duration' placeholder='Duration' type='text' value={form.duration} onChange={handleInputChange} className='bg-white dark:bg-gray-800' />
        <textarea name='description' placeholder='Description' value={form.description} onChange={handleInputChange} rows='4' className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary-500 focus:border-primary-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'></textarea>

        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`relative border-2 border-dashed rounded-lg transition-colors duration-200 ${dragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600'}`}>
          <label className='flex flex-col items-center py-5 rounded-lg cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-color duration-300'>
            <FaImage size={30} className='text-gray-400 mb-2' />
            <p className='mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400'>Click or Drag & Drop</p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>PNG, JPG, GIF images</p>
            <input type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
          </label>
        </div>

        <div className='flex flex-col-reverse sm:flex-row items-center sm:justify-between gap-4'>
          <div className='w-full flex flex-wrap gap-2'>
            <Button type='submit' variant='primary' fullWidth className='sm:w-auto' disabled={createMutation.isPending || updateMutation.isPending}>
              {editingId ? (updateMutation.isPending ? 'Updating...' : 'Update trip') : (createMutation.isPending ? 'Creating...' : 'Create trip')}
            </Button>
            {editingId && <Button type='button' onClick={resetForm} variant='secondary' fullWidth className='sm:w-auto'>Cancel</Button>}
          </div>
          {image && (
            <div className='mt-4'>
              <p className='text-sm font-medium mb-2'>Image Previews:</p>
              <div className='relative'>
                <img src={image.preview} alt='preview' className='w-50 h-auto object-cover rounded-lg border border-gray-200 dark:border-gray-700' />
                <button type='button' onClick={handleRemoveImage} className='absolute -top-2 -left-2 bg-red-500 text-white p-1 rounded-full'><FaTrash size={12} /></button>
              </div>
            </div>
          )}
        </div>
      </form>
      {error && <div className='mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-center'>{error}</div>}
      {success && <div className='mt-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-center'>{success}</div>}

      {isLoading ? (
        <Spinner className=' min-h-full' />
      ) : (
        <div className='overflow-x-auto rounded-lg shadow-sm mt-6'>
          {!trips?.length ? (
            <div className='p-3 bg-red-100 text-red-700 rounded text-center'>No trips exists, create trip by filling the form</div>
          ) : (
            <table className='min-w-full bg-white dark:bg-gray-800'>
              <thead className='bg-gray-100 dark:bg-gray-700'>
                <tr>
                  {['Name', 'Location', 'Duration', 'Price', 'Actions'].map((item, i) => (
                    <th key={i} className='px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium'>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                {trips.map(trip => (
                  <tr key={trip._id}>
                    <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm'>{trip.name}</td>
                    <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm'>{trip.location}</td>
                    <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm'>{trip.duration}</td>
                    <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm'>${trip.price}</td>
                    <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm space-x-2'>
                      <button onClick={() => startEdit(trip)} className='text-primary-600 hover:underline'>Edit</button>
                      <button onClick={() => setDeleteItem(trip._id)} className='text-red-600 hover:underline'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <ConfirmModal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={confirmDelete} item='trip' loading={deleteMutation.isPending} />
    </>
  )
}

export default AllTrip