import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Container, Input, Label } from '../components/ui'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const { register, handleSubmit } = useForm()

  const { signin, errors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data)
    const user = await signin(data)

    if (user) {
      navigate('/profile')
    }
  })
  return (
    <Container className='h-[calc(100vh-10rem)] flex justify-center items-center'>
      <Card>
        {/* {JSON.stringify(errors)} */}

        {errors &&
          errors.map((err) => (
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
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            placeholder='password'
            {...register('password', { required: true })}
          />
          <Button>Sign in</Button>

          <div className='flex justify-between my-4'>
            <p>Don't have an account? </p>
            <Link to='/register' className='font-bold ml-1'>
              Register
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  )
}

export default LoginPage
