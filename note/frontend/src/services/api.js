import axios from 'axios'

const api = axios.create({
  baseURL: '/', // frontend will call relative endpoints; configure a proxy in dev or update this URL
  headers: { 'Accept': 'application/json' },
})

export default api
