import bcrypt from 'bcrypt'
import { pool } from '../db.js'
import { createAccesToken } from '../libs/jwt.js'

// md5 es un algoritmo de encriptado que se usa para poder generar un hash unico similar al bcrypt, uso este porque es lo que usa gravatar
import md5 from 'md5'

export const signin = async (req, res) => {
  const { email, password } = req.body

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ])

  if (result.rowCount === 0) {
    return res.status(400).json({ message: 'El correo no esta registrado' })
  }

  // comparo las contraseñas para ver si coinciden
  const validPassword = await bcrypt.compare(password, result.rows[0].password)

  if (!validPassword) {
    return res.status(400).json({ message: 'La contraseña es incorrecta' })
  }

  // genero un token
  const token = await createAccesToken({ id: result.rows[0].id })

  // enviamos al front en la cookie mediante la res
  res.cookie('token', token, {
    httpOnly: true,
    // secure: true
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
  })

  return res.json(result.rows[0])
}

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body
  // console.log(name, email, password)

  try {
    // mediante la libreria bcrypt encripto la password, y la guardamos encriptada en la base de datos por seguridad
    const hashedPassword = await bcrypt.hash(password, 10)
    // console.log(hashedPassword)

    // para generar la imagen con gravatar
    const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`

    const result = await pool.query(
      'INSERT INTO users(name, email, password, gravatar) VALUES($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, gravatar]
    )
    // el RETURNING * retorna los datos y los obtengo del result.rows[0]

    // esto nos sirve para autenticar al usuario y comunicar el backend y frontend mediante el token para permitirle acceso, lo enviamos mediante cookies
    // generamos el token, en este caso solo estamos guardando el id en el token
    const token = await createAccesToken({ id: result.rows[0].id })

    // al token lo guardamos en una cookie y le facilitamos al frontedn guardarlo el mismo con otro metodo, si lo espablecemos en un cookie el navegador lo guarda de forma automatica y es sencilla de establecerlo
    // cookies
    // le paso el nombre y lo que quiero guardar
    // en cualquier cliente rest podemos ver las cabeceras (headers) y aca veremos la cookie
    // mando la cookie a cualquier ruta que yo quiera cuidar para que entren usuarios autenticados
    res.cookie('token', token, {
      // para que solo se pueda recibir mediante protocolo http y no mediante js
      httpOnly: true,

      // para que solo se lea si esta en https
      // secure: true,

      // para que el navegador etablezca la cookie si el backend y el frontend estan en distintos host
      sameSite: 'none',

      // fecha limite de cuanto durara la cookie (en este caso 1 dia)
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.json(result.rows[0])
    // return res.json({ token: token })
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'El email ya esta registrado' })
    }
    next(error)
  }
}

export const signout = (req, res) => {
  res.clearCookie('token')
  res.sendStatus(200)
}

export const profile = async (req, res) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [
    req.userId,
  ])
  return res.json(result.rows[0])
}
