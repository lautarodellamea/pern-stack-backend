import axios from './axios'

export const createTaskRequest = (task) => axios.post('/tasks', task)
export const getAllTaskRequest = () => axios.get('/tasks')
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`)
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`)
export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task)
