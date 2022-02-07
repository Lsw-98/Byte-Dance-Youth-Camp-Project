import React, {Component} from 'react'
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom'

import Login from './login'
import Home from './home'
import Details from './details'
import User from './user'
import Update from './update'
import Article from './article'

export default class App extends Component{
    render(){
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/home" component={Home} />
                    <Route path="/details" component={Details} />
                    <Route path="/user" component={User} />
                    <Route path="/update" component={Update} />
                    <Route path="/article" component={Article} />
                </Switch>
            </HashRouter>
        )
    }
} 
