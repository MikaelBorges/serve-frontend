import { combineReducers } from 'redux'
import AdsReducer from './adsReducer'
import UserReducer from './userReducer'

const rootReducer = combineReducers({
  ads: AdsReducer,
  user: UserReducer
})

export default rootReducer
