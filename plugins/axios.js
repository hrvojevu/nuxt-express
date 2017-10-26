import * as axios from 'axios'

export default axios.create({
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api`,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
})
