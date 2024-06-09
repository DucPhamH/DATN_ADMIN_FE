import axios from 'axios'
import { toast } from 'react-hot-toast'
import HttpStatusCode from '../constants/httpStatusCode'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import { isAxiosUnauthorizedError } from './utils'

const URL = {
  BASE_URL: 'http://localhost:4000/api',
  DEPLOY_URL: 'https://datn-be-kwjk.onrender.com/api',
  VPS_URL: 'https://cookhealthydatn.io.vn/api'
}
class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS()

    this.instance = axios.create({
      baseURL: `${URL.BASE_URL}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/admin/auth/admins/login') {
          // console.log(response.data)
          this.accessToken = response.data.result.access_token
          setAccessTokenToLS(this.accessToken)
          // console.log(response.data.result.user)
          setProfileToLS(response.data.result.user)
        } else if (url === '/admin/auth/admins/logout') {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      (error) => {
        console.log(error)
        // Chỉ toast lỗi không phải 422 và 401
        if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status)) {
          const data = error.response?.data
          console.log(data)
          const message = data.message || error.message
          toast.error(message)
        }
        if (isAxiosUnauthorizedError(error)) {
          clearLS()
          this.accessToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
