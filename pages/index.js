import Head from 'next/head'
import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import styles from '../pages/index.module.css'
import SideBar from './SideBar'
import Chat from './Chat'
import Router from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import Login from './Login'
import { userAccessToken } from './fechUserDetails'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function Home() {

const[user,setUser]=useState("")
const router=useRouter()
useEffect(()=>{
const accessToken=userAccessToken()
if(!accessToken) return router.push("/Login")
},[])
return (
<div className={styles.app}>
<>
<div className={styles.app_body}>
<SideBar/>
<Chat/>
</div>
<div className={styles.footer}>
</div>    
</>
</div>
)}
