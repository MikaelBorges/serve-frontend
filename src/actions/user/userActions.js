import {
  LOGIN_USER_ACTION,
  LOGOUT_USER_ACTION,
  ADD_ADS_USER_ACTION,
  FAVORITE_ADD_USER_ACTION,
  UPDATE_ADS_WITH_IMAGES_ACTION
} from './user-types'

export const favoriteAddUserAction = (user, adId) => {
  const index = user.info.favorites.indexOf(adId)
  if (index > -1) {
    //console.log('trouvé on le supprime')
    user.info.favorites.splice(index, 1)
  }
  else {
    //console.log("pas trouvé on l'ajoute")
    user.info.favorites.push(adId)
  }
  //console.log('user after', user)
  return function(dispatch) {
    dispatch({
      type: FAVORITE_ADD_USER_ACTION,
      payload: user.info
    })
  }
}

export const updateAdsWithImages = (user, newValueAdsWithImages) => {
  user.info.adsWithImages = newValueAdsWithImages
  return function(dispatch) {
    dispatch({
      type: UPDATE_ADS_WITH_IMAGES_ACTION,
      payload: user.info
    })
  }
}

export const addAdsOfUserAction = (user, adId) => {
  const index = user.info.ads.indexOf(adId)
  if (index > -1) {
    //console.log('trouvé on le supprime')
    user.info.ads.splice(index, 1)
  }
  else {
    //console.log("pas trouvé on l'ajoute")
    user.info.ads.push(adId)
  }
  //console.log('user after', user)
  return function(dispatch) {
    dispatch({
      type: ADD_ADS_USER_ACTION,
      payload: user.info
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
      type: LOGOUT_USER_ACTION,
      payload: null
    })
  }
}
