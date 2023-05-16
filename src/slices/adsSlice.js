import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  lastInteractionAdLike : {}
}

export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    lastActionWithLikesAds: (state, action) => {
      state.lastInteractionAdLike = { ...action.payload }
    }
  }
})

export const { lastActionWithLikesAds } = adsSlice.actions
export const selectAds = (state) => state.ads
export default adsSlice.reducer
