import { Button, Card, Container, Input, Label } from '../components/ui'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { signup, errors: signupErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)

    // CON AXIOS
    const user = await signup(data)
    if (user) {
      navigate('/profile')
    }

    // CON FETCH (usaremos Axios)
    // const response = await fetch('http://localhost:3000/api/signup', {
    //   method: 'POST',
    //   credentials: 'include',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'content-type': 'application/json',
    //     'Acces-Control-Allow-Credentials': true,
    //   },
    // })
    // const dataSignup = await response.json()
    // console.log(dataSignup)
  })

  // console.log(errors)

  return (
    <Container className='h-[calc(100vh-10rem)] flex items-center justify-center'>
      <Card>
        {signupErrors &&
          signupErrors.map((err) => (
            <p key={err} className='text-red-500 text-center'>
              {err}
            </p>
          ))}

        <h3 className='text-2xl font-bold'>Register</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor='name'>Name</Label>
          <Input
            placeholder='Enter your name'
            {...register('name', { required: true })}
          />
          {errors.name && <p className='text-red-500'>Name is required</p>}
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            placeholder='Enter your email'
            {...register('email', { required: true })}
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            placeholder='Enter your password'
            {...register('password', { required: true })}
          />
          {errors.password && (
            <p className='text-red-500'>Password is required</p>
          )}
          <Button>Register</Button>

          <div className='flex justify-between my-4'>
            <p>Already have an account?</p>
            <Link to='/login' className='font-bold ml-1'>
              Login
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  )
}

export default RegisterPage
