import API from './axios'

export const createPost = (formData) => API.post('/posts', formData)
export const getAllPosts = () => API.get('/posts')
export const getPosts = ({ page, limit } = {}) => API.get('/posts/paginated', { params: { page, limit } })
export const getPostBySlug = (slug) => API.get(`/posts/${slug}`)
export const getRelatedPosts = (postId, categoryId) => API.get(`/posts/related/${postId}/${categoryId}`)
export const updatePost = (slug, formData) => API.put(`/posts/${slug}`, formData)
export const deletePost = (slug) => API.delete(`/posts/${slug}`)
export const filterPosts = (params) => API.get('/posts/filter', { params })