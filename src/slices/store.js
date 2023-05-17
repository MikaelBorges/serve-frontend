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

const persistedStore = loadFromLocalStorage();
if(persistedStore) console.log('redux store hydrated from local storage', persistedStore)
else console.log("redux store can't be hydrated because it has been removed from local storage")

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
    console.log('redux store saved in local storage', store.getState())
  }
  else {
    console.log("redux store can't be saved because token doesn't exist in local storage")
    window.localStorage.removeItem('redux')
  }
})

export default store
