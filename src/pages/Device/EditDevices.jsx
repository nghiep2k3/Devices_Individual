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
import TextArea from 'antd/es/input/TextArea';

export default function EditDevices() {
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

  


  const [value, setValue] = useState('');
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
              <label className={styles.WordEditUser} htmlFor="code">
                Code <span className={styles.Icon_1_EditUser}>*</span>
              </label>
              <Input
                defaultValue={"Cam_01"}
                style={{
                  height: '56px',

                  padding: '16px',
                }}
                id="code"
              />
            </Col>

            <Col span={8} style={{ margin: '4px 0' }}>
              <label className={styles.WordEditUser} htmlFor="name">
                Name <span className={styles.Icon_1_EditUser}>*</span>
              </label>
              <Input
              defaultValue={"Nguyễn Thiện Nghiệp"}
                style={{
                  height: '56px',

                  padding: '16px',
                }}
                id="name"
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
              Address <span className={styles.Icon_1_EditUser}>*</span>
            </label>
          </div>

          <div
            style={{
              margin: '24px 0',
            }}
          />
          <TextArea
            defaultValue={"Duyên Hải - Hưng Hà - Thái Bình"}
            onChange={e => setValue(e.target.value)}
            placeholder="Enter a address"
            autoSize={{
              minRows: 6,
              maxRows: 7,
            }}
          />

          <div style={{ marginTop: '24px', paddingBottom: '24px' }}>
            <Space wrap>
              <Link to="/DevicesManager">
                <Button
                  className={styles.ButtonViewProfile_Update}
                  type="primary"
                >
                  Save
                </Button>
              </Link>

              <Link to="/DevicesManager">
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
