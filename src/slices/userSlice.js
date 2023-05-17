import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: {},
  isLogged: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    connectUser: (state, action) => {
      state.info = action.payload
      state.isLogged = true
    },
    disconnectUser: (state) => {
      state.info = {}
      state.isLogged = false
    },
    addToFavoritesUser: (state, action) => {
      state.info.favorites = [...state.info.favorites, action.payload]
    },
    deleteToFavoritesUser: (state, action) => {
      state.info.favorites = [...action.payload]
    },
    addToAdsOfUser: (state, action) => {
      state.info.ads = [...state.info.ads, action.payload]
    },
    deleteToAdsOfUser: (state, action) => {
      state.info.ads = [...action.payload]
    },
    incrementAdsImagesUser: (state) => {
      state.info.adsWithImages = state.info.adsWithImages + 1
    },
    decrementAdsImagesUser: (state) => {
      state.info.adsWithImages = state.info.adsWithImages - 1
    }
  }
})

export const {
  connectUser,
  disconnectUser,
  addToAdsOfUser,
  deleteToAdsOfUser,
  addToFavoritesUser,
  deleteToFavoritesUser,
  incrementAdsImagesUser,
  decrementAdsImagesUser
} = userSlice.actions
export const selectUser = (state) => state.user
export default userSlice.reducer
