import { Button, DatePicker, Form, Input, Space, message } from 'antd';
import React from 'react';
import styles from '../../../assets/styles/index.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../shared/services/http-client';

export default function ChangePass() {
  // Call Api
  const [form] = Form.useForm();
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const onFinish = async values => {

    const GetDataInput = { ...values };
    const data = {
      currentPassword: GetDataInput.CurentPass,
      password: GetDataInput.New_Password,
      passwordConfirmation: GetDataInput.Confirm_Password,
    };

    try {
      const response = await axiosInstance.post(`/auth/change-password`, data);
      if (response != null ) {
        navigate('/ViewProfile');
        message.success('Success');
      }
    } catch (error) {
      console.log(error);
      message.error('error');
    }


  };

  return (
    <div>
      <h1>Change Password</h1>
      <div className={styles.ChangePassViewP}>
        <p style={{ padding: '10px 0 10px 0' }}>
          Now you can create a new password for your acconut
        </p>

        <>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 10,
            }}
            form={form}
            layout="horizontal"
            id="FromChangePass"
            onFinish={onFinish}
          >
            <div style={{ marginBottom: '5px' }}>
              <label htmlFor="Current_Password">Current Password</label>
            </div>
            <Form.Item name="CurentPass">
              <Input
                type="text"
                id="Current_Password"
                className={styles.InputChange}
              />
            </Form.Item>

            <div style={{ marginBottom: '5px' }}>
              <label htmlFor="New_Password">New Password</label>
            </div>
            <Form.Item
              name="New_Password"
              id="New_Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div style={{ marginBottom: '5px' }}>
              <label htmlFor="Confirm_Password">Confirm Password</label>
            </div>
            <Form.Item
              name="Confirm_Password"
              id="Confirm_Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <div>
                <Space wrap>
                  <Button
                    className={styles.ButtonViewProfile_Update}
                    type="primary"
                    htmlType="submit"
                    form="FromChangePass"
                  >
                    Save
                  </Button>

                  <Link to="/ViewProfile">
                    <Button className={styles.ButtonViewProfile_Change}>
                      Cancel
                    </Button>
                  </Link>
                </Space>
              </div>
            </Form.Item>
          </Form>
        </>
      </div>
    </div>
  );
}
