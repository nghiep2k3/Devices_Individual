import React, { useState, useEffect } from 'react';
import styles from '../../assets/styles/index.module.css';
import { Button, Checkbox, Form, Input, Select, Space, Table, Tag } from 'antd';
import Search from 'antd/es/transfer/search';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../shared/services/http-client';

export default function DevicesManager() {
  // của form
  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const { Search } = Input;
  const onSearch = value => console.log(value);

  const [result, setResult] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        axiosInstance.get(`devices?populate=user`).then(response => {
          console.log(response);
          setResult(response.data);
          console.log(3333, response);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  //Table
  // Định vị data theo dataIndex
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => (
        <>
          <span>{record.id}</span>
        </>
      )
    },

    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (_, record) => (
        <>
          <span>{record.attributes.code}</span>
        </>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <>
          <span>{record.attributes.name}</span>
        </>
      )
    }
    // ,
    // {
    //   title: 'Username',
    //   dataIndex: 'username',
    //   key: 'username',
    // }
    ,
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status ? (
            <Tag color="volcano">Inactive</Tag>
          ) : (
            <Tag color="geekblue">Active</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to="/DetailsDevices">
            <EyeOutlined style={{ cursor: 'pointer' }} />
          </Link>
          <Link to="/EditDevices">
            <EditOutlined style={{ cursor: 'pointer' }} />
          </Link>
          <DeleteOutlined style={{ cursor: 'pointer' }} />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      id: '1',
      name: 'nghiep1320',

      username: 'Nguyễn Thiện Nghiệp',
      tags: ['Active'],
      code: 'Cam_01',
    },
    {
      key: '2',
      id: '2',
      name: 'nghiep1320',

      username: 'Nguyễn Thiện Nghiệp',
      tags: ['Inactive'],
      code: 'Cam_01',
    },
    {
      key: '3',
      id: '3',
      name: 'nghiep1320',

      username: 'Nguyễn Thiện Nghiệp',
      tags: ['Inactive'],
      code: 'Cam_01',
    },
  ];

  return (
    <div>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1>All Devices</h1>
          <Link to="/CreateDevices">
            <Button className={styles.Add_User} type="primary">
              Add Device
            </Button>
          </Link>
        </div>

        <div style={{ display: 'flex' }}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #CBCBCB',
                  width: '493px',
                  borderRadius: '8px',
                }}
              >
                <div>
                  <Select
                    bordered={false}
                    defaultValue="Name"
                    style={{
                      width: 200,
                      border: 'none',
                    }}
                    //   onChange={e => {
                    //     setSearchEmail(e);
                    //   }}
                    options={[
                      {
                        value: 'code',
                        label: 'Code',
                      },
                      {
                        value: 'username',
                        label: 'Name',
                      },
                    ]}
                  />
                </div>

                <div>|</div>

                <div>
                  <Search
                    placeholder="Search"
                    allowClear
                    bordered={false}
                    onSearch={onSearch}
                    //   onChange={handleSearchInputChange}
                    enterButton={
                      <Button
                        type="submit"
                        style={{
                          border: 'none',
                          backgroundColor: '#FFFFFF', // Xóa border của button
                        }}
                      >
                        <SearchOutlined style={{ fontSize: '18px' }} />
                      </Button>
                    }
                    style={{
                      width: '262px',
                      marginLeft: '20px',
                      border: 'none',
                    }}
                  />
                </div>
              </div>
            </Form.Item>
          </Form>

          <div style={{ marginLeft: '50px' }}>
            <div>
              <Select
                defaultValue="Status"
                style={{
                  width: 296,
                }}
                //   onChange={e => {
                //     console.log(e);
                //     setStatus(e);
                //   }}
                options={[
                  {
                    value: '0',
                    label: 'Active',
                  },
                  {
                    value: '1',
                    label: 'Inactive',
                  },
                  {
                    value: '',
                    label: 'All',
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <div>
          <Table columns={columns} dataSource={result} />
        </div>
      </div>
    </div>
  );
}
