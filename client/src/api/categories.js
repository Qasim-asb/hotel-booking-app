import API from './axios'

export const createCategory = (category) => API.post('/categories', { category })
export const getCategories = () => API.get('/categories')
export const deleteCategory = (slug) => API.delete(`/categories/${slug}`)
export const updateCategory = (slug, category) => API.put(`/categories/${slug}`, { category })