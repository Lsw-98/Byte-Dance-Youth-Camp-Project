import React, { forwardRef, useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const UserForm = forwardRef((props, ref) => {
  const [isDisabled, setIsDisabled] = useState(false)
  useEffect(() => {
    setIsDisabled(props.isUpdateDisabled)
  }, [props.isUpdateDisabled])

  return (<Form
    ref={ref}
    layout="vertical"
  >
    <Form.Item
      name="username"
      label="用户名"
      rules={[{ required: true, message: '请输入用户名' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="password"
      label="密码"
      rules={[{ required: true, message: '请输入密码' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="region"
      label="区域"
      rules={isDisabled ? [] : [{ required: true, message: '请输入区域' }]}
    >
      <Select disabled={isDisabled}>
        {
          props.regionData.map(item =>
            <Option value={item.value} key={item.id}>{item.title}</Option>
          )
        }
      </Select>
    </Form.Item>
    <Form.Item
      name="roleId"
      label="角色"
      rules={[{ required: true, message: '请输入角色' }]}
    >
      <Select onChange={(value) => {
        if (value === "1") {
          setIsDisabled(true)
          ref.current.setFieldsValue({
            region: ""
          })
        } else {
          setIsDisabled(false)
        }
      }}>
        {
          props.roleData.map(item =>
            <Option value={item.value} key={item.id}>{item.roleName}</Option>
          )
        }
      </Select>
    </Form.Item>
  </Form>
  )
})

export default UserForm