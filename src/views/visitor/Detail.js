import React, { useEffect, useState } from 'react';
import { PageHeader, Descriptions } from 'antd';
import axios from 'axios'
import moment from 'moment'
import { HeartTwoTone } from '@ant-design/icons';


export default function Detail(props) {
  const [newsInfo, setNewsInfo] = useState(null)

  useEffect(() => {
    axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(res => {
      setNewsInfo({
        ...res.data,
        view: res.data.view + 1
      })
      return res.data
    }).then(res => {
      axios.patch(`/news/${props.match.params.id}`, {
        view: res.view + 1
      })
    })
  }, [props.match.params.id])



  const handleStar = () => {
    setNewsInfo({
      ...newsInfo,
      star: newsInfo.star + 1
    })

    axios.patch(`/news/${props.match.params.id}`, {
      star: newsInfo.star + 1
    })
  }

  const handleCopy = (event) => {
    console.log(1);
    // clipboardData 对象是为通过编辑菜单、快捷菜单和快捷键执行的编辑操作所保留的，也就是你复制或者剪切内容
    let clipboardData = event.clipboardData || window.clipboardData;
    // 如果未复制或者未剪切，则return出去
    if (!clipboardData) {
      return;
    }
    // Selection 对象，表示用户选择的文本范围或光标的当前位置。
    // 声明一个变量接收 -- 用户输入的剪切或者复制的文本转化为字符串
    let text = window.getSelection().toString();
    if (text) {
      // 如果文本存在，首先取消文本的默认事件
      event.preventDefault();
      clipboardData.setData('text/plain', text + '\n\n此文章版权归' + + '所有，转载请标明');
    }
  }

  return <div>
    {
      newsInfo && <div onCopy={event => handleCopy(event)}>
        <PageHeader
          onBack={() => window.history.back()}
          title={newsInfo.title}
          subTitle={<div>
            {newsInfo.category.title}
            <span style={{ marginLeft: "5px" }}>
              <HeartTwoTone twoToneColor="#eb2f96" onClick={() => handleStar()} />
            </span>
          </div>}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
            <Descriptions.Item label="发布时间">{
              newsInfo.publishTime ?
                moment(newsInfo.publishTime).format("YYYY-MM-DD HH:mm:ss") :
                "-"}
            </Descriptions.Item>
            <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
            <Descriptions.Item label="访问数量">{newsInfo.view}</Descriptions.Item>
            <Descriptions.Item label="点赞数量">{newsInfo.star}</Descriptions.Item>
            <Descriptions.Item label="评论数量">0</Descriptions.Item>
          </Descriptions>
        </PageHeader>
        <div
          style={{
            padding: "0 24px"
          }}>
          <h2>新闻内容：</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: newsInfo.content
            }}
          >
          </div>
        </div>
      </div>
    }
  </div >
}
