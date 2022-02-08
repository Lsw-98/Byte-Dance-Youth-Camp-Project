import React, { useState, useEffect, useRef } from 'react';
import { PageHeader, Steps, Button, Form, Input, Select, message, notification } from 'antd';
import axios from 'axios'

import style from './News.module.css'
import NewsEditor from '../../../components/news-manage/NewsEditor';

const { Step } = Steps;
const { Option } = Select;

export default function NewsUpdate(props) {
  const [current, setCurrent] = useState(0)
  const [categoryList, setCategoryList] = useState([])
  const [formInfo, setFormInfo] = useState({})
  const [content, setContent] = useState("")

  const forward = () => {
    setCurrent(current - 1)
  }

  const next = () => {
    if (current === 0) {
      NewsForm.current.validateFields().then(res => {
        setFormInfo(res)
        setCurrent(current + 1)
      }).catch(error => {
        console.log(error);
      })
    } else {
      if (content === "" || content.trim() === "<p></p>") {
        message.error("请输入新闻内容")
      }
      else {
        setCurrent(current + 1)
      }

    }
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const NewsForm = useRef(null)

  const handleSave = (auditState) => {
    axios.patch(`/news/${props.match.params.id}`, {
      ...formInfo,
      "content": content,
      "auditState": auditState,
    }).then(res => {
      props.history.push(auditState === 0 ? '/news-manage/draft' : "/audit-manage/list")
      notification.info({
        message: `通知`,
        description:
          `已${auditState === 0 ? '保存至草稿箱' : '提交至审核列表'}`,
        placement: "topRight",
      });
    })
  }

  useEffect(() => {
    axios.get("/categories").then(res => {
      setCategoryList(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(res => {
      let { title, categoryId, content } = res.data
      NewsForm.current.setFieldsValue({
        title,
        categoryId
      })
      setContent(content)
    })
  }, [props.match.params.id])

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="更新新闻"
        onBack={() => props.history.goBack()}
      />,
      <Steps current={current}>
        <Step title="基本信息" description="新闻标题，新闻分类" />
        <Step title="新闻内容" description="新闻主题内容" />
        <Step title="新闻提交" description="保存草稿或者提交审核" />
      </Steps>,

      <div style={{ marginTop: "20px" }}>
        <div className={current === 0 ? '' : style.active}>
          <Form
            {...layout}
            name="basic"
            ref={NewsForm}
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[{ required: true, message: '请输入新闻标题' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[{ required: true, message: '请选择新闻分类' }]}
            >
              <Select>
                {
                  categoryList.map(item =>
                    <Option
                      key={item.id}
                      value={item.id}>{item.title}</Option>
                  )
                }
              </Select>
            </Form.Item>
          </Form>
        </div>

        <div className={current === 1 ? '' : style.active}>
          <NewsEditor getContent={(value) => {
            setContent(value)
          }} content={content}></NewsEditor>
        </div>

        <div className={current === 2 ? '' : style.active}></div>

      </div>

      <div style={{ marginTop: "50px" }}>
        {
          current > 0 && <Button style={{ marginRight: "15px" }} onClick={forward}>上一步</Button>
        }

        {
          current < 2 && <Button style={{ marginRight: "15px" }} onClick={next}>下一步</Button>
        }

        {
          current === 2 && <span>
            <Button
              style={{ marginRight: "15px" }}
              onClick={() => handleSave(0)}>保存到草稿箱</Button>
            <Button
              type='primary'
              style={{ marginRight: "15px" }}
              onClick={() => handleSave(1)}>提交审核</Button>
          </span>
        }

      </div>
    </div>
  );
}
