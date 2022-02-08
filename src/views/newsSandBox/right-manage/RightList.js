// 权限列表
import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd';
import axios from 'axios'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

export default function RightList() {
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    axios.get("/rights?_embed=children").then(res => {
      const list = res.data
      // 首页没有子项，给首页的children项赋值为空字符，让其不显示树形结构
      list.forEach(item => {
        if (item.children.length === 0) {
          item.children = ""
        }
      });
      setDataSource(list)
    })
  })

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      // 重新渲染，修改样式
      render: (id) => {
        return <b>{id}</b>
      },
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color="orange">{key}</Tag>
      },
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined></DeleteOutlined>} onClick={() => confirmDel(item)}></Button>
          <Popover content={
            <div style={{ textAlign: "center" }}>
              <Switch checked={item.pagepermisson} onChange={() => switchMethod(item)}></Switch>
            </div >}
            title="页面配置项" trigger={item.pagepermisson === undefined ? "" : "hover"} >
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined></EditOutlined>}
              disabled={item.pagepermisson === undefined}
              style={{ marginLeft: "15px" }}></Button>
          </Popover >
        </div >
      },
    },
  ];

  // 控制菜单栏权限的switch
  // 1代表有权限   0代表无权限
  const switchMethod = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setDataSource([...dataSource])
    if (item.grade === 1) {
      axios.patch(`/rights/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    } else {
      axios.patch(`/children/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    }
  }

  // 弹出删除确认框
  const confirmDel = (item) => {
    confirm({
      title: '你确认要删除吗？',
      icon: <ExclamationCircleOutlined />,
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        // 调用删除方法
        deleteMethod(item)
      },
      onCancel() {

      },
    });
  }

  // 删除方法
  const deleteMethod = (item) => {
    // 判断是否有子项
    if (item.grade === 1) {
      setDataSource(dataSource.filter(data => data.id !== item.id))
      axios.delete(`/rights/${item.id}`)
    } else {
      // 有子项时删除子项，先从子项找到其父项，在对父项进行过滤
      let list = dataSource.filter(data => data.id === item.rightId)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      // 
      setDataSource([...dataSource])
      axios.delete(`/children/${item.id}`)
    }
  }

  return <div>
    <Table dataSource={dataSource} columns={columns} pagination={{
      pageSize: 5
    }} />;
  </div>;
}
