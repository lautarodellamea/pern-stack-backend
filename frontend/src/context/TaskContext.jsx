import { createContext, useContext, useState } from 'react'
import {
  createTaskRequest,
  deleteTaskRequest,
  getAllTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from '../api/tasks.api'

// creo el contexto
const TaskContext = createContext()

// hook para no tener que estar importando tantas cosas al momento de usar el contexto
export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks debe estar dentro del proveedor TaskProvider')
  }

  return context
}

// creo el provider
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [errors, setErrors] = useState([])

  const loadTasks = async () => {
    const res = await getAllTaskRequest()
    setTasks(res.data)
  }

  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(id)
    if (res.status === 204) {
      setTasks(tasks.filter((task) => task.id !== id))
    }
  }

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task)
      setTasks([...tasks, res.data])
      return res.data
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message])
      }
    }
  }

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task)
      return res.data
    } catch (error) {
      setErrors([error.response.data.message])
    }
  }

  const loadTask = async (id) => {
    const res = await getTaskRequest(id)
    return res.data
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks,
        deleteTask,
        createTask,
        loadTask,
        errors,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
