import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import CreatePage from './CreatePage'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/create' component={CreatePage} />
    </div>
  </BrowserRouter>
  , document.getElementById('root')
)

registerServiceWorker()
