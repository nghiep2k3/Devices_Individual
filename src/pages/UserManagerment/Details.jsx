import React, { useEffect, useState } from 'react';
import styles from '../../assets/styles/index.module.css';
import { Button, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { axiosInstance } from '../../shared/services/http-client';

export default function Details() {
  const id = useParams();
  const [data, setData] = useState('');
  const [role, setRole] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        axiosInstance
          .get(`/users/${id.id}?populate=role`)
          .then(response => {
            console.log(response);
            console.log('role', response?.role.name);
            setData(response);     
            setRole(response?.role.name);      
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <div className={styles.Container_Details}>
        <div>
          <p className={styles.Details_View1}>Name</p>
          <p className={styles.Details_View2}>{data.fullname}</p>
        </div>
        <div>
          <p className={styles.Details_View1}>Email</p>
          <p className={styles.Details_View2}>{data.email}</p>
        </div>
        <div>
          <p className={styles.Details_View1}>User Name</p>
          <p className={styles.Details_View2}>{data.username}</p>
        </div>

        <div>
          <p className={styles.Details_View1}>Dob</p>
          <p className={styles.Details_View2}>{data.dob}</p>
        </div>
        <div>
          <p className={styles.Details_View1}>Phone Number</p>
          <p className={styles.Details_View2}>{data.phoneNumber}</p>
        </div>
        <div>
          <p className={styles.Details_View1}>Gender</p>
          <p className={styles.Details_View2}>{data.gender}</p>
        </div>

        <div>
          <p className={styles.Details_View1}>Role</p>
          <p className={styles.Details_View2}>{role}</p>
        </div>
      </div>

      <div>
        <p
          className={styles.Details_View1}
          style={{ marginTop: '24px', paddingBottom: '16px' }}
        >
          Devices
        </p>
        <div style={{
          border: '1px solid var(--neutral-dark-5, #DDE4EE)',
          borderRadius: '8px',
          padding: '10px 0 10px 10px'
        }}>
          <p className={styles.Details_View3}>Devices ABC</p>
          <p className={styles.Details_View3}>TLS</p>
          <p className={styles.Details_View3}>AHC</p>
          <p className={styles.Details_View3}>CB Devices</p>
          <p className={styles.Details_View3}>UCQ</p>
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
          <Link to="/EditUser">
            <Button className={styles.ButtonViewProfile_Update} type="primary">
              Edit
            </Button>
          </Link>

          <Link to="/ViewProfile">
            <Button className={styles.ButtonViewProfile_Change}>Delete</Button>
          </Link>
        </Space>
      </div>
    </div>
  );
}
