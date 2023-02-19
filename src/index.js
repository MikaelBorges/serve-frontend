import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'
// import { createStore } from 'redux'
// import rootReducer from './reducers/rootReducer'
// const store = createStore(rootReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
{/* <React.StrictMode> */}
root.render(

  <Provider store={store}>
    <Router basename="/projects/serve">
      <App />
    </Router>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.warn))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
