import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Container, Input, Label } from '../components/ui'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { signin, errors: loginErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data)
    const user = await signin(data)

    if (user) {
      navigate('/tasks')
    }
  })
  return (
    <Container className='h-[calc(100vh-10rem)] flex justify-center items-center'>
      <Card>
        {/* {JSON.stringify(errors)} */}

        {loginErrors &&
          loginErrors.map((err) => (
            <p key={err} className='text-red-500 text-center'>
              {err}
            </p>
          ))}
        <h1 className='text-4xl font-bold my-2 text-center'>Sign in</h1>
        <form onSubmit={onSubmit}>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            placeholder='Email'
            {...register('email', { required: true })}
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            placeholder='password'
            autoComplete='current-password'
            {...register('password', { required: true })}
          />
          {errors.password && (
            <p className='text-red-500'>Password is required</p>
          )}
          <Button>Sign in</Button>

          <div className='flex justify-between my-4'>
            <p className='mr-4'>Don't have an account? </p>
            <Link to='/register' className='font-bold '>
              Register
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  )
}

export default LoginPage
