import { useAuth } from '../context/AuthContext'

const ProfilePage = () => {
  const { user } = useAuth()

  return <div>{JSON.stringify(user, null, 2)}</div>
}

export default ProfilePage
