import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

function RequireNotAuth({ children }) {
  const token = Cookies.get('token')

  if (token) {
    return <Navigate to="/" />
  }

  return children
}

export default RequireNotAuth
