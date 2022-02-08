// 权限列表
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, notification } from 'antd';
import axios from 'axios'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  ToTopOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

export default function NewsDraft(props) {
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
      render: (title, item) => {
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      },
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
            onClick={() => updateNews(item)}></Button>
          <Button
            type='primary'
            shape="circle"
            icon={<ToTopOutlined />}
            onClick={() => submitNews(item.id)}
          ></Button>

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
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`/news/${item.id}`)
  }

  const updateNews = (item) => {
    props.history.push(`/news-manage/update/${item.id}`)
  }

  const submitNews = (id) => {
    axios.patch(`/news/${id}`, {
      auditState: 1
    }).then(res => {
      props.history.push("/audit-manage/list")
      notification.info({
        message: `通知`,
        description:
          "已提交至审核列表",
        placement: "topRight",
      });
    })
  }

  return <div>
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        pageSize: 5
      }}
      rowKey={item => item.id} />;
  </div>;
}
