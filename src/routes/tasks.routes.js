// para no escribir siempre el try catch, uso el paquete que instale "express-promise-router"

import Router from 'express-promise-router'
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from '../controllers/tasks.controller.js'

// usamos el middleware para verificar que el usuario esta autenticado y luego sigue con las demas rutas
import { isAuth } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/tasks', isAuth, getAllTasks)

router.get('/tasks/:id', isAuth, getTask)

router.post('/tasks', isAuth, createTask)

router.put('/tasks/:id', isAuth, updateTask)

router.delete('/tasks/:id', isAuth, deleteTask)

export default router
