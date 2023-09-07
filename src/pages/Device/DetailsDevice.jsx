import React from 'react';
import styles from '../../assets/styles/index.module.css';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

export default function Details() {
  return (
    <div>
      <div className={styles.Container_Details}>
        <div>
          <p className={styles.Details_View1}>Code</p>
          <p className={styles.Details_View2}>Cam_01</p>
        </div>
        <div>
          <p className={styles.Details_View1}>Email</p>
          <p className={styles.Details_View2}>nguyennghiep1320@gmail.com</p>
        </div>
        <div>
          <p className={styles.Details_View1}>User Name</p>
          <p className={styles.Details_View2}>Nghiep1320</p>
        </div>

        <div>
          <p className={styles.Details_View1}>Role</p>
          <p className={styles.Details_View2}>Admin</p>
        </div>
      </div>

      <div
        style={{
          borderTop: '2px solid #DDE4EE',
          paddingTop: '24px',
          marginTop: '10px',
        }}
      >
        <Space wrap>
          <Link to="/EditDevices">
            <Button className={styles.ButtonViewProfile_Update} type="primary">
              Edit
            </Button>
          </Link>

          <Link to="/DevicesManager">
            <Button className={styles.ButtonViewProfile_Change}>Delete</Button>
          </Link>
        </Space>
      </div>
    </div>
  );
}
