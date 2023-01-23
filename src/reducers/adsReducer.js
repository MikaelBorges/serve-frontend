import { FETCH_ADS_ACTION } from '../actions/ads/actions-types'

const initState = {
  fetchedAds : []
}

const AdsReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ADS_ACTION :
      return {
        fetchedAds : [
          //...state.fetchedAds,
          ...action.payload
        ]
      }
    break
    default: return state
    break
  }
}

export default AdsReducer
