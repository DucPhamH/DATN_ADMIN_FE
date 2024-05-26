import http from '../utils/http'

// export const getAllUserAdmin = (params) => http.get('/admin', { params })
export const getReportPost = (params) => http.get('/inspectors/post-reports', { params })
export const getReportPostDetail = (id) => http.get(`/inspectors/post-reports/${id}`)
export const acceptReportPost = (id) => http.put(`/inspectors/post-accept/${id}`)
export const rejectReportPost = (id, body) => http.put(`/inspectors/post-reject/${id}`, body)

export const getBlogsForInspector = (params) => http.get('/inspectors/blogs', { params })
export const getBlogDetailForInspector = (id) => http.get(`/inspectors/blogs/${id}`)
export const acceptBlog = (id) => http.put(`/inspectors/accept-blog/${id}`)
export const rejectBlog = (id) => http.put(`/inspectors/reject-blog/${id}`)

export const getRecipesForInspector = (params) => http.get('/inspectors/recipes', { params })
export const getRecipeDetailForInspector = (id) => http.get(`/inspectors/recipes/${id}`)
export const acceptRecipe = (id) => http.put(`/inspectors/accept-recipe/${id}`)
export const rejectRecipe = (id) => http.put(`/inspectors/reject-recipe/${id}`)

export const getAlbumsForInspector = (params) => http.get('/inspectors/albums', { params })
export const getAlbumDetailForInspector = (id) => http.get(`/inspectors/albums/${id}`)
export const acceptAlbum = (id) => http.put(`/inspectors/accept-album/${id}`)
export const rejectAlbum = (id) => http.put(`/inspectors/reject-album/${id}`)
export const getRecipesInAlbum = (params) => http.get(`/inspectors/album-recipes`, { params })

export const getCategoryRecipes = () => http.get('/recipes/category/get-category')
export const getCategoryBlogs = () => http.get('/blogs/category/get-category')
