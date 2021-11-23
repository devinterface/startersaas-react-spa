import axios from 'axios'
import Storage from './storage'
import { API_URL, JWT_TOKEN } from 'config'

// const formatErrors = (error) => {
//   let msg = '<ul>'
//   let err = ''
//   if (error.message !== undefined) {
//     err = error.message
//   } else {
//     err = error
//   }
//   msg += `<li>${err}</li>`
//   msg += '</ul>'
//   return msg
// }

// const handleError = (error) => {
//   switch (error.response.status) {
//     case 404:
//       miniToastr.warn(formatErrors(error.response.data), 'Request failed')
//       break
//     case 401:
//       ConfirmAlert.error(formatErrors(error.response.data), 'Unauthorized')
//       break
//     case 403:
//       ConfirmAlert.error(formatErrors(error.response.data), 'Forbidden')
//       break
//     case 422:
//       miniToastr.warn(formatErrors(error.response.data), 'Unprocessable Entity')
//       break
//     case 500:
//       ConfirmAlert.error(formatErrors(error.response.data), 'Internal Server Error')
//       break
//     default:
//       ConfirmAlert.error(formatErrors(error.response.data), 'Unknown Error')
//   }
// }

class Axios {
  constructor () {
    this.instance = axios.create({
      baseURL: API_URL,
      timeout: 4 * 60 * 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      // if (error.response) {
      //   handleError(error)
      // } else if (error.request) {
      // } else {
      // }
      return Promise.reject(error)
    })
  }

  base () {
    return this.instance
  }

  authenticated () {
    this.instance.defaults.headers.common.Authorization = `Bearer ${Storage.getItem(JWT_TOKEN)}`
    return this.instance
  }
}

export default new Axios()
