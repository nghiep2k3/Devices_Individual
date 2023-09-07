import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Col, Dropdown, message, Row, Space } from 'antd';
import { Link } from 'react-router-dom';

export default function DropdownS() {
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const Log = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('setIsLoggedIn');
  };

  const items = [
    {
      label: <Link to="/ViewProfile">Profile</Link>,
      key: '1',
    },
    {
      label: (
        <Link to="/" onClick={Log}> 
          Log out
        </Link>
      ),
      key: '2',
    },
  ];
  return (
    <div>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
        arrow
      >
        <div className="set">
          <Row span={24}>
            <Col span={8}>
              {/* {avatar ? (
                <img
                  // src={`${imgurl}${avatar}`} sau này dùng cho ảnh
                  src={`https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/hinh-anh-co-gai-cute-anime-8-min-4.jpg`}
                  alt=""
                  style={{
                    height: '32px',
                    width: '32px',
                    borderRadius: '20px',
                  }}
                />
              ) : (
                <img
                  // src={`${imgurl}/uploads/avt.png`}
                  src={`https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/hinh-anh-co-gai-cute-anime-8-min-4.jpg`}
                  alt=""
                  style={{
                    height: '32px',
                    width: '32px',
                    borderRadius: '20px',
                  }}
                />
              )} */}

              <img
                // src={`${imgurl}/uploads/avt.png`}
                src={`https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/hinh-anh-co-gai-cute-anime-8-min-4.jpg`}
                alt=""
                style={{
                  height: '32px',
                  width: '32px',
                  borderRadius: '20px',
                }}
              />
            </Col>
            <Col span={16}>
              <div className="set">
                <Row span={24} className="NameM">
                  <p>Nghiep1320</p>
                </Row>
                <Row span={24}>
                  <p className="RoleM">Admin</p>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Dropdown>
    </div>
  );
}
