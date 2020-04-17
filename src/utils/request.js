import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

let BASE_API = "http://localhost:8080"


const service = axios.create({
  baseURL: BASE_API,
  timeout: 5000 // request timeout
})


service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)


service.interceptors.response.use(

  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 2000) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })



      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)



    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
