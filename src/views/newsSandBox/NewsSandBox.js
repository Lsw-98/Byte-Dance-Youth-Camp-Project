import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SideMenu from '../../components/newsSendBox/SideMenu';
import TopHeader from '../../components/newsSendBox/TopHeader';
import Home from './home/Home';
import Nopermission from './noperomission/Nopermission';
import RightList from './right-manage/RightList';
import RoleList from './right-manage/RoleList';
import UserList from './user-manage/UserList';

export default function NewsSandBox() {
  return (
    <div>
      <SideMenu></SideMenu>
      <TopHeader></TopHeader>

      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/user-manage/list" component={UserList}></Route>
        <Route path="/right-manage/role/list" component={RoleList}></Route>
        <Route path="/right-manage/right/list" component={RightList}></Route>

        <Redirect from="/" to="/home" exact></Redirect>
        <Route path="*" component={Nopermission}></Route>
      </Switch>
    </div >
  );
}
