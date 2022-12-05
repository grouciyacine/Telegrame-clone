import { Avatar, IconButton } from '@material-ui/core'
import { Chat, DonutLarge, Menu, MoreVert, Search, SearchOutlined, Unsubscribe } from '@material-ui/icons'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './SideBar.module.css'
import SideBarchat from './SideBarchat'
import {app,db} from './FireBase'
import { collection, getDocs, getFirestore, onSnapshot } from 'firebase/firestore'
import {IoLogOut} from 'react-icons/io5'
import  {fetchUser} from './fechUserDetails'
import { useRouter } from 'next/router'
const SideBar = () => {
const[room,setRoms]=useState([])
const [user,setUser]=useState({})
const rout=useRouter()
useEffect(()=>{
const db=getFirestore()
const colRef=collection(db,'rooms')
onSnapshot(colRef,(snapshot)=>{
setRoms(snapshot.docs.map((doc)=>({
id:doc.id,
data : doc.data(),
})))
})},[])
useEffect(()=>{
const [userInfo]=fetchUser()
setUser(userInfo)
},[])
const logout=()=>{
  localStorage.clear()
rout.push('/Login')
}
return (
<div className={styles.sidebar}>
<div className= {styles.sidebar__header}>
<Avatar src={user ?.photoURL} />
<div className={styles.sidebar__headerRight}>
<IconButton>
<IoLogOut onClick={logout} />
</IconButton>
<IconButton>
<DonutLarge/>
</IconButton>
<IconButton>
<Chat/>   
</IconButton>
<IconButton>
<MoreVert/>   
</IconButton>
</div>
</div>
<div className={styles.sidebar__search}>
<IconButton>
<Menu/>     
</IconButton>
<div className={styles.sidebar__searchcontainer}>
<SearchOutlined className={styles.searchicone}/>
<input type="text" placeholder='Search' />
</div>

</div>
<div className={styles.sidebar__chats}>
<SideBarchat addnewchat/>
{
room.map(room=>(
  <SideBarchat name={room.data.name} id={room.id} key={room.id}/>

  ))

}
</div>
</div>
  )
}

export default SideBar