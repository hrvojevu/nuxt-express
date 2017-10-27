import * as axios from 'axios'

export default axios.create({
  baseURL: `${process.env.BASE_URL}/api`,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
})
