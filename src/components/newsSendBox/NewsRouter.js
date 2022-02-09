import React, { useState, useEffect } from 'react';
import Home from '../../views/newsSandBox/home/Home';
import Nopermission from '../../views/newsSandBox/noperomission/Nopermission';
import RightList from '../../views/newsSandBox/right-manage/RightList';
import RoleList from '../../views/newsSandBox/right-manage/RoleList';
import UserList from '../../views/newsSandBox/user-manage/UserList';
import NewsAdd from '../../views/newsSandBox/news-manage/NewsAdd';
import NewsDraft from '../../views/newsSandBox/news-manage/NewsDraft';
import NewsPreview from '../../views/newsSandBox/news-manage/NewsPreview';
import NewsUpdate from '../../views/newsSandBox/news-manage/NewsUpdate';
import NewsCategory from '../../views/newsSandBox/news-manage/NewsCategory';
import Audit from '../../views/newsSandBox/audit-manage/Audit';
import AuditList from '../../views/newsSandBox/audit-manage/AuditList';
import Unpublished from '../../views/newsSandBox/publish-manage/Unpublished';
import Published from '../../views/newsSandBox/publish-manage/Published';
import Sunset from '../../views/newsSandBox/publish-manage/Sunset';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';
// import { connect } from 'react-redux';

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

export default function NewsRouter(props) {
  const [BackRouteList, setBackRouteList] = useState([])
  useEffect(() => {
    Promise.all([
      axios.get("/rights"),
      axios.get("/children"),
    ]).then(res => {
      setBackRouteList([...res[0].data, ...res[1].data])
    }, [])
  })

  const { role: { rights } } = JSON.parse(localStorage.getItem("token"))

  const checkRoute = (item) => {
    return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
  }

  const checkUser = (item) => {
    return rights.includes(item.key)
  }

  return (
    // <Spin size="large" spinning={props.isLoading}>
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

// const mapStateToProps = ({ LoadingReducer: { isLoading } }) => ({
//   isLoading
// })

// export default connect(mapStateToProps)(NewsRouter)