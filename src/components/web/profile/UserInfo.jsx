import React, { useContext } from 'react'
import style  from './Profile.module.css';
import { UserContext } from '../context/User';
export default function UserInfo() {
    const {userData,loading}= useContext(UserContext);
    if(loading){
        return <p>...Loading</p>
      }
  return (
    <>
    <div className={`${style.userData}`}>
     <h2>{userData.userName}</h2>
    <img  src={userData.image.secure_url} />
     </div>
    </>
  )
}
