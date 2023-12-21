import React, { useContext } from 'react'
import { UserContext } from './../context/User';
import style  from './Profile.module.css';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Profile() {
    const {userData,loading}= useContext(UserContext);
    if(loading){
      return <p>...Loading</p>
    }
    console.log(userData)
  return (
    <>
    <aside className={`${style.profile}` }>
      <div className={`${style.profileLinks}`}>
        <nav className='na'>
          <Link to=''>Info</Link>
          <Link to='contact'>Contact</Link>
          <Link to='getorder'>Order</Link>
        </nav>

      </div>

        <div className={`${style.userData}`}>
          <Outlet/>
        </div>

 
  </aside>
  </>
  )
}





