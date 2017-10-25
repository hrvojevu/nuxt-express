import * as axios from 'axios'

export default axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
})
