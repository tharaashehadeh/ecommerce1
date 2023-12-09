import React, { useContext } from 'react'
import Input from '../../pages/Input.jsx';
import {useFormik} from 'formik';
import {forgetPasswordSchema} from '../validation/Validation.js'
import axios from 'axios';
import {toast } from 'react-toastify';
import {Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
export default function ForgetPassword() {
      const navigate = useNavigate();
      let{userToken,setUserToken}= useContext(UserContext);

      
      const initialValues={
        email:'',
        password:'',
        code:'',
    };
    const onSubmit=async (users)=>{
        const {data} =await axios.patch(`https://ecommerce-node4.vercel.app/auth/forgotPassword`,users);
       if(data.message=='success'){
       localStorage.setItem("userToken",data.token);
       setUserToken(data.token);
       toast.success('New password succesfully', {
         position: "top-right",
         autoClose: false,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "dark",
         });
         navigate('/');
        }
        console.log(data);
        }
        const formik = useFormik({
            initialValues,
            onSubmit,
            validationSchema:forgetPasswordSchema
          });
          const inputs =[
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
                id:  "code",
                type: "text",
                name: "code",
                title: "Code",
                value: formik.values.code,
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            />
        )
  return (
     <>
       <div className='login'>
    <div className='container bg-info mt-5  '> 
    <h2 className='mt-5 text-center'>Forget Password</h2>
    <form onSubmit={formik.handleSubmit} className='mt-4'>
        {renderInputs}
  <div className='mt-5 text-center '> 
  <input type="Submit" className=" bg-info  text-black" value="Save" />
  </div>
    </form>
    </div>
    </div>

     </>
  )
}
