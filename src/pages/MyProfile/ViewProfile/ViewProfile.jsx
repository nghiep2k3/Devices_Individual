import React, { useEffect, useState } from 'react';
import { Modal, Spin, Upload, message } from 'antd';
import styles from '../../../assets/styles/index.module.css';
import PropsListUser from './PropsListUser';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';
import { axiosInstance } from '../../../shared/services/http-client';
import moment from 'moment';

export default function ListUser() {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

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

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const customUploadButton = (
    <div>
      <EyeOutlined />
      <div className="ant-upload-text">View</div>
    </div>
  );

  // Call api
  const [data, setData] = useState('');
  useEffect(() => {
    axiosInstance.get('/users/me').then(response => {
      // console.log(response.id);
      setData(response);
    });
  }, []);
  // convert dob
  const formattedDate = moment(data.dob).format('DD-MM-YYYY');
  //test id

  if (localStorage.getItem('ACCESS_TOKEN') == null) {
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
  return (
    <div>
      <h1>My Profile</h1>
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: '50%', textAlign: 'center' }}>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            showUploadList={{
              showPreviewIcon: true,
              showRemoveIcon: false, // Set to false to hide the remove icon
            }}
            customRequest={({ onSuccess }) => setTimeout(onSuccess, 0)} // This is just a workaround to prevent actual upload
          >
            {fileList.length >= 1 ? null : customUploadButton}
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

        <div>
          <div className={styles.gridListUser}>
            <div className={styles.Name}>
              <PropsListUser name={data.fullname} title="Tên"></PropsListUser>
            </div>
            <div className={styles.Email}>
              <PropsListUser title="Email" name={data.email}></PropsListUser>
            </div>

            <div className={styles.Phone}>
              <PropsListUser
                title="Phone Number"
                name={data.phoneNumber}
              ></PropsListUser>
            </div>

            <div className={styles.Dob}>
              <PropsListUser title="Dob" name={formattedDate}></PropsListUser>
            </div>

            <div className={styles.Address}>
              <PropsListUser
                title="Address"
                name={data.provider}
              ></PropsListUser>
            </div>

            <div className={styles.Role}>
              <PropsListUser title="Role" name="Admin"></PropsListUser>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '2px solid black',
          paddingTop: '24px',
          marginTop: '32px',
        }}
      >
        <Space wrap>
          <Link to={`/UpdateProfile/${data.id}`}>
            <Button className={styles.ButtonViewProfile_Update} type="primary">
              Update Profile
            </Button>
          </Link>
          <Link to="/ChangePass">
            <Button className={styles.ButtonViewProfile_Change}>
              Change PassWord
            </Button>
          </Link>
        </Space>
      </div>
    </div>
  );
}
