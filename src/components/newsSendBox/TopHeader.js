import React from 'react';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';

import { connect } from 'react-redux'

const { Header } = Layout;

function TopHeader(props) {
  const changeCollapsed = () => {
    // 改变state的isCollapsed的值
    props.changeCollapsed()
  }

  const { role: { roleName }, username } = JSON.parse(localStorage.getItem("token"))

  // 下拉菜单
  const menu = (
    <Menu>
      <Menu.Item>
        {roleName}
      </Menu.Item>
      <Menu.Item danger onClick={() => {
        localStorage.removeItem("token")
        props.history.replace("/login")
      }}>退出登录</Menu.Item>
    </Menu >
  );

  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: this.toggle,
      })} */}
      {
        props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}></MenuUnfoldOutlined> : <MenuFoldOutlined onClick={changeCollapsed}></MenuFoldOutlined>
      }
      <div style={{ float: 'right' }}>
        <span style={{ marginRight: "15px" }}>欢迎
          <span style={{ color: "#DC143C" }}>{username}</span>回来!</span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header >
  );
}

const mapStateToProps = ({ CollapsedReducer: { isCollapsed } }) => {
  return {
    isCollapsed
  }
}

const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: "change_collapsed"
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader))
