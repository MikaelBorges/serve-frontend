import { LOGIN_USER_ACTION, LOGOUT_USER_ACTION } from './user-types'

export const loginUserAction = (user) => {
  console.warn('(USER ACTION) user', user)
  return function(dispatch) {
    dispatch({
      type: LOGIN_USER_ACTION,
      payload: user
    })
  }
}

export const logoutUserAction = () => {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_USER_ACTION,
      payload: null
    })
  }
}
