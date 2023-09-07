import React, { useEffect, useState } from 'react';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  SmileOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, Row, Col } from 'antd';
import '../assets/styles/index.css';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import DropdownS from './DropdownS';

const { Header, Sider, Content } = Layout;

const Menus = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Lấy dữ liệu từ Local Storage khi trang tải
  useEffect(() => {
    const savedKey = localStorage.getItem('selectedKey');
    if (savedKey) {
      setSelectedKey(savedKey);
    }
  }, []);

  // Xử lý khi click vào một mục menu
  const handleMenuClick = key => {
    setSelectedKey(key);
    // Lưu giá trị mục được chọn vào Local Storage
    localStorage.setItem('selectedKey', key);
  };

  return (
    <Layout style={{ height: '866px' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h1
          style={{
            color: 'White',
            fontFamily: 'Poppins',
            fontSize: '18px',
            marginTop: '10px',
            padding: '10px 0 10px 10px',
          }}
        >
          Menu
        </h1>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M0 3.25C0 1.45507 1.45507 0 3.25 0H14.75C16.5449 0 18 1.45507 18 3.25V14.75C18 16.5449 16.5449 18 14.75 18H3.25C1.45507 18 0 16.5449 0 14.75V3.25ZM3.25 1.5C2.2835 1.5 1.5 2.2835 1.5 3.25V14.75C1.5 15.7165 2.2835 16.5 3.25 16.5H10.5V1.5H3.25ZM14.75 16.5C15.7165 16.5 16.5 15.7165 16.5 14.75V13H12V16.5H14.75ZM16.5 11.5V6.5H12V11.5H16.5ZM16.5 5V3.25C16.5 2.2835 15.7165 1.5 14.75 1.5H12V5H16.5ZM3 10.75C3 10.3358 3.33579 10 3.75 10H8.25C8.6642 10 9 10.3358 9 10.75C9 11.1642 8.6642 11.5 8.25 11.5H3.75C3.33579 11.5 3 11.1642 3 10.75ZM4.25 3.5C3.55964 3.5 3 4.05964 3 4.75V7.25C3 7.9404 3.55964 8.5 4.25 8.5H7.75C8.4404 8.5 9 7.9404 9 7.25V4.75C9 4.05964 8.4404 3.5 7.75 3.5H4.25ZM4.5 7V5H7.5V7H4.5ZM3 13.75C3 13.3358 3.33579 13 3.75 13H8.25C8.6642 13 9 13.3358 9 13.75C9 14.1642 8.6642 14.5 8.25 14.5H3.75C3.33579 14.5 3 14.1642 3 13.75Z"
                    fill="#919FB6"
                  />
                </svg>
              ),
              label: (
                <>
                  <Link to="/UserManager">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>User</span>
                      <RightOutlined
                        style={{ right: '10px', position: 'absolute' }}
                      />
                    </div>
                  </Link>
                </>
              ),
            },
            {
              key: '2',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 6.25C3 4.45507 4.45507 3 6.25 3H17.75C19.5449 3 21 4.45507 21 6.25V17.75C21 19.5449 19.5449 21 17.75 21H6.25C4.45507 21 3 19.5449 3 17.75V6.25ZM6.25 4.5C5.2835 4.5 4.5 5.2835 4.5 6.25V17.75C4.5 18.7165 5.2835 19.5 6.25 19.5H13.5V4.5H6.25ZM17.75 19.5C18.7165 19.5 19.5 18.7165 19.5 17.75V16H15V19.5H17.75ZM19.5 14.5V9.5H15V14.5H19.5ZM19.5 8V6.25C19.5 5.2835 18.7165 4.5 17.75 4.5H15V8H19.5ZM6 13.75C6 13.3358 6.33579 13 6.75 13H11.25C11.6642 13 12 13.3358 12 13.75C12 14.1642 11.6642 14.5 11.25 14.5H6.75C6.33579 14.5 6 14.1642 6 13.75ZM7.25 6.5C6.55964 6.5 6 7.05964 6 7.75V10.25C6 10.9404 6.55964 11.5 7.25 11.5H10.75C11.4404 11.5 12 10.9404 12 10.25V7.75C12 7.05964 11.4404 6.5 10.75 6.5H7.25ZM7.5 10V8H10.5V10H7.5ZM6 16.75C6 16.3358 6.33579 16 6.75 16H11.25C11.6642 16 12 16.3358 12 16.75C12 17.1642 11.6642 17.5 11.25 17.5H6.75C6.33579 17.5 6 17.1642 6 16.75Z"
                    fill="#919FB6"
                  />
                </svg>
              ),

              label: (
                <>
                  <Link to="/DevicesManager">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>Devices</span>
                      <RightOutlined
                        style={{ right: '10px', position: 'absolute' }}
                      />
                    </div>
                  </Link>
                </>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            lineHeight: '0px',
            justifyContent: 'space-between',
            background: colorBgContainer,
          }}
        >
          <div>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>

          <Link to="/Test">Test</Link>

          <div>
            <DropdownS />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Menus;
