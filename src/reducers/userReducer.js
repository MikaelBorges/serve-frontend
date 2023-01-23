import { LOGIN_USER_ACTION, LOGOUT_USER_ACTION } from '../actions/user/user-types'

const initState = {
  isLogged: false,
  info : {}
}

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER_ACTION :
      return {
        isLogged: true,
        info : { ...action.payload }
      }
    break

    case LOGOUT_USER_ACTION :
      return initState
    break

    default:
      return state
    break
  }
}

export default UserReducer
