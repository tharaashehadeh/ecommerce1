import React from 'react'

export default function Input({type='text',id,name,title,value,onChange,errors,onBlur, touched}) {

  console.log(touched);
  return (
   <>
   <div className='container'>
   <div className='input-group mb-3 bg-info'>
    
    <label htmlFor={id}>{title}</label>
    <input type={type} name={name} className='form-control mx-4' value={value} id={id} onChange={onChange} onBlur={onBlur}/>
    
    {touched[name]&&errors[name]&& <p className='text text-danger'>{errors[name]}</p>}

   </div>
   </div>
   </>
  )
}
