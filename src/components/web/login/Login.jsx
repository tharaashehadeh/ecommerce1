import React, { useContext } from 'react'
import Input from '../../pages/Input.jsx';
import {useFormik} from 'formik';
import {loginSchema} from '../validation/Validation.js'
import axios from 'axios';
import {toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { UserContext } from '../context/User.jsx';
export default function Login () {
      const navigate = useNavigate();
      let{userToken,setUserToken}= useContext(UserContext);
      if(userToken){
       navigate(-1);
      }

      const initialValues={
            email:'',
            password:'',
        };
           const onSubmit=async (users)=>{
          const {data} =await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`,users);
         if(data.message=='success'){
         localStorage.setItem("userToken",data.token);
         setUserToken(data.token);
         toast.success('Login succesfully', {
           position: "top-right",
           autoClose: false,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
           });
           navigate('/login');
          }
          console.log(data);
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
            validationSchema:loginSchema
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
    <h2 className='mt-5 text-center'>Login</h2>
    <form onSubmit={formik.handleSubmit} className='mt-4'>
        {renderInputs}
  <div className='mt-5 text-center '> 
  <button  type="submit"  disabled={!formik.isValid}>Login</button>
  <Link to='/sendCode' className="mx-5 text-black">Forget-Password</Link>
  </div>
    </form>
    </div>
    </div>
    </>
    
  )
}
