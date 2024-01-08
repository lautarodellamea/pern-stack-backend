import { Link, useLocation } from 'react-router-dom'
import { navigation } from './navigation'
import { Container } from '../ui/Container'

const Navbar = () => {
  const location = useLocation()
  console.log(location)

  return (
    <nav className='bg-zinc-950 '>
      <Container className='flex justify-between py-3'>
        <Link to='/'>
          <h1 className='font-bold text-2xl'>PERN Tasks</h1>
        </Link>

        <ul className='flex gap-x-2 items-center'>
          {navigation.map((item) => (
            <li
              className={`text-slate-300 ${
                location.pathname === item.path && 'bg-sky-500 px-3 py-1'
              }`}
              key={item.name}
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar
