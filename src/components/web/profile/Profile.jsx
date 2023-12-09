import React, { useContext } from 'react'
import { UserContext } from './../context/User';
import './Profile.css'
export default function Profile() {
    const {userData}= useContext(UserContext);
    console.log(userData)
  return (
    <>
    <div className="container bb">
    <div className="row">
      <div className="col-md-4">
        <img className='mt-5 ' 
        src={userData?userData.image.secure_url:"" }/>
      <h1 className='mt-5 tt'>
        {userData?userData.userName:"" }</h1>
      <p className='t'>{userData?userData.email:""}</p>
    </div>
  </div>
  </div>
  </>
  )
}
