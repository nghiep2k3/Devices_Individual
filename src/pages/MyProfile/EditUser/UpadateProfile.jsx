import React, { useEffect, useState } from 'react';
import { CameraOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Modal,
  Upload,
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Space,
  Spin,
  message,
} from 'antd';

import styles from '../../../assets/styles/index.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../shared/services/http-client';
import moment from 'moment';

export default function UpadateProfile() {
  const individual = useParams();

  const navigate = useNavigate();
  const getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const { RangePicker } = DatePicker;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg',
    // },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <CameraOutlined />
      <span className="Text"></span>
    </div>
  );

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  
  // Name input
  const [inputValue, setInputValue] = useState('Initial text');
  const handleInputChange = event => {
    setInputValue(event.target.value);
  };
  
  // Call api
  const [form] = Form.useForm();
  const [userProfile, setUserProfile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const userId = individual.id;
  console.log(userId);

  // muốn dùng useEffect có try catch phải dùng như này
  // useId nhận giá trị từ call api bên viewProfile
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        axiosInstance
          .get(`/users/${individual.id}?populate=role`)
          .then(response => {
            // console.log(response);
            console.log(response?.dob);
            setUserProfile(response);
            setSelectedDate(response?.dob)
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [userId]);


  // Convert DOB
  const defaultDate = moment(`${userProfile?.dob}`);
  
  const OnChangeDob = (dateString) => {
    console.log('Selected date string:', dateString);
    setSelectedDate(dateString);
    console.log(555, dateString);
  };
  
  console.log(111, selectedDate);
  const onFinish = async values => {
    console.log('Submitted values:', values);
    
    // Copy giá trị defaultValue vào các trường input khi submit
    const newValues = { ...values };
    // console.log('name', newValues.name);
    // console.log('sdt', newValues.number_phone);
    
    const data = {
      fullname: newValues.name,
      phoneNumber: newValues.number_phone,
      dob: selectedDate,
    };

  

    try {
      const response = await axiosInstance.put(`/users/${individual.id}`, data);
      if (response != null) {
        navigate('/ViewProfile');
        message.success('Success');
        // await onChange(); // Gọi hàm onChange
      }
    } catch (error) {
      console.log(error);
      message.error('error');
    }
  };

  if (userProfile != null) {
    return (
      <div>
        <div className={styles.Container}>
          <div style={{ width: '60%' }}>
            <div className={styles.Uploadv}>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 0 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </div>

          <div style={{ width: '40%' }}>
            <>
              <Form
                onFinish={onFinish}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 20,
                }}
                layout="horizontal"
                form={form}
                id="myForm"
              >
                <div style={{ marginBottom: '5px' }}>
                  <label htmlFor="Name">Name</label>
                </div>
                <Form.Item name="name" initialValue={userProfile?.fullname}>
                  <Input id="Name" type="text" />
                </Form.Item>

                <div style={{ marginBottom: '5px' }}>
                  <label htmlFor="Email">Email</label>
                </div>
                <Form.Item name="email" initialValue={userProfile?.email}>
                  <Input disabled type="text" id="Email" />
                </Form.Item>

                <div style={{ marginBottom: '5px' }}>
                  <label htmlFor="Username">Username</label>
                </div>
                <Form.Item name="username" initialValue={userProfile?.username}>
                  <Input disabled type="text" id="Username" />
                </Form.Item>

                <div
                  style={{
                    display: 'flex',
                    width: '413.06px',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ width: '181.53px' }}>
                    <div style={{ marginBottom: '5px' }}>
                      <label htmlFor="Dob">Dob</label>
                    </div>

                    <Form.Item name="dob">
                      <DatePicker
                        defaultValue={defaultDate}
                        id="Dob"
                        onChange={OnChangeDob}
                      />
                    </Form.Item>
                  </div>

                  <div style={{ width: '181.5px' }}>
                    <div style={{ marginBottom: '5px' }}>
                      <label htmlFor="Number_Phone">Number phone</label>
                    </div>
                    <Form.Item
                      name="number_phone"
                      initialValue={userProfile?.phoneNumber}
                    >
                      <Input
                        style={{ width: '181.5px' }}
                        id="Number_Phone"
                        type="tel"
                      />
                    </Form.Item>
                  </div>
                </div>

                <div style={{ marginBottom: '5px' }}>
                  <label htmlFor="Address">Address</label>
                </div>
                <Form.Item name="address" initialValue={userProfile?.provider}>
                  <Input id="Address" defaultValue={userProfile?.provider} />
                </Form.Item>

                <div style={{ marginBottom: '5px' }}>
                  <label htmlFor="Role">Role</label>
                </div>
                <Form.Item name="role" initialValue={userProfile?.role.name}>
                  <Input
                    disabled
                    type="text"
                    id="Role"
                    defaultValue={userProfile?.role.name}
                  />
                </Form.Item>

                <Form.Item>
                  <div
                    style={{
                      borderTop: '2px solid black',
                      paddingTop: '24px',
                      marginTop: '10px',
                    }}
                  >
                    <Space wrap>
                      <div>
                        <Button
                          htmlType="submit"
                          form="myForm"
                          className={styles.ButtonViewProfile_Update}
                          type="primary"
                        >
                          Save
                        </Button>
                      </div>

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
      </div>
    );
  } else {
    return (
      <Spin
        size="large"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      />
    );
  }
}
