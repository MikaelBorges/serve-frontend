import {
  LOGIN_USER_ACTION,
  LOGOUT_USER_ACTION,
  ADD_AD_OF_USER_ACTION,
  ADD_FAVORITE_AD_ACTION,
  DELETE_AD_OF_USER_ACTION,
  DELETE_FAVORITE_AD_ACTION,
  INCREMENT_ADS_WITH_IMAGES_OF_USER_ACTION,
  DECREMENT_ADS_WITH_IMAGES_OF_USER_ACTION
} from './user-types'

export const addFavoriteAdAction = (adId) => {
  return function(dispatch) {
    dispatch({
      type: ADD_FAVORITE_AD_ACTION,
      payload: adId
    })
  }
}

export const incrementAdsWithImagesOfUser = () => {
  return function(dispatch) {
    dispatch({
      type: INCREMENT_ADS_WITH_IMAGES_OF_USER_ACTION
    })
  }
}

export const decrementAdsWithImagesOfUser = () => {
  return function(dispatch) {
    dispatch({
      type: DECREMENT_ADS_WITH_IMAGES_OF_USER_ACTION
    })
  }
}

export const addAdOfUserAction = (adId) => {
  return function(dispatch) {
    dispatch({
      type: ADD_AD_OF_USER_ACTION,
      payload: adId
    })
  }
}

export const loginUserAction = (user) => {
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
      type: LOGOUT_USER_ACTION
    })
  }
}

export const deleteAdOfUserAction = (adId) => {
  return function(dispatch) {
    dispatch({
      type: DELETE_AD_OF_USER_ACTION,
      payload: adId
    })
  }
}

export const deleteFavoriteAdAction = (adId) => {
  return function(dispatch) {
    dispatch({
      type: DELETE_FAVORITE_AD_ACTION,
      payload: adId
    })
  }
}
