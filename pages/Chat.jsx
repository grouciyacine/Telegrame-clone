import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'
import styles from './Chat.module.css'
import { useState,useEffect } from 'react'
import { AttachFile, MoreVert, SearchOutlined,Done, Mic, InsertEmoticon, EmojiObjects } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { collection, getDoc, onSnapshot,doc, getFirestore, addDoc, query, orderBy,serverTimestamp, Timestamp } from 'firebase/firestore'
import {db} from './FireBase'
import {Online,Offline}from 'react-detect-offline'
import {fetchUser}from './fechUserDetails'
import EmojiPicker from 'emoji-picker-react'
const Chat = () => {
const [avatar,setAvatar]=useState('')
const [input,setInput]=useState('')
const[roomName,setRoomName]=useState('')
const [message,setMessage]=useState([])
const[username,setUsername]=useState()
const [showPicker,setShowPicker]=useState(false)
const router=useRouter()
const roomId=router.query.room
const db=getFirestore()
const colRef=collection(db,'rooms')
//const messagRef=collection(db,'rooms',roomId,'Messages')  
useEffect(()=>{
if(roomId){
const idRef=doc(db,'rooms',roomId)
onSnapshot(idRef,(room)=>{
setRoomName(room.data().name)
const messagRef=collection(db,'rooms',roomId,'Messages')
const q=query(messagRef,orderBy('timestamp',"asc"))
onSnapshot(q,(data)=>{
setMessage(data.docs.map(
doc=>doc.data()
)) 
})
})
}},[roomId])
useEffect(()=>{
setAvatar(Math.floor(Math.random()*5000))
const[user]=fetchUser()
setUsername(user)
},[])
const handleSub=(e)=>{
e.preventDefault()
const messagRef=collection(db,'rooms',roomId,'Messages')
addDoc(messagRef,{
message:input,
name:username.displayName,
timestamp:serverTimestamp()
})      
setInput("")
}
const onEmojiClick=()=>{
  setInput(prevInput=>prevInput+EmojiObjects)
  setShowPicker(false)
}
const timestamp={nanoseconds: 638000000,seconds:1665665869}
console.log(new Date(timestamp.seconds*1000).toUTCString())
return (
<div className={styles.chat}>
<div className={styles.chat__header}>
<Avatar src={`https://avatars.dicebear.com/api/human/${avatar}.svg`}/>           
<div className={styles.chat__headerinfo}>
<h3>{roomName}</h3>
<p><Online>
online </Online></p>
<p className={styles.off}><Offline>offline </Offline></p>
</div>
<div className={styles.chat__headerRight}>
<IconButton>
<SearchOutlined/>
</IconButton>
<IconButton>
<AttachFile/>
</IconButton>
<IconButton>
<MoreVert/>
</IconButton>
</div>
</div>
<div className={styles.chat__body}>
{
message.map((mes)=>{
return(
<>
<p className={styles.message_send  }> <span className={styles.name}>{mes.name} </span>{mes.message} 
<span className={styles.time}>
{/*new Date(mes.timestamp?.toDate()).toUTCString()*/
mes.timestamp?(
new Timestamp(mes.timestamp.seconds,mes.timestamp.nanoseconds).toDate().toUTCString()
):(
new Date(timestamp.seconds*1000).toUTCString()
)}
<Done className={styles.done}/> 
</span>
</p> 
</>
)})}     
</div>
<div className={styles.chat__footer}>
<InsertEmoticon  className={styles.icone}/>
{showPicker && <Picker
pickerStyle={{width:'100%'}}
onEmojiClick={onEmojiClick}
/>}
<form action="" >
<input type="text" placeholder='Type a message' value={input} onChange={e=>setInput(e.target.value)} /> 
<button onClick={handleSub}>Send A Message</button>
</form>
<Mic className={styles.icone}/>
</div>
</div>
  )
}

export default Chat