import { FETCH_ADS_ACTION } from '../actions/ads/actions-types'

const initState = {
  fetchedAds : []
}

const AdsReducer = (state = initState, action) => {
  console.log('(ADS REDUCER) action', action)
  console.log('(ADS REDUCER) state', state)
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

/* const AdsReducer = (state = initState, action) => {
  console.log('(ADS REDUCER) action', action)
  console.log('(ADS REDUCER) state', state)
  switch (action.type) {
    case FETCH_ADS_ACTION:
      return [
        ...state,
        ...action.payload
      ]
    default: return state
  }
} */

export default AdsReducer
