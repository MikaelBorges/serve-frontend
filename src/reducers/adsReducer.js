import {
  FETCH_ADS_ACTION,
  UPDATE_LAST_INTERACTION_LIKE_AD_ACTION
} from '../actions/ads/actions-types'

const initState = {
  //fetchedAds : [],
  lastInteractionAdLike : {}
}

const AdsReducer = (state = initState, action) => {
  switch (action.type) {
    /* case FETCH_ADS_ACTION :
      return {
        fetchedAds : [
          ...action.payload
        ]
      } */

    case UPDATE_LAST_INTERACTION_LIKE_AD_ACTION :
      return {
        ...state,
        lastInteractionAdLike : { ...action.payload }
      }

    default: return state
  }
}

export default AdsReducer
