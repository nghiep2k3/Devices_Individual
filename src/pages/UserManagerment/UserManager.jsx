import React, { useEffect, useState } from 'react';
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
import { imgurl } from '../../shared/constants/index';


export default function UserManager() {
  // của form
  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const { Search } = Input;
  const onSearch = value => console.log(value);

  // Call api
  const [dataUser, SetDataUser] = useState('');
  

  //Table
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
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      render: (_, record) => (
        <>
          <span>{record.username}</span>
        </>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Number Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Status',
      key: 'blocked',
      dataIndex: 'blocked',
      render: (_, { blocked }) => (
        <>
          {blocked ? (
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
          <Link to={`/Details/${record.id}`}>
            <EyeOutlined style={{ cursor: 'pointer' }} />
          </Link>
          <Link to="/EditUser">
            <EditOutlined style={{ cursor: 'pointer' }} />
          </Link>
          <DeleteOutlined style={{ cursor: 'pointer' }} />
        </Space>
      ),
    },
  ];

  


  useEffect(() => {
    axiosInstance.get('/users?/users/me?populate=role,avatar').then(response => {
      console.log(33333, response);
      SetDataUser(response);
    });
  }, []);



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
          <h1>All Users</h1>
          <Link to="/Create">
            <Button className={styles.Add_User} type="primary">
              Add user
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
                        value: 'email',
                        label: 'Email',
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
          <Table columns={columns} dataSource={dataUser} />
        </div>
      </div>
    </div>
  );
}
