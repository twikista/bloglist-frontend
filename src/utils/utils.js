import blogService from '../services/blogs'
export const setInitialAuthState = () => {
  const user = localStorage.user
    ? JSON.parse(localStorage.getItem('user'))
    : null
  if (user) blogService.setToken(user.token)
  return { user }
}
