import http from '../utils/http'

export const loginAdminAccount = (body) => http.post('/admin/auth/admins/login', body)
export const logoutAccount = () => http.post('/admin/auth/admins/logout')
export const getAdminProfile = () => http.get('/admin/auth/admins/me')
