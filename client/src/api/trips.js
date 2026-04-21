import API from './axios'

export const createTrip = (formData) => API.post('/trips', formData)
export const getAllTrips = () => API.get('/trips')
export const updateTrip = (id, formData) => API.put(`/trips/${id}`, formData)
export const deleteTrip = (id) => API.delete(`/trips/${id}`)