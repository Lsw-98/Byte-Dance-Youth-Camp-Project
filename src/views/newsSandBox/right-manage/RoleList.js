import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Tree } from 'antd';
import axios from 'axios';
import {
  DeleteOutlined,
  MenuOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

export default function RoleList() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([])
  const [rightList, setRightList] = useState([])
  const [currentRightList, setCurrentRightList] = useState([])
  const [currentId, setCurrentId] = useState(0)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      },
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button
            danger
            shape="circle"
            icon={<DeleteOutlined></DeleteOutlined>}
            onClick={() => delPerson(item)}
          ></Button>

          <Button
            type="primary"
            shape="circle"
            icon={<MenuOutlined></MenuOutlined>}
            style={{ marginLeft: "15px" }}
            onClick={() => {
              setIsModalVisible(true)
              setCurrentRightList(item.rights)
              setCurrentId(item.id)
            }}
          ></Button>

        </div >
      },
    },
  ]

  // 弹出删除确认框
  const delPerson = (item) => {
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
    axios.delete(`http://localhost:5000/roles/${item.id}`)
  };

  // 权限分配点击OK
  const handleOk = () => {
    //console.log(currentRightList);
    setIsModalVisible(false)
    // 同步datasource
    setDataSource(dataSource.map(item => {
      if (item.id === currentId) {
        return {
          ...item,
          rightList: currentRightList
        }
      }
      return item
    }))
    // put到后端
    axios.patch(`http://localhost:5000/roles/${currentId}`, {
      rightList: currentRightList
    })
  };

  // 权限分配点击取消
  const handleCancel = () => {
    setIsModalVisible(false)
  };

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then(res => {
      setDataSource(res.data)
    })
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      setRightList(res.data)
    })
  }, [])

  const onCheck = (checkedKeys) => {
    setCurrentRightList(checkedKeys.checked)
  };

  return <div>
    <Table dataSource={dataSource} columns={columns}
      rowKey={item => item.id}></Table>
    <Modal
      title="权限分配"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Tree
        checkable
        checkedKeys={currentRightList}
        treeData={rightList}
        onCheck={onCheck}
        // 不在与父级关联
        checkStrictly={true}
      />
    </Modal>
  </div>;
}
