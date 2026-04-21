import API from './axios'

export const createReview = (data) => API.post('/reviews', data)
export const getPostReviews = (postId) => API.get(`/reviews/post/${postId}`)
export const getPendingReviews = () => API.get('/reviews/pending')
export const approveReview = (reviewId) => API.put(`/reviews/${reviewId}/approve`)
export const deleteReview = (reviewId) => API.delete(`/reviews/${reviewId}`)