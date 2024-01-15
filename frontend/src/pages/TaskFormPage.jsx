import { Label, Textarea, Input, Card, Button } from '../components/ui'
import { useForm } from 'react-hook-form'

import { useEffect } from 'react'
import { useTasks } from '../context/TaskContext'
import { useNavigate, useParams } from 'react-router-dom'

const TaskFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const navigate = useNavigate()
  const { createTask, loadTask, errors: tasksErrors, updateTask } = useTasks()
  const params = useParams()
  // console.log(params)

  const onSubmit = handleSubmit(async (data) => {
    let task

    if (!params.id) {
      task = await createTask(data)
    } else {
      task = await updateTask(params.id, data)
    }
    if (task) {
      navigate('/tasks')
    }
  })

  useEffect(() => {
    if (params.id) {
      // console.log('editing')
      loadTask(params.id).then((task) => {
        setValue('title', task.title)
        setValue('description', task.description)
      })
    }
  }, [])

  return (
    <div className='flex h-[80vh] justify-center items-center'>
      <Card>
        {tasksErrors.map((error, i) => (
          <p key={i} className='text-red-500'>
            {error}
          </p>
        ))}
        <h2 className='text-3xl font-bold my-4'>
          {params.id ? 'Edit Taks' : 'Create Task'}
        </h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor='title'>Title</Label>
          <Input
            type='text'
            placeholder='Title'
            id='title'
            autoFocus
            {...register('title', {
              required: true,
            })}
          />
          {errors.title && (
            <span className='text-red-500'>Title is required</span>
          )}
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='description'
            placeholder='Description'
            rows={3}
            {...register('description')}
          />

          <Button>{params.id ? 'Edit Task' : 'Create Task'}</Button>
        </form>
      </Card>
    </div>
  )
}

export default TaskFormPage
