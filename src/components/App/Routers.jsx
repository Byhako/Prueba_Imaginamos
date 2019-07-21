import React, { Component }  from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Home'
import CreateUser from './CreateUser'
import List from '@/components/List/List'

class AppRouter extends Component {

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/create' component={CreateUser} />
          <Route exact path='/list' component={List} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default AppRouter
