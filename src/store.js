import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromLocalStorage();
console.warn('persistedStore', persistedStore)

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
//const store = createStore(rootReducer, {}, composedEnhancer)
//const store = createStore(rootReducer, /* {}, */ composedEnhancer)
const store = createStore(rootReducer, persistedStore, composedEnhancer)

store.subscribe(() => {
  console.warn('store.getState()', store.getState())
  saveToLocalStorage(store.getState())
})

export default store