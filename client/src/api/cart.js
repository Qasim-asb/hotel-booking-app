import API from './axios'

export const addToCart = (data) => API.post('/cart', data)
export const getCart = () => API.get('/cart')
export const removeFromCart = (postId) => API.delete(`/cart/${postId}`)
export const clearCart = () => API.delete('/cart')