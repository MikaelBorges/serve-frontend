import {
  LOGIN_USER_ACTION,
  LOGOUT_USER_ACTION,
  ADD_ADS_USER_ACTION,
  FAVORITE_ADD_USER_ACTION,
  UPDATE_ADS_WITH_IMAGES_ACTION
} from '../actions/user/user-types'

const initState = {
  info : {},
  isLogged: false
}

const UserReducer = (state = initState, action) => {
  switch (action.type) {

    case UPDATE_ADS_WITH_IMAGES_ACTION :
      return {
        isLogged: true,
        info : { ...action.payload }
      }
    break

    case ADD_ADS_USER_ACTION :
      return {
        isLogged: true,
        info : { ...action.payload }
      }
    break

    case FAVORITE_ADD_USER_ACTION :
      return {
        isLogged: true,
        info : { ...action.payload }
      }
    break

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
