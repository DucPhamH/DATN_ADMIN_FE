import http from '../utils/http'

export const getAllUserAdmin = (params) => http.get('/admin', { params })
export const getUserAdminById = (id) => http.get(`/admin/${id}`)
export const deleteUserAdmin = (id) => http.delete(`/admin/${id}`)
export const banUserAdmin = (body) => http.put(`/admin/ban`, body)
export const unbanUserAdmin = (body) => http.put(`/admin/unban`, body)
export const createUserAdmin = (body) => http.post(`/admin/create-user`, body)
export const getAllRequestToChef = (params) => http.get(`/admin/request/upgrade-to-chef`, { params })
export const acceptRequestToChef = (body) => http.put(`/admin/request/accept-upgrade-to-chef`, body)
export const rejectRequestToChef = (body) => http.put(`/admin/request/reject-upgrade-to-chef`, body)
export const dashboard = () => http.get(`/admin/home/dashboard`)
