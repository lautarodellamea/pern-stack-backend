import jwt from 'jsonwebtoken'

// con este middleware comprobamos si el token existe o no
// es decir si el usuario esta autenticado o no
export const isAuth = (req, res, next) => {
  // esto lo puedo hacer gracias al cookieParser, express solo lee las cabeceras, yo deberia tratar ese string de la cookie y separarlo y bla bla
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'No estas autorizado' })
  }

  // si tiene el token es decir si existe y esta autenticado, lo obtenemos
  // paso el mismo secret de jwt "xyz123"
  // decoded me da el token decodificado
  jwt.verify(token, 'xyz123', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'No estas autorizado' })

    // ya que todos pueden acceder al req, guardo aca el id para no estar extrayendolo a cada rato
    req.userId = decoded.id

    // console.log(decoded)
    next()
  })
}
