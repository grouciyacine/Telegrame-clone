import React from 'react'
import styles from '../index.module.css' 
import SideBar from '../SideBar'
import Chat from '../Chat'
const Room = () => {
  return (
    <div className={styles.app}>
    <div className={styles.app_body}>
    
    <SideBar/>
    <Chat/>
    
    
    </div>
    <div className={styles.footer}>
    
    </div>
    </div>
  )
}

export default Room