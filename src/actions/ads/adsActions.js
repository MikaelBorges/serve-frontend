import {
  FETCH_ADS_ACTION

} from './actions-types'

/* export const fetchAdsAction = (ads) => {
  return function(dispatch) {
    dispatch({
      type: FETCH_ADS_ACTION,
      payload: ads
    })
  }
} */

export const updateLikedAdAction = (likedAd) => {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_LIKED_AD_ACTION',
      payload: likedAd
    })
  }
}
