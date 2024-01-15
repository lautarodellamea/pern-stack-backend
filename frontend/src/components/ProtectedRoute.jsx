import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ redirectTo, isAllawed, children }) => {
  if (!isAllawed) return <Navigate to={redirectTo} replace />
  return children ? children : <Outlet />
}
