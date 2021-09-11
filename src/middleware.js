import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: { 'X-Custom-Header': 'foobar' },
})

instance.defaults.headers.common['x-api-key'] =
  '98a67728-d9c1-4e60-b350-0068f53810ea'

export default instance
