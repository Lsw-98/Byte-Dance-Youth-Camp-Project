import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Table, Button, notification } from 'antd';
import {
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';

export default function Audit() {
  const [dataSource, setDataSource] = useState([])
  const { roleId, region, username } = JSON.parse(localStorage.getItem("token"))

  const columns = [
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
        return <div>{category.title}</div>
      },
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button
            danger
            shape="circle"
            icon={<CloseOutlined />}
            onClick={() => handleAudit(item, 3, 0)}></Button>
          <Button
            type='primary'
            shape="circle"
            style={{ marginLeft: "15px" }}
            icon={<CheckOutlined />}
            onClick={() => handleAudit(item, 2, 1)}></Button>
        </div >
      },
    },
  ];

  const handleAudit = (item, auditState, publishState) => {
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.patch(`/news/${item.id}`, {
      auditState,
      publishState
    }).then(res => {
      notification.info({
        message: `通知`,
        description:
          "审核完毕",
        placement: "topRight",
      });
    })
  }

  useEffect(() => {
    const roleObj = {
      "1": "superadmin",
      "2": "admin",
      "3": "editor"
    }

    axios.get(`/news?auditState=1&_expand=category`).then(res => {
      const list = res.data
      setDataSource(roleObj[roleId] === "superadmin" ? list : [
        ...list.filter(item => item.author === username),
        ...list.filter(item => item.region === region && roleObj[item.roleId] === "editor")
      ])
    }, [roleId, region, username])
  })
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5
        }}
        rowKey={item => item.id} />
    </div>
  );
}
