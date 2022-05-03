import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Switch } from 'antd';
import axios from 'axios'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import UserForm from '../../../components/user-manage/UserForm';

const { confirm } = Modal;

export default function UserList() {
  const [dataSource, setDataSource] = useState([])
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [isUpdateVisible, setIsUpdateVisible] = useState(false)
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false)
  const [regionData, setRegionData] = useState([])
  const [roleData, setRoleData] = useState([])
  const [current, setCurrent] = useState(null)
  const addForm = useRef(null)
  const updateForm = useRef(null)
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => {
        return region === "" ? < b > {"全球"} </b > : < b > {region} </b >
      },
      filters: [
        ...regionData.map(item => ({
          text: item.title,
          value: item.value
        })),
        {
          text: "全球",
          value: "全球"
        }
      ],
      onFilter: (value, item) => {
        if (value === "全球") {
          return item.region === ""
        }
        return item.region === value
      },
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (rId) => {
        return rId?.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return <Switch
          checked={roleState}
          disabled={item.default}
          onChange={() => stateChange(item)}></Switch>
      },
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button
            danger
            shape="circle"
            icon={<DeleteOutlined></DeleteOutlined>}
            onClick={() => confirmDel(item)}
            disabled={item.default}></Button>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined></EditOutlined>}
            style={{ marginLeft: "15px" }}
            disabled={item.default}
            onClick={() => updateMessage(item)}></Button>
        </div >
      },
    },
  ]

  const { roleId, region, username } = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
    const roleObj = {
      "1": "superadmin",
      "2": "admin",
      "3": "editor"
    }

    axios.get("/users?_expand=role").then(res => {
      const list = res.data
      setDataSource(roleObj[roleId] === "superadmin" ? list : [
        ...list.filter(item => item.username === username),
        ...list.filter(item => item.region === region && roleObj[item.roleId] === "editor")
      ])
    }, [roleId, region, username])
    axios.get("/regions").then(res => {
      setRegionData(res.data)
    })
    axios.get("/roles").then(res => {
      setRoleData(res.data)
    })
  }, [roleId, region, username])

  const updateMessage = (item) => {
    setTimeout(() => {
      setIsUpdateVisible(true)
      // 判断是否为超级管理员
      if (item.roleId === 1) {
        setIsUpdateDisabled(true)
      } else {
        setIsUpdateDisabled(false)
      }
      updateForm.current.setFieldsValue(item)
    }, 0)
    setCurrent(item)
  }

  const userUpdate = () => {
    updateForm.current.validateFields().then(value => {
      setIsUpdateVisible(false)
      setDataSource(dataSource.map(item => {
        if (item.id === current.id) {
          return {
            ...item,
            ...value,
            role: roleData.filter(data => data.id === value.roleId)[0]
          }
        }
        return item
      }))
      setIsUpdateDisabled(!isUpdateDisabled)
      axios.patch(`/users/${current.id}`,
        value)
    })
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
    setDataSource(dataSource.filter(data =>
      data.id !== item.id
    ))
    axios.delete(`/users/${item.id}`)
  }

  const showForm = () => {
    setIsAddVisible(true)
  }

  const addUser = () => {
    addForm.current.validateFields().then(value => {
      setIsAddVisible(false)
      // 重置表单值
      addForm.current.resetFields()
      // 首先post到后端，在设置datasource
      // 方便删除和更新操作
      axios.post(`/users`, {
        ...value,
        "roleState": true,
        "default": false,
      }).then(res => {
        setDataSource([...dataSource, {
          ...res.data,
          role: roleData.filter(item => item.id === value.roleId)[0]
        }])
      })
    }).catch(err => {
      console.log(err);
    })
  }

  const stateChange = (item) => {
    item.roleState = !item.roleState
    setDataSource([...dataSource])
    axios.patch(`/users/${item.id}`, {
      roleState: item.roleState
    })
  }

  return <div>
    <Button
      type="primary"
      onClick={showForm}>
      添加用户
    </Button>
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={item => item.id}
      pagination={{
        pageSize: 5
      }}
    ></Table>

    <Modal
      visible={isAddVisible}
      title="添加用户"
      okText="确定"
      cancelText="取消"
      onCancel={() => {
        setIsAddVisible(false)
      }}
      onOk={() => {
        addUser()
      }}
    >
      <UserForm
        regionData={regionData}
        roleData={roleData}
        ref={addForm}></UserForm>
    </Modal>

    <Modal
      visible={isUpdateVisible}
      title="更新用户"
      okText="更新"
      cancelText="取消"
      onCancel={() => {
        setIsUpdateVisible(false)
        setIsUpdateDisabled(!isUpdateDisabled)
      }}
      onOk={() => {
        userUpdate()
      }}
    >
      <UserForm
        regionData={regionData}
        roleData={roleData}
        ref={updateForm}
        isUpdateDisabled={isUpdateDisabled}
        isUpdate={true}></UserForm>
    </Modal>
  </div >;
}
