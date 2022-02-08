// 权限列表
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from 'axios'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  ToTopOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

export default function NewsDraft() {
  const [dataSource, setDataSource] = useState([])
  const { username } = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
    axios.get(`/news?author=${username}&auditState=0&_expand=category`).then(res => {
      const list = res.data
      setDataSource(list)
    })
  }, [username])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      },
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
      // render: (key) => {
      //   return <Tag color="orange">{key}</Tag>
      // },
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (category) => {
        return category.title
      },
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button
            style={{ marginRight: "15px" }}
            danger
            shape="circle"
            icon={<DeleteOutlined></DeleteOutlined>}
            onClick={() => confirmDel(item)}></Button>
          <Button
            style={{ marginRight: "15px" }}
            shape="circle"
            icon={<EditOutlined></EditOutlined>}
            onClick={() => confirmDel(item)}></Button>
          <Button
            type='primary'
            shape="circle"
            icon={<ToTopOutlined />}
            onClick={() => confirmDel(item)}></Button>

        </div >
      },
    },
  ];

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
