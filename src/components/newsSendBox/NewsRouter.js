import React from 'react';
import Home from '../../views/newsSandBox/home/Home';
import Nopermission from '../../views/newsSandBox/noperomission/Nopermission';
import RightList from '../../views/newsSandBox/right-manage/RightList';
import RoleList from '../../views/newsSandBox/right-manage/RoleList';
import UserList from '../../views/newsSandBox/user-manage/UserList';
import NewsAdd from '../../views/newsSandBox/news-manage/NewsAdd';
import NewsDraft from '../../views/newsSandBox/news-manage/NewsDraft';
import NewsCategory from '../../views/newsSandBox/news-manage/NewsCategory';
import Audit from '../../views/newsSandBox/audit-manage/Audit';
import AuditList from '../../views/newsSandBox/audit-manage/AuditList';
import Unpublished from '../../views/newsSandBox/publish-manage/Unpublished';
import Published from '../../views/newsSandBox/publish-manage/Published';
import Sunset from '../../views/newsSandBox/publish-manage/Sunset';
import { Switch, Route, Redirect } from 'react-router-dom';

const LocalRouterMap = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewsDraft,
  "/news-manage/category": NewsCategory,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": Sunset
}

export default function NewsRouter() {
  return (
    <Switch>
      <Route path="/home" component={Home}></Route>
      <Route path="/user-manage/list" component={UserList}></Route>
      <Route path="/right-manage/role/list" component={RoleList}></Route>
      <Route path="/right-manage/right/list" component={RightList}></Route>

      <Redirect from="/" to="/home" exact></Redirect>
      <Route path="*" component={Nopermission}></Route>
    </Switch>
  );
}
