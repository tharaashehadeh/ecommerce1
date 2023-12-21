import React from 'react'
import './Input.css'
export default function Input({type='text',id,name,title,value,onChange,errors,onBlur, touched}) {

  console.log(touched);
  return (
   <div className=' input-group my-3 d-block m-auto '>
   <div className='container'>
   <div className=''>
    
    <label className=''  htmlFor={id}>{title}</label>
    <input  type={type} name={name} className='form-control mt-2' value={value} id={id} onChange={onChange} onBlur={onBlur}/>
    
    {touched[name]&&errors[name]&& <p className='text text-danger'>{errors[name]}</p>}

   </div>
   </div>
   </div>
  )
}
