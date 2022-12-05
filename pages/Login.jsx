import React, { useState } from 'react'
import Style from './Login.module.css'
import logo from './logo.svg.webp'
import Image from 'next/image'
import {getAuth, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { useStateValue } from './StateProvider'
import {actionTypes} from './reducer'
import {FcGoogle} from 'react-icons/fc'
import {useRouter}from 'next/router'
const Login = () => {
const auth=getAuth()
const googlePr=new GoogleAuthProvider()
const [email,setEmail]=useState()
const [password,setpassword]=useState()
const router=useRouter()
const google=async()=>{
const {user}=await signInWithPopup(auth,googlePr)
console.log(user)
const {refreshToken,providerData}=user
console.log(refreshToken,providerData)
localStorage.setItem('user',JSON.stringify(providerData))
localStorage.setItem('accessToken',JSON.stringify(refreshToken))
router.push('/')

/* signInWithPopup(auth,googlePr)
 .then((res)=>console.log(res.user))
 .catch((err)=>alert(err))
*/}
/*const create=()=>{
createUserWithEmailAndPassword(auth,email,password)
.then((res)=>console.log(res))
.catch((err)=>alert(err))   
}*/
return (
<>    
<div className={Style.container}>
<Image src={logo} className={Style.im}  width="200" height="200" />
<div className={Style.text}>
<h2  className={Style.tite}>Sign In To Telegram</h2>
<div className={Style.inp}>
<input className={Style.text} value={email} onChange={(e)=>setEmail(e.target.value)} type="text"  placeholder='enter email' />
<br />
<input className={Style.text} type="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='password' />
</div>
<div className={Style.but}>
<button onClick={google} className={Style.button} >Login With <FcGoogle fontSize={30}/></button>

</div>

</div> 

</div>   
    </>

)
}

export default Login