import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
  // esto envia el token de forma utomatica cada vez que hacemos una peticion
  withCredentials: true,
})

export default client

// para ahorrarme escribir toda la ruta completa siempre
// por ejemplo:
// axios.get('/profile')
