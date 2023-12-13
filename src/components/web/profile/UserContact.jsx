
import React, { useContext } from 'react'
import style  from './Profile.module.css';
import { UserContext } from '../context/User';

export default function UserContact() {
    const {userData,loading}= useContext(UserContext);
    if(loading){
        return <p>...Loading</p>
      }
  return (
    <>
    <div className={`${style.userData}`}>
    <p className='t'>{userData.email}</p>
    </div>

    </>
  )
}
