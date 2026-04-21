import API from './axios'

export const getAllUsers = () => API.get('/users/all')
export const updateUserRole = (userId, role) => API.put(`/users/${userId}/role`, { role })