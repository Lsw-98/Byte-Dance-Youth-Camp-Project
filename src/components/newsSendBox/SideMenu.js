import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'
import axios from 'axios'

const { Sider } = Layout;
const { SubMenu } = Menu;

// 图标列表
const iconList = {
  "/home": <UserOutlined></UserOutlined>,
}

function SideMenu(props) {
  const [menu, setMenu] = useState([])
  useEffect(() => {
    // _embed关联子实体查询得到菜单栏的项与子项
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      setMenu(res.data)
    })
  }, [])

  // 控制子项显示
  const checkPagePermission = (item) => {
    return item.pagepermisson === 1
  }

  const renderMenu = (menuList) => {
    return menuList.map(item => {
      // 有子项的菜单栏才使用SubMenu，否则使用Menu
      if (item.children?.length > 0 && checkPagePermission(item)) {
        return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
          {/* 递归调用renderMenu */}
          {renderMenu(item.children)}
        </SubMenu>
      }
      return checkPagePermission(item) && <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() => {
        props.history.push(item.key)
      }}>
        {item.title}
      </Menu.Item>
    })
  }

  // 得到路径名，用于高亮显示
  const selectKeys = props.location.pathname
  // 用户刷新后高亮显示
  const openKeys = ['/' + props.location.pathname.split('/')[1]]
  return (
    <Sider trigger={null} collapsible>
      <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
        <div className="logo">全球新闻管理系统</div>
        <div style={{ flex: 1, "overflow": "auto" }}>
          {/* 
          selectedKeys：受控组件
          defaultOpenKeys：非受控组件
          */}
          <Menu theme="dark" mode="inline" selectedKeys={selectKeys} defaultOpenKeys={openKeys}>
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider >
  );
}

export default withRouter(SideMenu)