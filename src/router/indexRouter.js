import React, { lazy, Suspense } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

const Login = lazy(() => import('../views/login/Login'));
const NewsSandBox = lazy(() => import('../views/newsSandBox/NewsSandBox'));
const Detail = lazy(() => import('../views/visitor/Detail'));
const Visitor = lazy(() => import('../views/visitor/Visitor'));

export default function indexRouter() {
  return (
    <HashRouter>
      <Switch>
        <Suspense fallback={<div>loading</div>}>
          <Route path="/login" component={Login}></Route>
          <Route path="/visitor" component={Visitor}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
          {/* <Route path="/" component={NewsSandBox}></Route> */}
          <Route path="/" render={() =>
            localStorage.getItem("token") ?
              <NewsSandBox></NewsSandBox> :
              <Redirect to="/login"></Redirect>
          }></Route>
        </Suspense>
      </Switch>
    </HashRouter>
  );
}
