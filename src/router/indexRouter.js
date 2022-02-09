import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../views/login/Login';
import NewsSandBox from '../views/newsSandBox/NewsSandBox';
import Detail from '../views/visitor/Detail';
import Visitor from '../views/visitor/Visitor';

export default function indexRouter() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/visitor" component={Visitor}></Route>
        <Route path="/detail/:id" component={Detail}></Route>
        {/* <Route path="/" component={NewsSandBox}></Route> */}
        <Route path="/" render={() =>
          localStorage.getItem("token") ?
            <NewsSandBox></NewsSandBox> :
            <Redirect to="/login"></Redirect>
        }></Route>
      </Switch>
    </HashRouter>
  );
}
