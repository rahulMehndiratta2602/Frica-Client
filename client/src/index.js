import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.min.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)


const store = createStore(rootReducer)
// const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render
(
  // <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Elements stripe={stripePromise} >
        <App />
      </Elements>
      
    </Router>
    </Provider>,
  //</React.StrictMode>, 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
