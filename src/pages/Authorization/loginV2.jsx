import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import styles from '../../assets/styles/index.module.css';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../shared/services/http-client';
import Menus from '../menu';

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const Login = () => {

  const navigate = useNavigate(); // Sử dụng hook useNavigate
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const key = [];
  
  useEffect(() => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
      setIsLoggedIn(true);
      navigate('/UserManager');
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const onFinish = (values) => {
    console.log('Success:', values);
    const data = {
      identifier: values.username.trim(),
      password: values.password,
    };


    axiosInstance
      .post('/auth/local', data)
      .then(response => {
        const { jwt } = response;
        if (jwt != null) {
          key.push(jwt); // lưu vào mảng

          message.success('Logged in successfully');
          localStorage.setItem('setIsLoggedIn', true);
          localStorage.setItem('ACCESS_TOKEN', key); // lưu trên local
          setIsLoggedIn(true);
          navigate('/UserManager'); // Chuyển hướng người dùng sau khi đăng nhập thành công
        }
      })
      .catch(error => {
        console.log(error);
        message.error('Login failed');
        setIsLoggedIn(false);
      });

    
  };

 


  if (!isLoggedIn) {
    return (
      <div
        style={{
          display: 'flex',
          backgroundColor: '#FFF',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          className={styles.container}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h1 style={{ textAlign: 'center' }}>Welcome</h1>
          <p style={{ textAlign: 'center' }}>Login to your account</p>
          <p style={{ textAlign: 'center' }}>
            tk: super.admin@grr.la, mk: Super@admin1
          </p>
          <Form.Item
            label={
              <label htmlFor="username" className={styles.textf}>
                Email
              </label>
            }
            name="username" // truyền lên data
            rules={[{ required: true, message: 'Enter email' }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              id="username"
              name='username'
              type='username'
              className={styles.inputf}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            label={
              <label htmlFor="password" className={styles.textf}>
                Password
              </label>
            }
            name="password" // truyền lên data
            rules={[{ required: true, message: 'Enter password' }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              className={styles.inputf}
              id="password"
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            style={{ textAlign: 'center' }}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className={styles.buttonL}
              style={{ width: '100%', background: '#805EDF' }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  // return (
  //   <div>
  //     <Menus />
  //   </div>
  // );
};

export default Login;
