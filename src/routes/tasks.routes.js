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

import { validateSchema } from '../middlewares/validate.middleware.js'

import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema.js'

const router = Router()

router.get('/tasks', isAuth, getAllTasks)

router.get('/tasks/:id', isAuth, getTask)

router.post('/tasks', isAuth, validateSchema(createTaskSchema), createTask)

router.put('/tasks/:id', isAuth, validateSchema(updateTaskSchema), updateTask)

router.delete('/tasks/:id', isAuth, deleteTask)

export default router
