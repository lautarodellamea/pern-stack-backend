import { createContext, useState, useContext, useEffect } from 'react'
import Cookie from 'js-cookie'
import axios from '../api/axios'

export const AuthContext = createContext()

// creo un hook personalizado para no tener que estar importando el contexto todo el tiempo en c/componente
export const useAuth = () => {
  const context = useContext(AuthContext)

  // este error se disparar en el caso de llamar el contexto desde cualquier pagina y toda mi aplicacion no esta dentro de un AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [errors, setErrors] = useState(null)

  const signup = async (data) => {
    try {
      // CON AXIOS
      const res = await axios.post('/signup', data)
      // console.log(res.data)
      setUser(res.data)
      setIsAuth(true)
      return res.data
    } catch (error) {
      // manejamos asi el error ya que aveces viene un objeto y aveces yb arreglo
      // console.log(error)

      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }

      setErrors([error.response.data.message])
    }
  }

  const signin = async (data) => {
    try {
      const res = await axios.post('/signin', data, {
        withCredentials: true,
      })
      // console.log(res.data)
      setUser(res.data)
      setIsAuth(true)
      return res.data
    } catch (error) {
      // manejamos asi el error ya que aveces viene un objeto y aveces yb arreglo
      // console.log(error)

      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }

      setErrors([error.response.data.message])
    }
  }

  useEffect(() => {
    // el modulo o libreria js-cookie me permite acceder y leer las cookies
    // console.log(Cookie.get('token'))
    if (Cookie.get('token')) {
      axios
        .get('/profile')
        .then((res) => {
          // console.log(res.data)
          setUser(res.data)
          setIsAuth(true)
        })
        .catch((err) => {
          // console.log(err)
          setUser(null)
          setIsAuth(false)
        })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuth, errors, signup, signin }}>
      {children}
    </AuthContext.Provider>
  )
}
