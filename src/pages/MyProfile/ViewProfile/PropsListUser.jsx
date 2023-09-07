import React from 'react'
import styles from './main.module.css'


export default function PropsListUser(props) {
  return (
    <div>
        <div className={styles.colorTitle}>{props.title}</div>
        <div style={{ fontWeight: 'bold' }}>{props.name}</div>
    </div>
  )
}
