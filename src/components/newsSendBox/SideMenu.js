import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'

const { Sider } = Layout;
const { SubMenu } = Menu;

// 模拟数组结构
const menuList = [
  {
    key: "/home",
    title: "首页",
    icon: <UserOutlined />
  },
  {
    key: "/user-manage",
    title: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/user-manage/list",
        title: "用户列表",
        icon: <UserOutlined />
      }
    ]
  },
  {
    key: "/right-manage",
    title: "权限管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/right-manage/role/list",
        title: "角色列表",
        icon: <UserOutlined />
      },
      {
        key: "/right-manage/right/list",
        title: "权限列表",
        icon: <UserOutlined />
      },
    ]
  },
]

function SideMenu(props) {
  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children) {
        return <SubMenu key={item.key} icon={item.icon} title={item.title}>
          {renderMenu(item.children)}
        </SubMenu>
      }
      else {
        return <Menu.Item key={item.key} icon={item.icon} onClick={() => {
          props.history.push(item.key)
        }}>
          {item.title}
        </Menu.Item>
      }
    })
  }

  return (
    <Sider trigger={null} collapsible>
      <div className="logo">全球新闻管理系统</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['/home']}>
        {renderMenu(menuList)}
      </Menu>
    </Sider>
  );
}

export default withRouter(SideMenu)