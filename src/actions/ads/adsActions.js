import { FETCH_ADS_ACTION } from './actions-types'

export const fetchAdsAction = (ads) => {
  console.warn('(ADS ACTION) ads', ads)
  return function(dispatch) {
    dispatch({
      type: FETCH_ADS_ACTION,
      payload: ads
    })
  }
}
