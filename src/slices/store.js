import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import adsReducer from './adsSlice'

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('redux', JSON.stringify(state))
  }
  catch (e) {
    console.error(e)
  }
}

const loadFromLocalStorage = () => {
  const token = window.localStorage.getItem('serve-token')
  if (!token) window.localStorage.removeItem('redux')
  try {
    const stateStr = localStorage.getItem('redux')
    return stateStr ? JSON.parse(stateStr) : undefined
  }
  catch (e) {
    console.error(e)
    return undefined
  }
}

const persistedStore = loadFromLocalStorage()
if(persistedStore) console.log('le store de redux a été hydraté par le local storage', persistedStore)
else console.log("le store de redux n'a pas pu être hydraté car il n'est plus dans le local storage")

const store = configureStore({
  reducer: {
      user: userReducer,
      ads: adsReducer
  },
  preloadedState: persistedStore
})

store.subscribe(() => {
  const token = window.localStorage.getItem('serve-token')
  if (token) {
    saveToLocalStorage(store.getState())
    console.log('le store de redux a été sauvegardé dans le local storage', store.getState())
  }
  else {
    console.log("le store de redux n'a pas été sauvegardé car le token n'existe plus dans le local storage")
    window.localStorage.removeItem('redux')
  }
})

export default store
