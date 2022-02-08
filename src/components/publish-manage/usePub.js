import { useEffect, useState } from 'react';
import axios from 'axios';
import { notification } from 'antd';

function UsePub(type) {
  const [dataSource, setDataSource] = useState([])
  const { username } = JSON.parse(localStorage.getItem("token"))
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