import {
  FETCH_ADS_ACTION

} from '../actions/ads/actions-types'

const initState = {
  //fetchedAds : [],
  lastAdLiked : {}
}

const AdsReducer = (state = initState, action) => {
  switch (action.type) {

    /* case FETCH_ADS_ACTION :
      return {
        fetchedAds : [
          ...action.payload
        ]
      }
    break */

    case 'UPDATE_LIKED_AD_ACTION' :
      return {
        lastAdLiked : { ...action.payload }
      }
    break

    default: return state
    break
  }
}

export default AdsReducer
