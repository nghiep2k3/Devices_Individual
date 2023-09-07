import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  Form,
  Button,
  Col,
  Row,
  Select,
  DatePicker,
  message,
  Checkbox,
  List,
  Table,
  Space,
  Divider,
  Switch,
  Transfer,
} from 'antd';
import styles from '../../assets/styles/index.module.css';
import moment from 'moment/moment';

export default function EditUserManager() {
  // Dob
  const defaultDate = moment('2000-08-15', 'YYYY-MM-DD');

  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const { Option } = Select;
  const [form] = Form.useForm();
  const handleChange = value => {
    console.log(`selected ${value}`);
  };

  //Transfer
  const mockData = Array.from({
    length: 5,
  }).map((_, i) => {
    let title;
    switch (i % 5) {
      case 0:
        title = 'Devices ABC';
        break;
      case 1:
        title = 'TLS';
        break;
      case 2:
        title = 'AHC';
        break;
      case 3:
        title = 'CB Devices';
        break;
      case 4:
        title = 'UCQ';
        break;
      default:
        title = `content${i + 1}`;
    }

    return {
      key: i.toString(),
      title: title,
      description: `description of content${i + 1}`,
    };
  });

  const oriTargetKeys = mockData
    .filter(item => Number(item.key) % 2 > 1)
    .map(item => item.key);

  const [targetKeys, setTargetKeys] = useState(oriTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleChange2 = (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys);
    // console.log('targetKeys: ', newTargetKeys);
    // console.log('direction: ', direction);
    // console.log('moveKeys: ', moveKeys);
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    // console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    // console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  const handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };
  const handleSearch = value => {
    console.log('search:', value);
    setSearchValue(value); // Cập nhật giá trị tìm kiếm
  };

  // Tạo danh sách dữ liệu nguồn dựa trên giá trị tìm kiếm
  const filteredDataSource = mockData.filter(item =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <h2>All Devices &gt; Nghiep1320</h2>
      <div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={[32, 32]} className={styles.RowStyles}>
            <Col span={8} style={{ margin: '4px 0' }}>
              <label className={styles.WordEditUser} htmlFor="name">
                Name <span className={styles.Icon_1_EditUser}>*</span>
              </label>
              <Input
                defaultValue="Nguyen Thien Nghiep"
                style={{
                  height: '56px',

                  padding: '16px',
                }}
                id="name"
              />
            </Col>

            <Col span={8} style={{ margin: '4px 0' }}>
              <label className={styles.WordEditUser} htmlFor="Email">
                Email <span className={styles.Icon_1_EditUser}>*</span>
              </label>
              <Input
                defaultValue="nguyenghiep1320@gmail.com"
                style={{
                  height: '56px',

                  padding: '16px',
                }}
                id="Email"
              />
            </Col>

            <Col span={8} style={{ margin: '4px 0' }}>
              <label className={styles.WordEditUser} htmlFor="UserName">
                UserName <span className={styles.Icon_1_EditUser}>*</span>
              </label>
              <Input
                defaultValue="Nghiep Nguyen"
                style={{
                  height: '56px',

                  padding: '16px',
                }}
                id="UserName"
              />
            </Col>
          </Row>

          <Row gutter={[32, 32]}>
            <Col span={8} style={{ margin: '4px 0' }}>
              <label className={styles.WordEditUser} htmlFor="PassWord">
                PassWord <span className={styles.Icon_1_EditUser}>*</span>
              </label>
              <Input.Password
                style={{
                  height: '56px',

                  padding: '16px',
                }}
                id="PassWord"
              />
            </Col>

            <Col span={8} style={{ margin: '4px 0' }}>
              <label className={styles.WordEditUser} htmlFor="Number_Phone">
                Number Phone <span className={styles.Icon_1_EditUser}>*</span>
              </label>
              <Input
                style={{
                  height: '56px',

                  padding: '16px',
                }}
                id="Number_Phone"
                type="tel"
                defaultValue="0378936634"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              />
            </Col>

            <Col span={8} style={{ margin: '4px 0' }}>
              <label className={styles.WordEditUser} htmlFor="Gender">
                Gender <span className={styles.Icon_1_EditUser}>*</span>
              </label>
              <Select
                defaultValue="Male"
                style={{
                  width: '100%',
                  // height: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onChange={handleChange}
                options={[
                  {
                    value: 'Male',
                    label: 'Male',
                  },
                  {
                    value: 'InActive',
                    label: 'InActive',
                  },
                ]}
              />
            </Col>
          </Row>

          <Row gutter={[32, 32]}>
            <Col span={8} style={{ margin: '4px 0' }}>
              <label className={styles.WordEditUser} htmlFor="Dob">
                Dob <span className={styles.Icon_1_EditUser}>*</span>
              </label>
              <div>
                <DatePicker
                  id="Dob"
                  defaultValue={defaultDate}
                  style={{ width: '100%', height: '56px' }}
                />
              </div>
            </Col>

            <Col span={8} style={{ margin: '4px 0' }}>
              <label className={styles.WordEditUser} htmlFor="Role">
                Role <span className={styles.Icon_1_EditUser}>*</span>
              </label>
              <Select
                id="Role"
                defaultValue="User"
                style={{
                  width: '100%',
                  // height: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onChange={handleChange}
                options={[
                  {
                    value: 'Admin',
                    label: 'Admin',
                  },
                  {
                    value: 'User',
                    label: 'User',
                  },
                ]}
              />
            </Col>

            <Col span={8} style={{ margin: '4px 0' }}>
              <label className={styles.WordEditUser} htmlFor="Status">
                Status <span className={styles.Icon_1_EditUser}>*</span>
              </label>
              <Select
                id="Status"
                defaultValue="Active"
                style={{
                  width: '100%',
                  // height: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onChange={handleChange}
                options={[
                  {
                    value: 'Active',
                    label: 'Active',
                  },
                  {
                    value: 'InActive',
                    label: 'InActive',
                  },
                ]}
              />
            </Col>
          </Row>

          <div style={{ marginBottom: '10px' }}>
            <label className={styles.WordEditUser} htmlFor="Devices">
              Devices <span className={styles.Icon_1_EditUser}>*</span>
            </label>
          </div>

          <div>
            <Input
              placeholder="Search for devices ..."
              onSearch={handleSearch}
              style={{ marginBottom: 16, width: '48.5%' }}
              onChange={e => setSearchValue(e.target.value)}
            />

            <Transfer
              dataSource={filteredDataSource}
              titles={['Source', 'Target']}
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              onChange={handleChange2}
              onSelectChange={handleSelectChange}
              onScroll={handleScroll}
              render={item => (
                <span>
                  {item.title === 'Devices ABC' && (
                    <span style={{ color: 'blue' }}>{item.title}</span>
                  )}
                  {item.title === 'TLS' && (
                    <span style={{ color: 'green' }}>{item.title}</span>
                  )}
                  {item.title === 'AHC' && (
                    <span style={{ color: 'red' }}>{item.title}</span>
                  )}
                  {item.title === 'CB Devices' && (
                    <span style={{ color: 'purple' }}>{item.title}</span>
                  )}
                  {item.title !== 'Devices ABC' &&
                    item.title !== 'TLS' &&
                    item.title !== 'AHC' &&
                    item.title !== 'CB Devices' &&
                    item.title}
                </span>
              )}
              oneWay
              style={{
                marginBottom: 16,
              }}
            />
          </div>

          <div>
            <Space wrap>
              <Link to="/UserManager">
                <Button
                  className={styles.ButtonViewProfile_Update}
                  type="primary"
                >
                  Save
                </Button>
              </Link>

              <Link to="/UserManager">
                <Button className={styles.ButtonViewProfile_Change}>
                  Cancel
                </Button>
              </Link>
            </Space>
          </div>
        </Form>
      </div>
    </div>
  );
}
