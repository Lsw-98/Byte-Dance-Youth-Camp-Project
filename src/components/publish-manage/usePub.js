import { useEffect, useState } from 'react';
import axios from 'axios';
import { notification } from 'antd';

// 传入一个type，代表当前文章的状态
function UsePub(type) {
  // 获取当前的所有文章
  const [dataSource, setDataSource] = useState([])
  // 从localStorage中读取用户信息，使用对象结构的方式拿到username
  const { username } = JSON.parse(localStorage.getItem("token"))

  // 定义一个useEffect，在里面发起请求，请求当前用户的所有文章列表
  // 只有在username或者是hooks传入的type发生变化时才会重新发起请求
  useEffect(() => {
    axios(`/news?author=${username}&publishState=${type}&_expand=category`).then(res => {
      setDataSource(res.data);
    })
  }, [username, type])

  const handlePublish = (id) => {
    setDataSource(dataSource.filter(item => item.id !== id))
    axios.patch(`/news/${id}`, {
      "publishState": 3,
    }).then(res => {
      notification.info({
        message: `通知`,
        description:
          "已下线",
        placement: "topRight",
      });
    })
  }

  const handleSunset = (id) => {
    setDataSource(dataSource.filter(item => item.id !== id))
    axios.delete(`/news/${id}`).then(res => {
      notification.info({
        message: `通知`,
        description:
          "已删除",
        placement: "topRight",
      });
    })
  }

  const handleUnPublish = (id) => {
    setDataSource(dataSource.filter(item => item.id !== id))
    axios.patch(`/news/${id}`, {
      "publishState": 2,
      "publishTime": Date.now()
    }).then(res => {
      notification.info({
        message: `通知`,
        description:
          "已发布",
        placement: "topRight",
      });
    })
  }

  return {
    dataSource,
    handleUnPublish,
    handleSunset,
    handlePublish
  }
}

export default UsePub