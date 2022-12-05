import { Avatar } from '@material-ui/core'
import { Done } from '@material-ui/icons'
import { addDoc, collection, Firestore, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore'
import Link from 'next/link'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './SideBarchat.module.css'
const SideBarchat = ({addnewchat,name,id}) => {
const [avatar,setAvatar]=useState('')
const [message,setMessage]=useState('')
useEffect(()=>{
setAvatar(Math.floor(Math.random()*5000))
},[])
const createChat=()=>{
const roomName= prompt('Enter New Converssation')
if(roomName){
const db=getFirestore()
const  colRef=collection(db,'rooms')
addDoc(colRef,{
  name:roomName
})}}
useEffect(()=>{
  if(id){
  const db=getFirestore()
  const messageRef=collection(db,'rooms',id,'Messages')
  const q=query(messageRef,orderBy('timestamp','desc'))
onSnapshot(q,(data)=>{
  setMessage(data.docs.map(
   doc=>doc.data() 
  ))
})
  }
},[])


  


  return !addnewchat ?(
    
    <div className={styles.sidebarchat}>
       <Avatar src={`https://avatars.dicebear.com/api/human/${avatar}.svg`}/>
     
     <Link as={`/Room/${id}`} href={`/[rooms]/[room]`}>
      
       <div className={styles.sidebarchat__info}>
        <h2>{name}</h2>
    
        <p>{message[0]?.message}</p>
        <div className={styles.sidebarchat__infoRight}>
           <Done/>
        </div>
      </div>
     </Link>
   
    </div>
  ):(
    <div onClick={createChat} className={styles.sidebarchat} >
      <h2 className='add'>
            Add New Chat 
      </h2>
 
    </div>
    
  )
}

export default SideBarchat