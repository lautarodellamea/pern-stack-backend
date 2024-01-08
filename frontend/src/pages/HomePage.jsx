// ahora no usamnos todo esto
// import { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'

// usamos esto
import { useAuth } from '../context/AuthContext'

const HomePage = () => {
  // const data = useContext(AuthContext)
  const data = useAuth()
  console.log(data)

  return <div>HomePage</div>
}

export default HomePage
