import React, { useState, useEffect, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';
import { connect } from 'react-redux';

const Home = lazy(() => import('../../views/newsSandBox/home/Home'));
const Nopermission = lazy(() => import('../../views/newsSandBox/noperomission/Nopermission'));
const RightList = lazy(() => import('../../views/newsSandBox/right-manage/RightList'));
const RoleList = lazy(() => import('../../views/newsSandBox/right-manage/RoleList'));
const UserList = lazy(() => import('../../views/newsSandBox/user-manage/UserList'));
const NewsAdd = lazy(() => import('../../views/newsSandBox/news-manage/NewsAdd'));
const NewsDraft = lazy(() => import('../../views/newsSandBox/news-manage/NewsDraft'));
const NewsPreview = lazy(() => import('../../views/newsSandBox/news-manage/NewsPreview'));
const NewsUpdate = lazy(() => import('../../views/newsSandBox/news-manage/NewsUpdate'));
const NewsCategory = lazy(() => import('../../views/newsSandBox/news-manage/NewsCategory'));
const Audit = lazy(() => import('../../views/newsSandBox/audit-manage/Audit'));
const AuditList = lazy(() => import('../../views/newsSandBox/audit-manage/AuditList'));
const Unpublished = lazy(() => import('../../views/newsSandBox/publish-manage/Unpublished'));
const Published = lazy(() => import('../../views/newsSandBox/publish-manage/Published'));
const Sunset = lazy(() => import('../../views/newsSandBox/publish-manage/Sunset'));

const LocalRouterMap = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewsDraft,
  "/news-manage/category": NewsCategory,
  "/news-manage/preview/:id": NewsPreview,
  "/news-manage/update/:id": NewsUpdate,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": Sunset
}

function NewsRouter(props) {
  const [BackRouteList, setBackRouteList] = useState([])
  useEffect(() => {
    Promise.all([
      axios.get("/rights"),
      axios.get("/children"),
    ]).then(res => {
      setBackRouteList([...res[0].data, ...res[1].data])
    })
  }, [])

  const { role: { rights } } = JSON.parse(localStorage.getItem("token"))

  const checkRoute = (item) => {
    return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
  }

  const checkUser = (item) => {
    return rights.includes(item.key)
  }

  return (
    <Spin size="large" spinning={false}>
      <Switch>
        {
          BackRouteList.map(item => {
            if (checkRoute(item) && checkUser(item)) {
              return <Route
                path={item.key}
                key={item.key}
                component={LocalRouterMap[item.key]}
                exact />
            }
            return null
          })
        }

        <Redirect from="/" to="/home" exact></Redirect>
        {
          BackRouteList.length > 0 && <Route path="*" component={Nopermission}></Route>
        }
      </Switch>
    </Spin>
  );
}

const mapStateToProps = ({ LoadingReducer: { isLoading } }) => ({
  isLoading
})

export default connect(mapStateToProps)(NewsRouter)
