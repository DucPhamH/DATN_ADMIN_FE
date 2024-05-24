import http from '../utils/http'

// export const getAllUserAdmin = (params) => http.get('/admin', { params })
// export const createRecipe = (body) =>
//     http.post('/recipes', body, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
export const createRecipesForWritter = (body) =>
  http.post('/writters/recipes', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const createIngredientsForWritter = (body) => http.post('/writters/create-ingredient', body)
export const getCategoryRecipes = () => http.get('/recipes/category/get-category')
export const getCategoryIngredients = () => http.get('/ingredients/category')
export const getIngredients = (params) => http.get('/ingredients', { params })
export const getListRecipesForWritter = (params) => http.get('/writters/recipes', { params })
export const getRecipeDetailForWritter = (id) => http.get(`/writters/recipes/${id}`)
export const putRecipe = (id, body) =>
  http.put(`/writters/recipes/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
