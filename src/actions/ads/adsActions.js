import {
  FETCH_ADS_ACTION,
  UPDATE_LAST_INTERACTION_LIKE_AD_ACTION
} from './actions-types'

/* export const fetchAdsAction = (ads) => {
  return function(dispatch) {
    dispatch({
      type: FETCH_ADS_ACTION,
      payload: ads
    })
  }
} */

export const updateLastInteractionLikeAdAction = (likedAd) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_LAST_INTERACTION_LIKE_AD_ACTION,
      payload: likedAd
    })
  }
}
