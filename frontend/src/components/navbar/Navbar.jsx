import { twMerge } from 'tailwind-merge'
import { Link, useLocation } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './navigation'
import { Container } from '../ui/Container'
import { useAuth } from '../../context/AuthContext'
import { BiLogOut } from 'react-icons/bi'

const Navbar = () => {
  const location = useLocation()
  const { isAuth, signout, user } = useAuth()

  return (
    <nav className='bg-zinc-950 '>
      <Container className='flex justify-between py-3'>
        <Link to='/'>
          <h1 className='font-bold text-2xl'>PERN Tasks</h1>
        </Link>

        <ul className='flex items-center justify-center md:gap-x-1'>
          {isAuth ? (
            <>
              {privateRoutes.map((item) => (
                <li key={item.name}>
                  <Link
                    className={twMerge(
                      'text-slate-30 flex items-center px-3 py-1 gap-x-1',
                      location.pathname === item.path && 'bg-sky-500 px-3 py-1'
                    )}
                    to={item.path}
                  >
                    {item.icon}
                    <span className='hidden sm:block'>{item.name}</span>
                  </Link>
                </li>
              ))}
              <li
                className={
                  'text-slate-30 flex items-center px-3 py-1 hover:cursor-pointer'
                }
                onClick={() => {
                  signout()
                }}
              >
                <BiLogOut className='w-5 h-5' />
                <span className='hidden sm:block'>Logout</span>
              </li>
              <li className='flex gap-x-1 items-center justify-center'>
                <img
                  src={user.gravatar}
                  alt=''
                  className='h-8 w-8 rounded-full'
                />
                <span className='font-medium'>{user.name}</span>
              </li>
            </>
          ) : (
            publicRoutes.map((item) => (
              <li
                className={twMerge(
                  'text-slate-300 flex items-center px-3 py-1',
                  location.pathname === item.path && 'bg-sky-500 px-3 py-1'
                )}
                key={item.name}
              >
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))
          )}
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar
