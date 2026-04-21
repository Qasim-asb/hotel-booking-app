import API from './axios'

export const register = (userData) => API.post('/users/register', userData)
export const login = (credentials) => API.post('/users/login', credentials)
export const logout = () => API.post('/users/logout')
export const checkAuth = () => API.get('/users/me')