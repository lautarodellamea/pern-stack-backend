import { pool } from '../db.js'

export const getAllTasks = async (req, res, next) => {
  // para no escribir esto mismo siempre, uso el paquete que instale "express-promise-router"
  // try {
  //   const result = await pool.query('SELECT * FROM task')
  //   console.log(result)
  //   return res.json(result.rows)
  // } catch (error) {
  //   next(error)
  // }
  // console.log(req.cookies.token)

  // vemos la cabecera y estan las cookies
  // todas las rutas tienen acceso al req y este a los hueaders, body, etc
  // console.log(req.headers)

  // de esta forma al hacer una peticion vemos quien la hace
  // console.log(req.userId)

  const result = await pool.query('SELECT * FROM task WHERE user_id = $1', [
    req.userId,
  ])
  // console.log(result)
  return res.json(result.rows)
}

export const getTask = async (req, res) => {
  const result = await pool.query(' SELECT * FROM task WHERE id = $1', [
    req.params.id,
  ])

  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'No existe una tarea con ese id' })
  }

  res.json(result.rows[0])
  // console.log(result.rows[0])
}

export const createTask = async (req, res, next) => {
  // obtenemos el titulo y descrpicion del body de la respuesta
  const { title, description } = req.body
  // console.log(title, description)

  // consulta a base de datos
  try {
    const result = await pool.query(
      'INSERT INTO task (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, req.userId]
    )
    // console.log(result)

    res.json(result.rows[0])
  } catch (error) {
    // console.log(error)
    if (error.code === '23505') {
      return res
        .status(409)
        .json({ message: 'Ya existe una tarea con ese titulo' })
    }
    next(error)
  }
}

export const updateTask = async (req, res) => {
  const id = req.params.id
  const { title, description } = req.body

  const result = await pool.query(
    'UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
    [title, description, id]
  )

  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'No existe una tarea con ese id' })
  }

  return res.json(result.rows[0])
}

export const deleteTask = async (req, res) => {
  const result = await pool.query('DELETE FROM task WHERE id = $1', [
    req.params.id,
  ])

  // console.log(result)

  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'No existe una tarea con ese id' })
  }

  return res.sendStatus(204)
}
