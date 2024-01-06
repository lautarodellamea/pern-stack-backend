import jwt from 'jsonwebtoken'

// transorfme una callback en una promesa ya que queda mejor al momento de usarla en otras partes del codigo con async await

// en el payload es un objeto que enviamos, correo, id, nombre, todos o uno lo que querramos, la contraseña no se envia
// el payload son los datos que voy a querer colocar dentro del token

// "xyz123" esel string que se coloca para ayudar a que el token sea seguro, se colocan mas largos, este es a modo de ejempo

// expiresIn: '1d': expira en un dia (formato de fechas vercel ms)
export const createAccesToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 'xyz123', { expiresIn: '1d' }, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

// a esta funcion yo le paso el payload y me devuelve el token, o el error si sale algo mal
