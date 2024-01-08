import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})

export default client

// para ahorrarme escribir toda la ruta completa siempre
// por ejemplo:
// axios.get('/profile')
