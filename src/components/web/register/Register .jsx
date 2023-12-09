import React from 'react'
import Input from '../../pages/Input.jsx';
import {useFormik} from 'formik';
import {registerSchema} from '../validation/Validation.js'
import axios from 'axios';
import {toast } from 'react-toastify';
export default function Register () {

       const initialValues={
            userName:'',
            email:'',
            password:'',
            image:'',
        };
        const handelFieldChange=(event)=>{
       
          formik.setFieldValue('image',event.target.files[0]);
        }
           const onSubmit=async users=>{
          const formData = new FormData();
          formData.append("userName",users.userName);
          formData.append("email",users.email);
          formData.append("password",users.password);
          formData.append("image",users.image);

          const {data} =await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`,formData);
          if(data.message=='success'){
            formik.resetForm();
            toast.success('account created succesfully, piz verify your email to login', {
              position: "bottom-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          }
      
          }
          /*validate:values=>{
            let errors ={};
            if(!values.userName){
                errors.userName ="user name is required";
            }
            if(!values.email){
                errors.email ="email is required";
            }
            if(!values.password){
                errors.password ="password is required";
            }
            return errors;
          }*/
          const formik = useFormik({
            initialValues,
            onSubmit,
            validationSchema:registerSchema
          });
        const inputs =[
        {
            id:'username',
            type:'text',
            name:'userName',
            title:'UserName',
            value:formik.values.userName,
        },
        {
            id:'email',
            type:'email',
            name:'email',
            title:'UserEmail',
            value:formik.values.email,
        },
        {
            id:'password',
            type:'password',
            name:'password',
            title:'UserPassword',
            value:formik.values.password,
        },
        {
          id:'image',
          type:'file',
          name:'image',
          title:'UserImage',
          onChange:handelFieldChange
      },
    ];
    const renderInputs = inputs.map((input,index)=>

    <Input
     type={input.type}
      id={input.id} 
      name={input.name}
       title={input.title}
       value={input.value}
        key={index}
        errors={formik.errors}
        onChange={input.onChange ||formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched}
        />
    )

  return (
    <>
    <div className='container bg-info mt-5  '> 
    <h2 className='mt-5 text-center'>Create Account</h2>
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className='mt-4'>
        {renderInputs}
  <div className='mt-5 text-center '> 
  <button  type="submit"  disabled={!formik.isValid}>Register</button>
  </div>
    </form>
    </div>
    </>
    
  )
}
