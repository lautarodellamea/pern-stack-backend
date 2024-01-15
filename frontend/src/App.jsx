import { Routes, Route, Outlet } from 'react-router-dom'

import { useAuth } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'

import Navbar from './components/navbar/Navbar'
import { Container } from './components/ui'
import { ProtectedRoute } from './components/ProtectedRoute'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TasksPage from './pages/TasksPage'
import TaskFormPage from './pages/TaskFormPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const { isAuth, loading } = useAuth()
  // console.log(isAuth)

  if (loading) return <h1>Cargando...</h1>
  return (
    <>
      <Navbar />

      <Container className='py-5'>
        <Routes>
          <Route
            element={<ProtectedRoute isAllawed={!isAuth} redirectTo='/tasks' />}
          >
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>

          <Route
            element={<ProtectedRoute isAllawed={isAuth} redirectTo='/login' />}
          >
            <Route
              element={
                <TaskProvider>
                  <Outlet />
                </TaskProvider>
              }
            >
              <Route path='/tasks' element={<TasksPage />} />
              <Route path='/tasks/new' element={<TaskFormPage />} />
              <Route path='/tasks/:id/edit' element={<TaskFormPage />} />
            </Route>

            <Route path='/profile' element={<ProfilePage />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
