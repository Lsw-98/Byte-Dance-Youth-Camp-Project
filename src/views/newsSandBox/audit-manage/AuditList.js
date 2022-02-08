import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, notification } from 'antd';
import axios from 'axios';

export default function AuditList(props) {
  const { username } = JSON.parse(localStorage.getItem("token"))
  const [dataSource, setDataSource] = useState([])

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
      title: '审核状态',
      dataIndex: 'auditState',
      render: (auditState) => {
        const colorList = ["", "orange", "green", "red"]
        const auditList = ["草稿箱", "审核中", "已通过", "未通过"]
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
      },
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          {
            item.auditState === 1 && <Button type='primary' onClick={() => RervertNews(item)}>撤销</Button>
          }
          {
            item.auditState === 2 && <Button type='primary' onClick={() => PublishNews(item)}>发布</Button>
          }
          {
            item.auditState === 3 && <Button type='primary' onClick={() => UpdateNews(item)}>更新</Button>
          }
        </div >
      },
    },
  ];

  const RervertNews = (item) => {
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.patch(`/news/${item.id}`, {
      auditState: 0
    }).then(res => {
      notification.info({
        message: `通知`,
        description:
          "已保存至草稿箱",
        placement: "topRight",
      });
    })
  }

  const UpdateNews = (item) => {
    props.history.push(`/news-manage/update/${item.id}`)
  }

  const PublishNews = (item) => {
    axios.patch(`/news/${item.id}`, {
      "publishState": 2,
      "publishTime": Date.now()
    }).then(res => {
      props.history.push("/publish-manage/published")
      notification.info({
        message: `通知`,
        description:
          "已发布",
        placement: "topRight",
      });
    })
  }

  useEffect(() => {
    // auditState_ne=0就是auditState != 0
    // publishState_lte=1就是publishState <= 1
    axios(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
      setDataSource(res.data)
    })
  }, [username])

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
