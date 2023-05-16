import {
  LOGIN_USER_ACTION,
  LOGOUT_USER_ACTION,
  ADD_AD_OF_USER_ACTION,
  DELETE_AD_OF_USER_ACTION,
  ADD_FAVORITE_AD_ACTION,
  DELETE_FAVORITE_AD_ACTION,
  DECREMENT_ADS_WITH_IMAGES_OF_USER_ACTION,
  INCREMENT_ADS_WITH_IMAGES_OF_USER_ACTION
} from '../actions/user/user-types'

const initState = {
  info : {},
  isLogged: false
}

const UserReducer = (state = initState, action) => {
  switch (action.type) {

    case INCREMENT_ADS_WITH_IMAGES_OF_USER_ACTION :
      return {
        ...state,
        info: {
          ...state.info,
          adsWithImages: state.info.adsWithImages + 1
        }
      }

    case DECREMENT_ADS_WITH_IMAGES_OF_USER_ACTION :
      return {
        ...state,
        info: {
          ...state.info,
          adsWithImages: state.info.adsWithImages - 1
        }
      }

    case ADD_AD_OF_USER_ACTION :
      return {
        ...state,
        info: {
          ...state.info,
          ads: [...state.info.ads, action.payload]
        }
      }

    case ADD_FAVORITE_AD_ACTION :
      return {
        ...state,
        info: {
          ...state.info,
          favorites: [...state.info.favorites, action.payload]
        }
      }

    case LOGIN_USER_ACTION :
      return {
        ...state,
        isLogged: true,
        info : { ...action.payload }
      }

    case LOGOUT_USER_ACTION :
      return {
        ...state,
        ...initState
      }

    case DELETE_AD_OF_USER_ACTION :
      const filteredAd = state.info.ads.filter((ad) => ad !== action.payload)
      return {
        ...state,
        info: {
          ...state.info,
          ads: [...filteredAd]
        }
      }

    case DELETE_FAVORITE_AD_ACTION :
      const filteredFavoriteAd = state.info.favorites.filter((ad) => ad !== action.payload)
      return {
        ...state,
        info: {
          ...state.info,
          favorites: [...filteredFavoriteAd]
        }
      }

    default: return state
  }
}

export default UserReducer
