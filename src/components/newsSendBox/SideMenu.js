import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  UserOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  LineChartOutlined,
  GlobalOutlined,
  EditOutlined,
  UserSwitchOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  SolutionOutlined,
  SafetyCertificateOutlined,
  MonitorOutlined,
  ProfileOutlined,
  FileDoneOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'
import axios from 'axios'
import { connect } from 'react-redux'

const { Sider } = Layout;
const { SubMenu } = Menu;

// 图标列表
const iconList = {
  "/home": <UserOutlined></UserOutlined>,
  "/right-manage": <ThunderboltOutlined />,
  "/right-manage/right/list": <SafetyCertificateOutlined />,
  "/right-manage/role/list": <SolutionOutlined />,
  "/user-manage": <UserSwitchOutlined />,
  "/user-manage/list": <TeamOutlined />,
  "/news-manage": <GlobalOutlined></GlobalOutlined>,
  "/news-manage/add": <EditOutlined />,
  "/news-manage/draft": <DeleteOutlined></DeleteOutlined>,
  "/news-manage/category": <CopyOutlined />,
  "/audit-manage": <MonitorOutlined />,
  "/audit-manage/audit": <FileDoneOutlined />,
  "/audit-manage/list": <ProfileOutlined />,
  "/publish-manage": <LineChartOutlined></LineChartOutlined>,
  "/publish-manage/unpublished": <ClockCircleOutlined></ClockCircleOutlined>,
  "/publish-manage/published": <CheckOutlined></CheckOutlined>,
  "/publish-manage/sunset": <CloseOutlined></CloseOutlined>
}

function SideMenu(props) {
  const [menu, setMenu] = useState([])
  useEffect(() => {
    // _embed关联子实体查询得到菜单栏的项与子项
    axios.get("/rights?_embed=children").then(res => {
      setMenu(res.data)
    })
  }, [])

  // 控制子项显示
  const checkPagePermission = (item) => {
    return item.pagepermisson === 1 && rights.includes(item.key)
  }

  const { role: { rights } } = JSON.parse(localStorage.getItem("token"))

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
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
        <div className="logo">News hub</div>
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

const mapStateToProps = ({ CollapsedReducer: { isCollapsed } }) => {
  return {
    isCollapsed
  }
}

export default connect(mapStateToProps)(withRouter(SideMenu))