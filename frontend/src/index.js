import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import Routes from './routes'
import './style.css'
import 'semantic-ui-css/semantic.min.css'
import getStore from './configureStore'

ReactDOM.render(
  <Provider store={getStore()} >
    <Routes />
  </Provider>
  , document.getElementById('root'),
)
registerServiceWorker()
