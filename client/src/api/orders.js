import API from './axios'

export const createOrder = () => API.post('/orders')
export const getUserOrders = () => API.get('/orders')